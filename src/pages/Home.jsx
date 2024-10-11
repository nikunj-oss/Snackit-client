/* eslint-disable react-refresh/only-export-components */
import landing from "../assets/landing.png"
import appImage from "../assets/appDownload.png"
import { Grid2 } from '@mui/material'
import AppLayout from '../components/layouts/AppLayout'

const Home = () => {
  return (
    <Grid2 sx={{
        gap:12
    }}>
        <div className='bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16'>
            <h1 className='text-5xl font-bold tracking-tight text-orange-600'>
                Crave into a takeaway today
            </h1>
            <span className='text-xl'>Food is just a click away!</span>
        </div>
        <div className='grid md:grid-cols-2 gap-5'>
            <img src={landing}/>
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <span className="font-bold text-3xl tracking-tighter">
                    Order take away even faster
                </span>
                <span>
                    Download the Snackit App for faster ordering and personalised recommendations
                </span>
                <img src={appImage} />
            </div>
        </div>
    </Grid2>
  )
}

export default AppLayout(Home)