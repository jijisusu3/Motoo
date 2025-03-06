# 📈MOTOO

### Motoo, a mock stock investment education platform for youth



### 📊Project Introduction

- Motoo is a mock stock trading platform designed to help students learn financial investment concepts through interactive and gamified experiences. Nearly half of Korean students have experience with financial investment, yet high school economics textbooks barely cover the topic. Also, existing mock investment competitions are one-off events, and real stock platforms remain inaccessible to young users.
- To bridge this gap, Motoo provides a structured and engaging learning environment, allowing students to grasp investment concepts in simpler terms and practice mock trading in a realistic but risk-free setting. The platform features real-time stock search, price visualization, and portfolio management tools, making financial learning more accessible and practical for students.



### ✏ Main Functionality
#### Mock Investment
- Check real-time stock prices and various market indicators.
- View time-series price data visualized through charts.
- Access the real-time quotation list.
- Place buy and sell orders for the stocks when the market opens.
- Easily Understand information about the industry through keyword analysis and sentiment analysis for companies and industries.

#### Investment Education
- We made an effort to present indicators in a more user-friendly way, adding explanations for complex terms to facilitate  natural learning.
- Users can earn virtual money by participating in quizzes related to economics, which encourages learning.


#### Portfolio Manage
- Calculates assets, returns and other key metrics for each account, allowing users to easily monitor their account status.
- Users can review theri transaction history to track asset fluctuations over time, while profit and loss for each stock is calculated and displayed at glance.
- Generates a portfolio that visulaizes the proportion of assets held by analyzing currently owned stocks.

#### School Ranking Challenge

- Displays individual rankings within schools and school ranking within a region in real time, allowing users to track performance.
- Users can view ranking of the most popular stocks within their school and have opportunities to discuss them with friends.





### 🖥 Tech Stack 

![기술스택](/uploads/8bd70746f8bb0d51d4c6d66be2cb0616/KakaoTalk_20221121_014218431.png)



### 🛠 System Architecture

![시스템아키텍처](/uploads/51406fbf508f87be56d254908e00786f/시스템아키텍처.png)





### :classical_building: Introduction to Technology

#### Stock Data

- Developed a system to fetch and store stock data using the **Korea Investment & Securities Open API** and **pykrx**.

- Details:

  - Frequently accessed but short-lived data (e.g., order book, API access tokens) is stored and retrieved using Redis for efficiency.

  - Since retrieving data for over 900 stocks at once via Open API was challenging.

    - Optimized the process to fetch 20 stocks per second.
    - Implemented asynchronous data retrieval to maximize performance while adhering to API rate limits.
    - Used bulk create, update, and insert operations in the database to handle large data volumes while reducing server load.
  
  - Automated real-time stock data updates using Typer library and crontab

    

#### Industry & Stock-Specific Keyword Analysis

- News Collection: Used the Naver Search API to gather financial news.

- Keyword Analysis:

  - Instead of using a dedicated NLP module, processed data directly.

  - Avoided excessive morphological decomposition (e.g., “Artificial Intelligence” being split into “Artificial” and “Intelligence”) by manually refining data.

  - Preprocessed data by removing special characters, particles, and stopwords, then structured them into a dataset.

  - Counted word frequencies and provided users with the **top 10 most frequent keywords**, helping them quickly understand trends in specific industries and companies.


  

#### Industry & Stock-Specific Sentiment Analysis

- Used the KR-FinBERT model, trained on Korean financial articles, for sentiment analysis.

- Implementation Process:
  - Cleaned the dataset by removing unnecessary special characters.
  - Tokenized text using Transformers and pre-trained models.
  - Used TQDM to monitor progress while processing the dataset.
  - Converted output values into **tensors** using **PyTorch** for deep learning-based computations.
  - Computed sentiment scores in the order of negative-neutral-positive, as defined by the KR-FinBERT model.
  - Displayed sentiment results using **weather icons (cloudy-neutral-sunny)**, allowing users to quickly assess the market sentiment of a specific industry or company.



### 🔎 Service

#### Main Page

![stockList](/uploads/de6d3d5405ab7a50c1bd3630b6595365/stockList.gif)

Easily view and remove stocks from personalized watchlist.

Monitor key market trends such as sharp price increases or drops, market capitalization, and tranding volume through real-time charts.

User can navigate to the detailed stock page easily.

Seamlessly navigate to other features, including the watchlist, today’s quiz, and the stock search page.



#### Detailed Stock Page

![검색_주식상세_업종](/uploads/d9166a40bbab3feb5439b8e558ff58ae/검색_주식상세_업종.gif)

(1)  Stock Price Information

