import Image from 'next/image'
import { Inter } from 'next/font/google'
import {omnieText, omnieText2} from '../textContent';
import Button from '../components/Button';
import YouTubeEmbed from '../components/YouTube';


const inter = Inter({ subsets: ['latin'] })


export default function Omnie() {
    return (
      <main className={`${inter.className}`}>  

          <div className="flex items-center justify-center w-full">
            <div className="text-left p-8 flex-grow flex-basis-3/4">
              <div className="text-center">  
                <p className="text-black font-roboto-slab mb-6">{omnieText}</p>
                <p className="text-black font-roboto-slab ">{omnieText2}</p>
                <div className='mt-6'>
                  <Button href={"https://przemyslawkwiecien.pl"} copy={'Sprawdź!'}/>
                </div>
              </div>
              <div className="text-center mt-20">  
                  <Button href={"/politykaprywatnosci"} copy={'Polityka Prywatności'} />
                  <Button href={"/prawaautorskie"} copy={'Prawa Autorskie'} />
                  <Button href={"/disclaimer"} copy={'Disclaimer'}/>
              </div>
            </div>

            <div className="p-4 flex-grow flex-basis-1/4">
              <Image src="/omnie.jpg" alt="Main Karting Image" width={900} height={600} />
            </div>
            {/* <div className="p-4 flex-grow">
               <YouTubeEmbed id="F2DgynI3Xns" />
            </div> */}


          </div>
      </main>   


    )
  }


// import Image from 'next/image'
// import { Inter } from 'next/font/google'
// import { omnieText, omnieText2 } from '../textContent';
// import Button from '../components/Button';
// import YouTubeEmbed from '../components/YouTube';

// const inter = Inter({ subsets: ['latin'] })

// export default function Omnie() {
//   return (
//     <main className={`${inter.className}`}>  
//       <div className="flex flex-col items-center justify-center w-full">
        
//         <div className="flex flex-row w-full justify-center">
//           <div className="text-left p-8 flex-grow">
//             <div className="text-center">  
//               <p className="text-black font-roboto-slab mb-6">{omnieText}</p>
//               <p className="text-black font-roboto-slab ">{omnieText2}</p>
//               <div className='mt-6'>
//                 <Button href={"https://przemyslawkwiecien.pl"} copy={'Sprawdź!'}/>
//               </div>
//             </div>
//             <div className="text-center mt-20">  
//               <Button href={"/politykaprywatnosci"} copy={'Polityka Prywatności'} />
//               <Button href={"/prawaautorskie"} copy={'Prawa Autorskie'} />
//               <Button href={"/disclaimer"} copy={'Disclaimer'}/>
//             </div>
//           </div>

//           <div className="p-4">
//             <Image src="/omnie.jpg" alt="Main Karting Image" width={900} height={600} />
//           </div>
//         </div>
        
//         <div className="p-4 mt-8 w-full flex justify-center">
//           <YouTubeEmbed id="F2DgynI3Xns" />
//         </div>

//       </div>
//     </main>   
//   )
// }
