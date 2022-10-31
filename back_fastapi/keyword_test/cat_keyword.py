import requests
import pandas as pd
import re


file = open('ignore.txt', 'r', encoding='UTF8')
d_word = file.read().splitlines()


client_id = 'x_UcCWkEhjAeu5s5dTgP'
client_secret = "ogeG2OW_SR"

s_word = ['건설업', '금융업', '기계', '제조업', '농업.임업.어업', '보험업', '비금속광물', '서비스업', '섬유의복', '운수장비',
'운수창고업', '유통업', '은행', '음식료품', '의료정밀', '의약품', '전기가스업', '전기전자', '종이목재', '증권', '철강금속', '통신업','화학']


def clean(x):
  x = re.sub("\&\w*\;","",x)
  x = re.sub(",","",x)
  x = re.sub("\(","",x)
  x = re.sub("\)","",x)
  x = re.sub("\.","",x)
  x = re.sub("\[","",x)
  x = re.sub("\]","",x)
  x = re.sub("-","",x)
  x = re.sub("\+","",x)
  x = re.sub("%","",x)
  x = re.sub("↑","",x)
  x = re.sub(r"[0-9]", "", x)
  x = re.sub("를"," ",x)
  x = re.sub("하는"," ",x)
  x = re.sub("는"," ",x)
  x = re.sub("됐다"," ",x)
  x = re.sub("했다"," ",x)
  x = re.sub("에서"," ",x)
  x = re.sub("하고"," ",x)
  x = re.sub("<.*?>"," ",x)
  for s in range(len(s_word)):
    x = re.sub(f"{s_word[s]}","",x)
  return x

for i in range(len(s_word)):
  url = 'https://openapi.naver.com/v1/search/news.json?query=' + str(s_word[i]) + '&display=100&start=1&sort=sim'
  headers = {
    'X-Naver-Client-Id' : client_id,
    'X-Naver-Client-Secret':client_secret
  }
  r = requests.get(url, headers=headers)
  df = pd.DataFrame(r.json()['items'])
  df.drop(['originallink', 'link'], axis=1, inplace=True)
  df['title'] = df['title'].apply(lambda x: clean(x))
  df['description'] = df['description'].apply(lambda x: clean(x))
  df['text'] = df[['title', 'description']].apply(lambda row: ' '.join(row.values.astype(str)), axis=1)
  df.drop(['title', 'description'], axis=1, inplace=True)


  df.to_csv('df{}.csv'.format(i))
  a = df['text'].str.split(' ', expand=False).sum()
  wset = set(a)
  for w in wset:
    if w in d_word:
      while w in a:
        a.remove(w)
  a = list(filter(None, a))
  a = pd.Series(a)
  top_lst = a.value_counts().iloc[:20]
  print(top_lst)
  
