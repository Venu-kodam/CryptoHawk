import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CoinContext = createContext()

const CoinContextProvider = ({ children }) => {
    const [allCoins, setAllCoins] = useState([])
    const [trendingData, setTrendingData] = useState([])
    const [watchlist, setWatchlist] = useState(() => {
        // Load the watchlist from localStorage if available
        const storedWatchlist = localStorage.getItem("watchlist");
        return storedWatchlist ? JSON.parse(storedWatchlist) : [];
    });

    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: '$'
    })


    const toggleWatchlist = (coin) => {
        const isInWatchlist = watchlist.includes(coin.id);
        if (isInWatchlist) {
            // Remove the coin from the watchlist
            const updatedWatchlist = watchlist.filter((id) => id !== coin.id);
            setWatchlist(updatedWatchlist);
            localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
            toast.error(`${coin.name} removed from watchlist`)
        } else {
            // Add the coin to the watchlist
            const updatedWatchlist = [...watchlist, coin.id];
            setWatchlist(updatedWatchlist);
            localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
            toast.success(`${coin.name} added to watchlist`)
        }
    };

    //fetch all coins 
    const fetchAllCoins = async () => {
        try {
            const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, {
                headers: {
                    accept: 'application/json',
                    'x-cg-demo-api-key': 'CG-epNNYYQs9rW7qhvzNVUvCSCN'
                }
            })
            console.log("All coin data", data)
            setAllCoins(data)
        } catch (error) {
            console.log("Error fetching all coins:", error);
        }

    }

    //fetch trending data
    const getTrendingData = async () => {
        try {
            const { data } = await axios.get(`https://api.coingecko.com/api/v3/search/trending`, {
                headers: {
                    accept: 'application/json',
                    'x-cg-demo-api-key': 'CG-epNNYYQs9rW7qhvzNVUvCSCN'
                }
            })
            console.log("Trending coins data", data.coins)
            setTrendingData(data.coins)
        } catch (error) {
            console.log("Error fetching trending data:", error);
        }
    }


    useEffect(() => {
        fetchAllCoins()
        getTrendingData()
    }, [currency])


    const value = {
        allCoins, currency, setCurrency,trendingData,watchlist,
        toggleWatchlist,
    }
    return (
        <CoinContext.Provider value={value}>
            {children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider