import time
import typer
import asyncio
import pandas as pd
import re
import requests

import torch
import torch.nn as nn
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from tqdm import tqdm

from app.config import settings
from app.models.stocks import Category, Keyword

app = typer.Typer()

tokenizer = AutoTokenizer.from_pretrained("snunlp/KR-FinBert-SC")
model = AutoModelForSequenceClassification.from_pretrained("snunlp/KR-FinBert-SC")

file = open('app/company_list.txt', 'r', encoding='UTF8')
company_lst = file.read().splitlines()

category_lst = ['건설업', '금융업', '기계', '제조업', '농업.임업.어업', '보험업', '비금속광물', '서비스업', '섬유의복', '운수장비',
                '운수창고업', '유통업', '은행', '식음료', '의료정밀', '의약품', '전기가스업', '전기전자', '종이목재', '증권', '철강금속', '통신업', '화학']


def fst(x):
    x = re.sub("\&\w*\;", "", x)
    x = re.sub(",", "", x)
    x = re.sub("<.*?>", " ", x)
    return x


def clean(x):
    x = re.sub("\&\w*\;", "", x)
    x = re.sub(",", "", x)
    x = re.sub("\(", "", x)
    x = re.sub("\)", "", x)
    x = re.sub("\.", "", x)
    x = re.sub("\[", "", x)
    x = re.sub("\]", "", x)
    x = re.sub("-", "", x)
    x = re.sub("\+", "", x)
    x = re.sub("%", "", x)
    x = re.sub("↑", "", x)
    x = re.sub(r"[0-9]", "", x)
    x = re.sub("를", " ", x)
    x = re.sub("하는", " ", x)
    x = re.sub("는", " ", x)
    x = re.sub("됐다", " ", x)
    x = re.sub("했다", " ", x)
    x = re.sub("에서", " ", x)
    x = re.sub("하고", " ", x)
    x = re.sub("<.*?>", " ", x)
    for s in range(len(category_lst)):
        x = re.sub(f"{category_lst[s]}", "", x)
    return x


async def get_category_keyword():
    tm = time.time()
    file = open('app/ignore_category.txt', 'r', encoding='UTF8')
    delete_word = file.read().splitlines()
    for i in range(len(category_lst)):
        category = await Category.get(id=i + 1)
        url = settings.NAVER_API_DOMAIN + str(category_lst[i]) + '&display=100&start=1&sort=sim'
        headers = {
            'X-Naver-Client-Id': settings.CLIENT_ID,
            'X-Naver-Client-Secret': settings.CLIENT_SECRET
        }
        r = requests.get(url, headers=headers)
        df = pd.DataFrame(r.json()['items'])
        df.drop(['originallink', 'link'], axis=1, inplace=True)
        df['title'] = df['title'].apply(lambda x: clean(x))
        df['description'] = df['description'].apply(lambda x: clean(x))
        df['text'] = df[['title', 'description']].apply(lambda row: ' '.join(row.values.astype(str)), axis=1)
        df.drop(['title', 'description'], axis=1, inplace=True)

        a = df['text'].str.split(' ', expand=False).sum()
        wset = set(a)
        for w in wset:
            if w in delete_word:
                while w in a:
                    a.remove(w)
        a = list(filter(None, a))
        a = pd.Series(a)
        top_lst = a.value_counts().iloc[:10]
        result = top_lst.index.tolist()
        now = time.time()
        print(now - tm)
        category.keyword = result
        await category.save(update_fields=('keyword',))
    return None


async def get_category_sentiment():
    tm = time.time()
    for i in range(len(category_lst)):
        category = await Category.get(id=i + 1)
        url = settings.NAVER_API_DOMAIN + str(category_lst[i]) + '&display=100&start=1&sort=sim'
        headers = {
            'X-Naver-Client-Id': settings.CLIENT_ID,
            'X-Naver-Client-Secret': settings.CLIENT_SECRET
        }
        r = requests.get(url, headers=headers)
        kf = pd.DataFrame(r.json()['items'])
        kf.drop(['originallink', 'link', 'pubDate'], axis=1, inplace=True)

        kf['text'] = kf[['title', 'description']].apply(lambda row: ' '.join(row.values.astype(str)), axis=1)
        kf['text'] = kf['text'].apply(lambda x: fst(x))
        kf.drop(['title', 'description'], axis=1, inplace=True)
        kf = kf.dropna()

        txts = list(kf['text'])
        tokenizer.tokenize(txts[i])

        output_lst = []
        for ts in tqdm(txts):
            inputs = tokenizer(ts, return_tensors='pt')
            output = model(**inputs)
            output = output.logits.tolist()[0]
            output_lst.append(output)

        outputs = torch.tensor(output_lst)

        predictions = nn.functional.softmax(outputs, dim=-1)

        kf_sc = pd.DataFrame(predictions.detach().numpy())
        kf_sc.columns = ['부정', '중립', '긍정']

        kf = pd.concat([kf, kf_sc], axis=1)

        result = list()
        avg1 = kf['부정'].mean()
        avg1 = avg1 * 100
        avg2 = kf['중립'].mean()
        avg2 = avg2 * 100
        avg3 = kf['긍정'].mean()
        avg3 = avg3 * 100
        result.extend([avg1, avg2, avg3])

        category.sentiment = result
        await category.save(update_fields=('sentiment',))
        now = time.time()
        print(now - tm)
    return None


