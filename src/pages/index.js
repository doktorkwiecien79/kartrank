import Image from 'next/image'
import { Inter } from 'next/font/google'
import kartingText from '../textContent';
import Button from '../components/Button';
import { useState } from 'react';



const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  return (  

      <main className={`${inter.className}`}>  

          <div className="flex flex-col md:flex-row items-center justify-center w-full">
            <div className="text-center p-8 flex-grow md:flex-basis-2/3">
              <p className="text-black mb-10">{kartingText}</p>
              <div className="flex flex-col">          
                <Button href={"/ranking"} copy={'Znajdź najlepszy tor!'}/>
                <Button href={"/racing"} copy={'Mój świat wyścigów!'}/>
                <Button href={"/edukacja"} copy={`Co warto wiedzieć?`}/>
              </div>
            </div>
            <div className="p-4 flex-grow md:flex-grow-0 md:flex-basis-1/3">
              <Image src="/kartmainpic.png" alt="Main Karting Image" width={1200} height={600} />
            </div>
          </div>
      </main>   



  )
}