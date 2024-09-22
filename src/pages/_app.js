import '@/styles/globals.css'
import Navbarbottom from '../components/Navbarbottom'
import { Analytics } from '@vercel/analytics/react';


export default function App({ Component, pageProps }) {
  return (
    <>
    <div className="flex flex-col h-screen">
      <div className="flex-grow pb-16">
        <div className='body-pattern'>
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-1 items-center justify-center bg-white min-h-screen">
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <div className="max-w-screen-xl mx-auto w-full">
            <Navbarbottom />
        </div>
      </div>
    </div>
    <Analytics />
    </>
  );
}

