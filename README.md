# NewsFusion

**News Fusion** is a sleek, responsive web-based news aggregator that delivers real-time news articles across categories like Technology, Sports, Finance, and Global affairs. It integrates two news APIs and features a built-in note-taking system.


# Features:

**Live News Fetching** using:
    
    [NewsAPI](https://newsapi.org/)
    
    [CurrentsAPI](https://currentsapi.services/)

**Category-based Filtering** (Technology, Finance, Sports, Global)
    
    **Notes Section**:
    
        Write, save, and delete personal notes
        
        Data persistence using MongoDB and Express

**Responsive Design** – Mobile and desktop friendly

**Search Bar** for keyword-specific news
 
    Clean, card-based layout (3 articles per row)

# Tech Stack

|        Frontend       |   Backend  |   Database   |      APIs Used       |
|-----------------------|------------|--------------|----------------------|
| HTML, CSS, JavaScript | Express.js |   MongoDB    | NewsAPI, CurrentsAPI |


# Getting Started:

1. Clone the Repository:

    git clone https://github.com/Mahesh-010/NewsFusion.git

    cd NewsFusion


2. Install Backend Dependencies

    npm install


3. Run MongoDB

    Ensure MongoDB is running (default: mongodb://localhost:27017/NewsFusion).


4. Start Backend Server
 
    node server.js


5. Launch Frontend

   Open news.html in your browser

*Use VS Code's Live Server for best performance.


# API Keys Setup:

Replace the placeholder API keys in script.js:

const API_KEY1 = "API_KEY - (url - 1)";       // NewsAPI

const API_KEY2 = "API_KEY - (url - 2)";       // CurrentsAPI

Note: NewsAPI's free tier allows only 100 requests per day (50 per 12 hours).

# Future Enhancements:

 AI-based summarization for articles
 
 Article bookmarking system
 
 User login for saving personalized notes

 Notification system for breaking news
