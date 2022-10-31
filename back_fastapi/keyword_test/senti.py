import requests
import numpy as np
import pandas as pd
import re
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from tqdm import tqdm

import torch.nn as nn


file = open('top.txt', 'r', encoding='UTF8')
t = file.read().splitlines()

file = open('ignore.txt', 'r', encoding='UTF8')
d_word = file.read().splitlines()


tokenizer = AutoTokenizer.from_pretrained("snunlp/KR-FinBert-SC")
model = AutoModelForSequenceClassification.from_pretrained("snunlp/KR-FinBert-SC")


client_id = 'x_UcCWkEhjAeu5s5dTgP'
client_secret = "ogeG2OW_SR"

def fst(x):
  x = re.sub("\&\w*\;","",x)
  x = re.sub(",","",x)
  x = re.sub("<.*?>"," ",x)
  return x



for i in range(len(t)):
  url = 'https://openapi.naver.com/v1/search/news.json?query=' + str(t[i]) + '&display=100&start=1&sort=sim'
  headers = {
    'X-Naver-Client-Id' : client_id,
    'X-Naver-Client-Secret':client_secret
  }
  r = requests.get(url, headers=headers)
  kf = pd.DataFrame(r.json()['items'])
  kf.drop(['originallink', 'link', 'pubDate'], axis=1, inplace=True)

  kf['text'] = kf[['title', 'description']].apply(lambda row: ' '.join(row.values.astype(str)), axis=1)
  kf['text'] = kf['text'].apply(lambda x: fst(x))
  kf.drop(['title', 'description'], axis=1, inplace=True)
  kf = kf.dropna()
  # kf.to_csv('orikf{}.csv'.format(i))

  txts = list(kf['text'])
  tokenizer.tokenize(txts[i])
  print(tokenizer.tokenize(txts[i]))

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
  print(kf)
  