- View both current and historical price data in the stock details page.

(2) Major Companies' Stocks – Keyword & Sentiment Analysis

- Displays key trending keywords for major companies' stocks  based on data retrieved via the Naver News API.

- Analyzes news sentiment to classify articles as negative, neutral, or positive for a given stock.

(3) Glossary of Terms

- Provides simplified explanations or alternative terms for complex stock market concepts such as upper/lower price limits, PER, and dividend yield.



#### Mock Investment

(1) Buying & Selling

![현재가구매판매](/uploads/b2d3ea36088463335c80c849ce158384/현재가구매판매.gif)

- Users can buy and sell stocks when their offer is the same as the current market price. 
- To maintain engagement, the system simplifies transactions by removing complex factors such as bid/ask prices, market orders, and tradeable stock quantities, ensuring a more accessible and enjoyable tranding experience.



(2) Buy / Sell Orders

![구매주문대기](/uploads/40438f5057e14f1c38f1e32773c8e7be/구매주문대기.gif)

![주식판매대기](/uploads/c897ee0caef118e6bf8df5f22701dcc2/주식판매대기.gif)

- Provides an order placement feature that allows users to learn about pending orders when an order is placed at a non-tradable price.



(3) List of Pending Stock Orders

![대기중인주문](/uploads/14ef8e2e8030265d97db026db3afd0b8/대기중인주문.gif)

- Stocks that have been ordered but not yet executed are listed in the pending stock list, where users can modify or cancel their orders as needed.



#### Quizs

![퀴즈](/uploads/8af77bda99284399ba3e7ccc33280faf/퀴즈.gif)

- Offers a daily opportunity to earn ₩200,000 in virtual money through an economic knowledge quiz. This virtual money will be deposited into the student's primary account.
- No time limit is imposed on answering questions, allowing users to discuss with friends or research online to learn the concepts and earn virtual money.



#### School Ranking Challenge

![학교대항전참여_변경](/uploads/da390e97eb1da7907da1d4b508c4c4d4/학교대항전참여_변경.gif)

- Participate in the School Ranking Challenge to check your individual ranking within your school and your school's ranking within the region.
- Discover tranding stocks in your school through the Hot Stocks feature, which highlights the most selected stocks among students. This function can encourage discussions among students about their stock choices, fostering a collaborative learning environment.
- **The competition lasts for one month**, allowing students to **experience short-term investing** and develop a better understanding of market dynamics.



#### Wallet

(1) Wallet List

![지갑리스트](/uploads/75ed1f346e667a406ce139aa8acf3682/지갑리스트.gif)

- View total assets and returns by aggregating all owned accounts.
- **Switch primary accounts** to manage investments from different accounts.
- Create additional accounts to experiment with different investment strategies. However, to prevent excessive account creation and deletion, users can only create a new account every 20 trading days.
- Once created, accounts remain **permanent unless manually deleted**, allowing students to **experience long-term investing**.



(2) Wallet Details

![지갑상세](/uploads/7c35724a27e45f4a9af089b338db680a/지갑상세.gif)

- The Account Assets section provides an overview of current account holdings and highlights the top six investments by portfolio percentage. Each stock is displayed with a profit and loss summary for easy tracking.

- The Realized Gains/Losses page displays completed buy/sell transactions with detailed profit and loss records.

- The Transaction History page tracks seed money additions, quiz rewards, and buy/sell activity in a simplified format.



### 👨🏻‍💻Team Member Introduction

| <img src="/uploads/33a2fca5ddabdd76957bf0d200f233a9/KakaoTalk_20221117_221333841.png" width="120"/> | <img src="/uploads/0e82c0ce1ac0cc7fb8f5df3267c62291/KakaoTalk_20221117_210513871.png" width="120"/> | <img src="/uploads/4e1190816bdcf50d86e753e3706ac4d3/KakaoTalk_20221117_210515048.png" width="120"/> | <img src="/uploads/9507670d4c8fa55a389366f0b70f8cbc/KakaoTalk_20221117_210514890.png" width="120"/> | <img src="/uploads/ddae2b16ae4bd7e780922394a1500598/KakaoTalk_20221117_210514376.png" width="120"/> | <img src="/uploads/f6915ab7b36d9d076ea62a3231116a84/KakaoTalk_20221117_232242534.png" width="120"/> |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Jisu Kim                                                     | 장진세                                                       | 전지수                                                       | 이진행                                                       | 권예슬                                                       | 이수랑                                                       |
| FE/LEADER                                                    | BE                                                           | BE/Data Analysis                                             | BE                                                           | BE/INFRA                                                     | BE                                                           |

