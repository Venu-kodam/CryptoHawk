import React, { useContext, useState } from 'react'
import { CoinContext } from '../context/Coincontext';
import { Link } from 'react-router-dom';

const AlsoLike = ({ trendingData }) => {
    const { currency } = useContext(CoinContext)
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideCount = trendingData.length
    const visibleSlides = 5; // Number of slides visible at a time
    const slideWidth = 240; // Width of each slide in pixels

    const handlePrev = () => {
        if(currentIndex>0){
            setCurrentIndex(currentIndex-1)
        }
    };

    const handleNext = () => {
        if(currentIndex<slideCount - visibleSlides){
            setCurrentIndex(currentIndex+1)
        }
    };
    return (
        <div className='text-white px-3 lg:px-10 my-12'>
            <h1 className='text-2xl font-semibold my-4'>You may also Like</h1>
            <div className='relative'>
                {/* slider container */}
                <div className='overflow-hidden'>
                    <div className='flex gap-2 transition-transform duration-1000 ease-out' style={{
                        transform: `translateX(-${currentIndex * slideWidth}px)`,
                    }}>
                        {
                            trendingData.map((coin, index) => (
                                <Link to={`/coin/${coin.item.id}`} key={index} className='border rounded-lg min-w-[200px] p-4 gap-3 bg-[#1e3037] flex-shrink-0' style={{ width: `${slideWidth}px` }}>
                                    <div className='flex gap-2 items-center'>
                                        <img src={coin.item.small} className='w-5 h-5' alt="" />
                                        <p>{coin.item.symbol}</p>
                                        <div>
                                            <small className={`px-2 py-1 font-semibold rounded-full  ${coin.item.data.price_change_percentage_24h[currency.name] > 0 ? 'text-[#14B079] bg-[#EBF9F4]' : 'text-[#FF4646] bg-[#feaaaa]'}`}>
                                                {Math.floor(coin.item.data.price_change_percentage_24h[currency.name] * 100) / 100}%
                                            </small>
                                        </div>
                                    </div>
                                    <p className='text-xl font-semibold my-4'>{currency.symbol}{coin.item.data.price.toLocaleString()}</p>
                                    <img src={coin.item.data.sparkline} className='w-full' alt="" />
                                </Link>
                            ))
                        }
                    </div>
                </div>
                {/* Navigation Buttons */}
                <button
                    onClick={handlePrev}
                    className={`absolute -left-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 
                    py-1 rounded-full shadow-md hover:bg-gray-700 
                    ${currentIndex===0?'opacity-50 cursor-not-allowed':''}`}
                    disabled={currentIndex===0} //disable on the first card
                >
                    &lt;
                </button>
                <button
                    onClick={handleNext}
                    className={`absolute -right-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 
                    py-1 rounded-full hover:bg-gray-700 
                    ${currentIndex===slideCount-visibleSlides?'opacity-50 cursor-not-allowed':''}`}
                    disabled={currentIndex===slideCount-visibleSlides}
                >
                    &gt;
                </button>
            </div>
        </div>
    )
}

export default AlsoLike