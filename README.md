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

![기술스택](https://github.com/jijisusu3/Motoo/assets/97648027/6e1fbea6-cc0e-4244-93c5-eb1578ef4e07)



### 🛠 System Architecture

![시스템아키텍처](https://github.com/jijisusu3/Motoo/assets/97648027/befb2ec3-e231-4efc-b704-b4c33aff28d0)





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

<img src="https://github.com/jijisusu3/Motoo/assets/97648027/737433a0-3e70-40b6-824a-6928779b65d2" width="200"/>

Easily view and remove stocks from personalized watchlist.

Monitor key market trends such as sharp price increases or drops, market capitalization, and tranding volume through real-time charts.

User can navigate to the detailed stock page easily.

Seamlessly navigate to other features, including the watchlist, today’s quiz, and the stock search page.



#### Detailed Stock Page

<img src="https://github.com/jijisusu3/Motoo/assets/97648027/3dc30a6d-e7ae-47fd-b522-3af63761bc35" width="200"/>

(1)  Stock Price Information

- View both current and historical price data in the stock details page.

(2) Major Companies' Stocks – Keyword & Sentiment Analysis

- Displays key trending keywords for major companies' stocks  based on data retrieved via the Naver News API.

- Analyzes news sentiment to classify articles as negative, neutral, or positive for a given stock.

(3) Glossary of Terms

- Provides simplified explanations or alternative terms for complex stock market concepts such as upper/lower price limits, PER, and dividend yield.



#### Mock Investment

(1) Buying & Selling

<img src="https://github.com/jijisusu3/Motoo/assets/97648027/29a92f0a-e12f-472c-bb3b-59c3245887c5" width="200"/>

- Users can buy and sell stocks when their offer is the same as the current market price. 
- To maintain engagement, the system simplifies transactions by removing complex factors such as bid/ask prices, market orders, and tradeable stock quantities, ensuring a more accessible and enjoyable tranding experience.



(2) Buy / Sell Orders

<img src="https://github.com/jijisusu3/Motoo/assets/97648027/b69c3214-b6e7-458d-9eee-3eced2c86a74" width="200"/>

<img src="https://github.com/jijisusu3/Motoo/assets/97648027/382b1f3b-ed2b-4307-9b43-af0eb91f5f4e" width="200"/>

- Provides an order placement feature that allows users to learn about pending orders when an order is placed at a non-tradable price.



(3) List of Pending Stock Orders

<img src="https://github.com/jijisusu3/Motoo/assets/97648027/0447f548-4e34-4d6b-a4aa-b9646cce3b8c" width="200"/>

- Stocks that have been ordered but not yet executed are listed in the pending stock list, where users can modify or cancel their orders as needed.



#### Quizs

<img src="https://github.com/jijisusu3/Motoo/assets/97648027/4590dd5b-3668-4564-861a-804bf8905068" width="200"/>

- Offers a daily opportunity to earn ₩200,000 in virtual money through an economic knowledge quiz. This virtual money will be deposited into the student's primary account.
- No time limit is imposed on answering questions, allowing users to discuss with friends or research online to learn the concepts and earn virtual money.



#### School Ranking Challenge

<img src="https://github.com/jijisusu3/Motoo/assets/97648027/eea0a94f-b700-4461-9a67-75a3c4228dd6" width="200"/>

- Participate in the School Ranking Challenge to check your individual ranking within your school and your school's ranking within the region.
- Discover tranding stocks in your school through the Hot Stocks feature, which highlights the most selected stocks among students. This function can encourage discussions among students about their stock choices, fostering a collaborative learning environment.
- **The competition lasts for one month**, allowing students to **experience short-term investing** and develop a better understanding of market dynamics.



#### Wallet

(1) Wallet List

<img src="https://github.com/jijisusu3/Motoo/assets/97648027/57f9ceb0-af43-4070-afeb-2b1bbf3716c0" width="200"/>

- View total assets and returns by aggregating all owned accounts.
- **Switch primary accounts** to manage investments from different accounts.
- Create additional accounts to experiment with different investment strategies. However, to prevent excessive account creation and deletion, users can only create a new account every 20 trading days.
- Once created, accounts remain **permanent unless manually deleted**, allowing students to **experience long-term investing**.



(2) Wallet Details

<img src="https://github.com/jijisusu3/Motoo/assets/97648027/48da3d70-b09e-45e3-844f-ab1d4392e360" width="200"/>

- The Account Assets section provides an overview of current account holdings and highlights the top six investments by portfolio percentage. Each stock is displayed with a profit and loss summary for easy tracking.

- The Realized Gains/Losses page displays completed buy/sell transactions with detailed profit and loss records.

- The Transaction History page tracks seed money additions, quiz rewards, and buy/sell activity in a simplified format.



### 👨🏻‍💻Team Member Introduction
| <img src="https://github.com/jijisusu3/Motoo/assets/97648027/c666670b-ca5f-4137-93a2-53f9729d0af5" width="120"/> | <img src="https://github.com/jijisusu3/Motoo/assets/97648027/7561e556-eb79-4279-863f-dbb65bc097b1" width="120"/> | <img src="https://github.com/jijisusu3/Motoo/assets/97648027/805b97ac-5350-4e8b-bae0-14ce571439ab" width="120"/> | <img src="https://github.com/jijisusu3/Motoo/assets/97648027/bdf2da06-ba8a-4bf1-a9ae-27962b3c7aa4" width="120"/> | <img src="https://github.com/jijisusu3/Motoo/assets/97648027/2f489edf-28f2-4d4c-a698-93f312a1b65c" width="120"/> | <img src="https://github.com/jijisusu3/Motoo/assets/97648027/c64e921f-83b3-44b5-88ee-599cedd597cb" width="120"/> |
| --------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------ |
| Jisu Kim    | 장진세                                                       | 전지수                                                       | 이진행                                                       | 권예슬                                                       | 이수랑 |
| FE/LEADER | BE                                                           | BE/Data Analysis                                                           | BE                                                           | BE/INFRA                                                     | BE     |

