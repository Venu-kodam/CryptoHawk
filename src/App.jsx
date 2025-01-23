import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Coin from './pages/Coin'
import Footer from './components/Footer'
import WatchList from './pages/WatchList'
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (
    <div className='px-4  min-h-screen bg-gradient-to-r from-[#0b004e] to-[#1d152f]'>
      <ToastContainer position='bottom-right'/>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/coin/:coinId' element={<Coin />}/>
        <Route path='/watchlist' element={<WatchList />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App