async def get_company_keyword():
    tm = time.time()
    file = open('app/ignore_company.txt', 'r', encoding='UTF8')
    delete_word = file.read().splitlines()
    for i in range(len(company_lst)):
        keyword = await Keyword.get(id=i + 1)
        url = settings.NAVER_API_DOMAIN + str(company_lst[i]) + '&display=100&start=1&sort=sim'
        headers = {
            'X-Naver-Client-Id': settings.CLIENT_ID,
            'X-Naver-Client-Secret': settings.CLIENT_SECRET
        }
        r = requests.get(url, headers=headers)
        kf = pd.DataFrame(r.json()['items'])
        kf.drop(['originallink', 'link', 'pubDate'], axis=1, inplace=True)
        kf['text'] = kf[['title', 'description']].apply(lambda row: ' '.join(row.values.astype(str)), axis=1)
        kf['text'] = kf['text'].apply(lambda x: fst(x))
        kf.drop(['title', 'description'], axis=1, inplace=True)
        kf['text'] = kf['text'].apply(lambda x: clean(x))

        a = kf['text'].str.split(' ', expand=False).sum()
        wset = set(a)
        for w in wset:
            if w in delete_word:
                while w in a:
                    a.remove(w)
        a = list(filter(None, a))
        a = pd.Series(a)
        top_lst = a.value_counts().iloc[:10]
        result = top_lst.index.tolist()

        now = time.time()
        print(now - tm)
        keyword.keyword = result
        await keyword.save(update_fields=('keyword',))
    return None


async def get_company_sentiment():
    tm = time.time()
    for i in range(len(company_lst)):
        keyword = await Keyword.get(id=i + 1)
        url = settings.NAVER_API_DOMAIN + str(company_lst[i]) + '&display=100&start=1&sort=sim'
        headers = {
            'X-Naver-Client-Id': settings.CLIENT_ID,
            'X-Naver-Client-Secret': settings.CLIENT_SECRET
        }
        r = requests.get(url, headers=headers)
        kf = pd.DataFrame(r.json()['items'])
        kf.drop(['originallink', 'link', 'pubDate'], axis=1, inplace=True)

        kf['text'] = kf[['title', 'description']].apply(lambda row: ' '.join(row.values.astype(str)), axis=1)
        kf['text'] = kf['text'].apply(lambda x: fst(x))
        kf.drop(['title', 'description'], axis=1, inplace=True)
        kf = kf.dropna()

        txts = list(kf['text'])
        tokenizer.tokenize(txts[i])

        output_lst = []
        for ts in tqdm(txts):
            inputs = tokenizer(ts, return_tensors='pt')
            output = model(**inputs)
            output = output.logits.tolist()[0]
            output_lst.append(output)

        outputs = torch.tensor(output_lst)

        predictions = nn.functional.softmax(outputs, dim=-1)

        kf_sc = pd.DataFrame(predictions.detach().numpy())
        kf_sc.columns = ['부정', '중립', '긍정']

        kf = pd.concat([kf, kf_sc], axis=1)

        result = list()
        avg1 = kf['부정'].mean()
        avg1 = avg1 * 100
        avg2 = kf['중립'].mean()
        avg2 = avg2 * 100
        avg3 = kf['긍정'].mean()
        avg3 = avg3 * 100
        result.extend([avg1, avg2, avg3])

        keyword.sentiment = result
        await keyword.save(update_fields=('sentiment',))
        now = time.time()
        print(now - tm)
    return None


@app.command()
def category_key():
    asyncio.run(get_category_keyword())


@app.command()
def category_sent():
    asyncio.run(get_category_sentiment())


@app.command()
def company_key():
    asyncio.run(get_company_keyword())


@app.command()
def company_sent():
    asyncio.run(get_company_sentiment())


if __name__ == "__main__":
    app()
