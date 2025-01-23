import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { CoinContext } from '../context/Coincontext'
import up_arrow from '../assets/up-arrow.svg'
import down_arrow from '../assets/down-arrow.svg'
import { Link } from 'react-router-dom'
const Trending = () => {
    const { currency,trendingData } = useContext(CoinContext)
    return (
        <div className='w-full'>
            {
                trendingData.map((coin, index) => (
                    <Link to={`/coin/${coin.item.id}`} key={index} className='flex justify-between my-4 cursor-pointer'>
                        <div className='flex gap-2'>
                            <img src={coin.item.small} className='w-5 h-5' alt="" />
                            <div className='flex gap-1'>
                                <span className='md:hidden lg:block'>{coin.item.name}</span>
                                <span> ({coin.item.symbol})</span>
                            </div>
                            
                        </div>
                        <div>
                            <p className={`px-2  rounded-full flex items-center gap-1 ${coin.item.data.price_change_percentage_24h[currency.name] > 0 ? 'text-[#14B079] bg-[#EBF9F4]' : 'text-[#FF4646] bg-[#feaaaa]'}`}>
                                <img src={coin.item.data.price_change_percentage_24h[currency.name] > 0 ? up_arrow : down_arrow} className='' alt="" />
                                {Math.floor(coin.item.data.price_change_percentage_24h[currency.name] * 100) / 100}%
                            </p>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default Trending