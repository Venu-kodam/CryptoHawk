import React, { useContext, useEffect, useState } from 'react'
import { CoinContext } from '../context/Coincontext'
import { Link } from 'react-router-dom'
import leftArrow from '../assets/left-arrow.png'
import rightArrow from '../assets/right-arrow.png'
import emptystar from '../assets/emptyStar.svg'
import filledStar from '../assets/favorite.png'
import 'react-toastify/dist/ReactToastify.css'
import { useClerk, useUser } from '@clerk/clerk-react'
const Home = () => {
    const { allCoins, currency, toggleWatchlist, watchlist } = useContext(CoinContext)
    const [displayCoins, setDisplayCoins] = useState([])

    const { openSignIn } = useClerk()
    const { user } = useUser()

    const [input, setInput] = useState('')
    const [page, setPage] = useState(1)

    const inputHandler = (e) => {
        setInput(e.target.value)
        if (e.target.value === '') {
            setDisplayCoins(allCoins)
        }
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const coins = await allCoins.filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
        setDisplayCoins(coins)
    }

    const selectPageHandler = (selectedPage) => {
        if (selectedPage >= 1 && selectedPage <= displayCoins.length / 10 && selectedPage !== page) {
            setPage(selectedPage)
        }

    }
    useEffect(() => {
        setDisplayCoins(allCoins)
    }, [allCoins])

    return (
        <div className='text-white min-h-screen sm:px-[5vw] md:px-[7vw] lg:px-[9vw]  mt-20 pb-8 '>
            <div className='max-w-2xl text-center flex flex-col mx-auto gap-7 items-center'>
                <h1 className='font-bold text-4xl sm:text-5xl mt-4 leading-normal '>Your Gateway to the World of<br /><span className='text-orange-500'>Cryptocurrencies</span></h1>
                <p className='text-[#a8a7a7] max-w-84 leading-normal'>Discover the most comprehensive cryptocurrency marketplace. <br /> Start exploring and trading today.</p>
                <form onSubmit={onSubmitHandler} className='bg-white rounded-full outline-none flex items-center  gap-3 justify-between sm:w-[80%] overflow-hidden '>
                    <input onChange={inputHandler} value={input} type="text" className='flex-1 text-sm sm:text-lg outline-none text-black px-3 sm:px-8 py-2 rounded-full ' placeholder='Find your favorite coin here' />
                    <button type='submit' className='px-6 py-2.5 bg-purple-700 rounded-full'>Search</button>
                </form>
            </div>
            {
                user ?
                    (
                        <div>
                            <div className='max-w-4xl bg-gradient-to-b from-[rgba(84,3,255,0.15)] to-[rgba(105,2,153,0.15)] mx-auto mt-12 rounded-lg'>
                                <div className='grid grid-cols-[0.3fr_0.5fr_3fr_2fr_1fr] sm:grid-cols-[0.3fr_0.5fr_2fr_1fr_1fr_1.5fr] py-4 px-5 mx-auto border-b-[1px] border-zinc-400 text-[#dedddd]'>
                                    <p></p>
                                    <p>#</p>
                                    <p>Coin</p>
                                    <p>Price</p>
                                    <p className='text-center'>24H Change</p>
                                    <p className='text-right hidden sm:block'>MarketCap</p>
                                </div>
                                {
                                    displayCoins.slice((page - 1) * 10, (page - 1) * 10 + 10).map((item, index) => (
                                        <Link to={`/coin/${item.id}`} key={index} className='grid grid-cols-[0.3fr_0.5fr_3fr_2fr_1fr] items-center sm:grid-cols-[0.3fr_0.5fr_2fr_1fr_1fr_1.5fr] py-4 px-5 mx-auto border-b-[1px] border-zinc-400 last:border-none'>
                                            <img onClick={(e) => {
                                                e.preventDefault();
                                                toggleWatchlist(item);
                                            }} src={watchlist.includes(item.id) ? filledStar : emptystar} className='w-4 cursor-pointer' />

                                            <p>{item.market_cap_rank}</p>
                                            <div className='flex items-center gap-2'>
                                                <img src={item.image} className='w-6' alt="" />
                                                <div className='flex gap-1'>
                                                    <span>{item.name}</span>
                                                    <span className='hidden sm:block'>- {item.symbol.toUpperCase()}</span>
                                                </div>
                                            </div>
                                            <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                                            <p className={`text-center ${item.market_cap_change_percentage_24h > 0 ? 'text-[#00D515]' : 'text-[#FF4646]'}`}>{Math.floor(item.market_cap_change_percentage_24h * 100) / 100}%</p>
                                            <p className='text-right hidden sm:block'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                                        </Link>
                                    ))
                                }

                            </div>

                            {/* ------pagination------- */}
                            <div>
                                {
                                    displayCoins.length > 0 && (
                                        <div className='flex flex-wrap items-center gap-3 justify-center mt-8'>
                                            <div className={`w-10 h-10 rounded-full bg-[#28245f] text-white flex gap-3 items-center justify-center`}>
                                                <img src={leftArrow} className='cursor-pointer w-5 h-5' onClick={() => selectPageHandler(page - 1)} />
                                            </div>
                                            {
                                                [...Array(Math.ceil(displayCoins.length / 10))].map((_, index) => (
                                                    <button key={index} onClick={() => selectPageHandler(index + 1)} className={`w-10 h-10 rounded-full bg-[#28245f] text-white flex gap-3 items-center justify-center ${page === index + 1 ? 'bg-orange-500' : ''}`}>{index + 1}</button>
                                                ))
                                            }
                                            <div className={`w-10 h-10 rounded-full bg-[#28245f] text-white flex gap-3 items-center justify-center`}>
                                                <img src={rightArrow} className='cursor-pointer w-5 h-5' onClick={() => selectPageHandler(page + 1)} />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                    :
                    <div className='text-center my-12'>
                        <p className=' text-lg'>Don't have an account ? <span onClick={(e)=>openSignIn()} className='underline text-[#b243ee] mx-4 cursor-pointer'>Sign up</span></p>
                    </div>
            }

        </div>
    )
}

export default Home