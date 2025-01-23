import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../context/Coincontext'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Tooltip, Filler, Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import millify from 'millify';
import parse from 'html-react-parser';
import Loader from '../components/Loader';
import up_arrow from '../assets/up-arrow.svg'
import down_arrow from '../assets/down-arrow.svg'
import Trending from '../components/Trending';
import AlsoLike from '../components/AlsoLike';

ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Tooltip,Filler,Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
  },
};

const chartDays = [
  { label: "24h", value: 1 },
  { label: "30D", value: 30 },
  { label: "3M", value: 90 },
  { label: "1Y", value: 365 },
];

const Coin = () => {
  const { coinId } = useParams()
  const { currency, trendingData } = useContext(CoinContext)
  const [coinData, setCoinData] = useState()
  const [historicalData, setHistoricalData] = useState([])
  const [days, setDays] = useState(1)
  const [loading, setLoading] = useState(false); // Add loading state

  const getCoinData = async () => {
    try {
      setLoading(true); // Start loading
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-epNNYYQs9rW7qhvzNVUvCSCN'
        }
      })
      console.log("coin data", data)
      setCoinData(data)
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  //get historical data to draw graphs
  const getHistoricalData = async () => {
    try {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=${days}`, {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-epNNYYQs9rW7qhvzNVUvCSCN'
        }
      })
      console.log("historical data", data.prices)
      setHistoricalData(data.prices)
    } catch (error) {
      console.log(error);
    }
  }

  const chartdata = {
    labels: historicalData.map((item) => {
      let date = new Date(item[0])
      let time = date.getHours() > 12 ? `${date.getHours() - 12}:${date.getMinutes()} PM`
        : `${date.getHours()}:${date.getMinutes()} AM`
      return days === 1 ? time : date.toLocaleDateString()
    }),
    datasets: [
      {
        label: `Price (Past  ${days} Days) in ${currency.name.toUpperCase()}`,
        data: historicalData.map(item => item[1]),
        borderColor: "#EEBC1D",
        pointRadius: 1,
      }
    ],
  };

  useEffect(() => {
    getCoinData()
    getHistoricalData()
  }, [currency, days, coinId])

  return (
    loading ? (
      <Loader /> // Show loader when loading is true
    ) : (
      coinData && chartdata ? (
        <>
          <div className='flex flex-col  md:flex-row gap-3 xl:gap-12 px-3 xl:px-10'>
            <div className='md:max-w-[450px] lg:min-w-[600px] xl:min-w-[900px]  bg-[#1e3037] my-4 rounded-xl  max-h-fit shadow-[2px_3px_20px_#442c5e]'>
              <div className=' text-white  px-3 lg:px-10'>
                <div className=' flex flex-col gap-4'>
                  <div className='flex items-center gap-2 mt-4' >
                    <img src={coinData.image.thumb} alt="" className='my-4 ' />
                    <p className='text-xl font-semibold text-center'>{coinData.name}</p>
                    <p className='text-sm'> {coinData.symbol.toUpperCase()}</p>
                    <div className='bg-gray-600 px-2 py-1.5 rounded-md ms-4'>
                      Rank {coinData.market_cap_rank}
                    </div>
                  </div>
                  <div className='flex gap-4 items-center'>
                    <p className='text-3xl font-semibold'>{currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}</p>
                    <p className={`px-2 font-semibold rounded-full flex items-center gap-1 ${coinData.market_data.market_cap_change_percentage_24h > 0 ? 'text-[#14B079] bg-[#EBF9F4]' : 'text-[#FF4646] bg-[#feaaaa]'}`}>
                      <img src={coinData.market_data.market_cap_change_percentage_24h > 0 ? up_arrow : down_arrow} className='' alt="" />
                      {Math.floor(coinData.market_data.market_cap_change_percentage_24h * 100) / 100}%
                    </p>
                    <p className='text-[#768396]'>(24 H) </p>
                  </div>
                  <p className='text-base'>₹ {coinData.market_data.current_price['inr'].toLocaleString()}</p>
                  <div className='border-b text-[#b3b2b2] border-[#989898] pb-5'>
                    <p>{parse(coinData.description.en.split('. ')[0])}</p>
                  </div>
                </div>
              </div>
              <div className="w-80 sm:w-full px-3 lg:px-10  relative">
                <div className='flex justify-between items-center my-2'>
                  <p className='text-white text-lg hidden sm:block'>{coinData.name} Price Chart ({(currency.name.toUpperCase())})</p>
                  <div className='text-white  absolute top-0 right-8 flex gap-4 sm:gap-6  items-center'>
                    {
                      chartDays.map((day, index) => (
                        <p key={index} onClick={() => setDays(day.value)} className={`cursor-pointer ${day.value === days ? 'text-amber-400' : 'text-white'}`}>{day.label}</p>
                      ))
                    }
                  </div>
                </div>
                <Line options={options} data={chartdata} className='w-full my-6' />
                <hr className='my-4 border-b  border-[#989898]' />
              </div>
              <div className='text-white flex-1 w-full my-4 px-3 lg:px-10'>
                <h1 className='text-2xl font-semibold'>Overview </h1>
                <div className='flex flex-col sm:flex-row gap-8 justify-between'>
                  <div className='w-full'>
                    <div className='flex gap-2 mt-2 items-center justify-between border-b  border-[#616161] py-2'>
                      <p className='text-base font-semibold'>Price</p>
                      <p>{currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}</p>
                    </div>
                    <div className='flex gap-2 mt-2 items-center justify-between border-b border-[#616161] py-2'>
                      <p className='text-base  font-semibold'>24h High</p>
                      <p>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</p>
                    </div>
                    <div className='flex gap-2 mt-2 items-center justify-between border-b border-[#616161] py-2'>
                      <p className='text-base  font-semibold'>24h Low</p>
                      <p>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</p>
                    </div>
                    <div className='flex gap-2 mt-2 items-center justify-between border-b border-[#616161] py-2'>
                      <p className='text-base font-semibold'>Marketcap</p>
                      <p>{currency.symbol} {millify(coinData.market_data.market_cap[currency.name], { precision: 2 })}</p>
                    </div>
                  </div>
                  <div className='w-full'>
                    <div className='flex gap-2 mt-2 items-center justify-between border-b border-[#616161] py-2'>
                      <p className='text-base font-semibold'>Marketcap Rank</p>
                      <p>{coinData.market_cap_rank}</p>
                    </div>
                    <div className='flex gap-2 mt-2 items-center justify-between border-b border-[#616161] py-2'>
                      <p className='text-base font-semibold'>All-Time-High</p>
                      <p>{currency.symbol} {coinData.market_data.ath[currency.name]}</p>
                    </div>
                    <div className='flex gap-2 mt-2 items-center justify-between border-b border-[#616161]  py-2'>
                      <p className='text-base font-semibold'>All-Time-Low</p>
                      <p>{currency.symbol} {coinData.market_data.atl[currency.name]}</p>
                    </div>
                    <div className='flex gap-2 mt-2 items-center justify-between border-b border-[#616161] py-2'>
                      <p className='text-base font-semibold'>Maximum Supply</p>
                      <p>{coinData.market_data.max_supply}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-white my-4  bg-[#1e3037] p-4 sm:px-4 xl:px-8 rounded-xl max-h-fit w-full md:w-1/2'>
              <h1 className='text-lg xl:text-2xl font-semibold'>Trending Coins (24h)</h1>
              <Trending />
            </div>
          </div>
          <AlsoLike trendingData={trendingData} />
        </>
      ) : <Loader />
    )
  )

}

export default Coin