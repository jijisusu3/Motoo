import requests
import pandas as pd
import re

file = open('top.txt', 'r', encoding='UTF8')
t = file.read().splitlines()
print(t)

file = open('ignore.txt', 'r', encoding='UTF8')
d_word = file.read().splitlines()


client_id = 'x_UcCWkEhjAeu5s5dTgP'
client_secret = "ogeG2OW_SR"

def fst(x):
  x = re.sub("\&\w*\;","",x)
  x = re.sub("<.*?>"," ",x)
  return x

def clean(x):
  x = re.sub("\&\w*\;","",x)
  x = re.sub(",","",x)
  x = re.sub("\(","",x)
  x = re.sub("\)","",x)
  x = re.sub("\.","",x)
  x = re.sub("\[","",x)
  x = re.sub("\]","",x)
  x = re.sub("-","",x)
  x = re.sub("‘","",x)
  x = re.sub("’","",x)
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
  for s in range(len(t)):
    x = re.sub(f"{t[s]}","",x)
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
  kf.to_csv('orikf{}.csv'.format(i))

  kf['text'] = kf['text'].apply(lambda x: clean(x))


  kf.to_csv('kf{}.csv'.format(i))
  a = kf['text'].str.split(' ', expand=False).sum()
  wset = set(a)
  for w in wset:
    if w in d_word:
      while w in a:
        a.remove(w)
  a = list(filter(None, a))
  a = pd.Series(a)
  top_lst = a.value_counts().iloc[:20]
  print(top_lst)