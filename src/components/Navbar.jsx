import React, { useContext } from 'react'
import { CoinContext } from '../context/Coincontext'
import { Link } from 'react-router-dom'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import favorite from '../assets/favorite.png'
const Navbar = () => {
    //to open sign in button
    const { openSignIn } = useClerk()

    //to get the user info
    const { user } = useUser()

    const { setCurrency } = useContext(CoinContext)
    const currencyHandler = (e) => {
        switch (e.target.value) {
            case 'usd': {
                setCurrency({ name: 'usd', symbol: '$' })
                break
            }
            case 'inr': {
                setCurrency({ name: 'inr', symbol: '₹' })
                break
            }
            case 'eur': {
                setCurrency({ name: 'eur', symbol: '€' })
                break
            }
            default: {
                setCurrency({ name: 'usd', symbol: '$' })
                break
            }
        }
    }
    return (
        <div className='sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex items-center justify-between py-4 border-b  border-[#989898]'>
            <Link to='/' className='text-lg sm:text-2xl md:text-4xl text-white cursor-pointer logo'>Crypto Hawk</Link>
            <div>
                <ul className='hidden text-white lg:flex gap-8 items-center  text-lg'>
                    <Link to='/' className='text-[#b243ee]'><li >Home</li></Link>
                    <li className='hover:text-[#b243ee]'>Features</li>
                    <li className='hover:text-[#b243ee]'>Portfolio</li>
                </ul>
            </div>
            <div className='flex gap-4 '>
                <select onChange={currencyHandler} className='px-1 bg-[#1e3037] border border-white text-white sm:px-3 rounded-lg cursor-pointer'>
                    <option value="usd">USD</option>
                    <option value="inr">INR</option>
                    <option value="eur">EUR</option>
                </select>
                {
                    user ? 
                    <div className='text-white flex items-center gap-3'>
                        <Link to='/watchlist/' className='flex items-center gap-2 sm:mr-4 hover:text-[#b243ee]'><img src= {favorite} className='text-white w-5 h-5' alt="" /> Watchlist</Link>
                        <UserButton />
                    </div>
                        : <button onClick={e => openSignIn()} className='bg-white px-6 sm:px-10 py-1.5 rounded-full shadow-[2px_3px_10px_#ffff]'>Signup</button>
                }

            </div>
        </div>
    )
}

export default Navbar