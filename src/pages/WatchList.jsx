import React, { useContext } from 'react'
import { CoinContext } from '../context/Coincontext';
import { Link } from 'react-router-dom';
import emptystar from '../assets/emptyStar.svg'
import filledStar from '../assets/favorite.png'
const WatchList = () => {
  const { watchlist, allCoins, currency, toggleWatchlist } = useContext(CoinContext);

   // Filter coins based on watchlist IDs
   const watchlistCoins = allCoins.filter((coin) => watchlist.includes(coin.id));
  return (
    <div className='text-white min-h-screen sm:px-[5vw] md:px-[7vw] lg:px-[9vw] my-10'>
      <h1 className='text-3xl font-semibold my-4'>Your Watchlist</h1>
      {watchlistCoins.length > 0 ? (
        <div className='max-w-4xl mx-auto bg-gradient-to-b from-[#2c003e] to-[#1a1236] rounded-lg'>
          {watchlistCoins.map((coin, index) => (
            <Link to={`/coin/${coin.id}`} key={index} className='grid items-center grid-cols-[0.4fr_0.4fr_2.5fr_2fr_1fr] sm:grid-cols-[0.3fr_0.3fr_1.5fr_1fr_1fr_1fr] py-4 px-5 mx-auto border-b-[1px] border-zinc-400 last:border-none'>
              <img
                src={watchlist.includes(coin.id)? filledStar : emptystar}
                className='w-5 h-5 cursor-pointer'
                alt="toggle watchlist"
                onClick={(e) =>{
                  e.preventDefault()
                  toggleWatchlist(coin)
                }}
              />
              <p>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img src={coin.image} className='w-6' alt="" />
                <span>{coin.name}</span>
              </div>
              <p>{currency.symbol} {coin.current_price.toLocaleString()}</p>
              <p className={`text-center ${coin.market_cap_change_percentage_24h > 0 ? 'text-[#00D515]' : 'text-[#FF4646]'}`}>
                {Math.floor(coin.market_cap_change_percentage_24h * 100) / 100}%
              </p>
              <p className='text-right hidden sm:block'>{currency.symbol} {coin.market_cap.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className='text-center text-lg my-12'>Your watchlist is empty. Add coins by clicking the star icon.</p>
      )}
    </div>
  )
}

export default WatchList