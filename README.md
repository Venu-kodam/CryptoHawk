# Crypto Hawk

Welcome to **Crypto Hawk** !  It's a web application that allows users to explore cryptocurrencies, track their prices in real-time, add them to a watchlist, and view detailed coin data. Built with modern web technologies like **React**, **TailwindCSS**, and **CoinGecko API**. Crypto Hawk ensures an engaging and responsive user experience.


## Features

### Core Features:

1. **Real-Time Cryptocurrency Prices**
    - Displays live prices of cryptocurrencies fetched using the CoinGecko API.

2. **Search Functionality**
    - Search for specific cryptocurrencies by name or symbol.

3. **Watchlist**
    - Add/remove coins to/from a personalized watchlist.
    - Watchlist persists even after page refresh using localStorage.

4. **Authentication with Clerk**  
   - User authentication and account management using Clerk.  
   - Features include Sign Up, Login, and User Profile management.  
   - Watchlist is linked to individual user accounts for a personalized experience.

5. **Currency Conversion**
    - Convert cryptocurrency prices to various fiat currencies (USD, INR, EUR etc.) dynamically.

6. **Coin Details**
    - View detailed information about individual cryptocurrencies, including market cap, 24-hour high/low, all-time high, and more.

7. **Pagination**
    - Seamless navigation across pages for better performance when listing multiple coins.

8. **Trending Coins**
    - Highlight trending coins based on their popularity.

9. **Interactive Charts**
    - Historical price data displayed in interactive charts for different time ranges (24H, 30D, 3M, 1Y) using chartjs and react-chartjs-2.

10. **Responsive Design**
    - Optimized for all screen sizes (mobile, tablet, desktop).

### Tech Stack

- **React.js:** Component-based architecture for building the UI.
- **TailwindCSS:** For styling and responsive design.
- **React-Router:** For routing and navigation.
- **React-Toastify:** For toast notifications.
- **Axios:** For making API requests.
- **CoinGecko API:**  For fetching real-time cryptocurrency data.

### Usage

1. **Homepage:**
    - View a list of cryptocurrencies with details like rank, price, 24H change, and market cap.
    - Search for specific coins using the search bar.
    - Click on the star icon to add/remove a coin from your watchlist.

2. **Coin Details Page:**
    - Click on a coin's name to view detailed information and a historical price chart.

3. **Watchlist Page:**
    - View all your saved coins in one place.
    - Remove coins by toggling the star icon.

4. **Currency Dropdown:**
    - Change the base currency (e.g., USD, INR, EUR) dynamically, and all prices update accordingly.

#### Live url : https://cryptohawk.netlify.app/