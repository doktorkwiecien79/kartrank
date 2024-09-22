import {Disclarimer} from '../textContent';

export default function Disc() {
    return (
      <main>  

          <div className="flex items-center justify-center w-full">
            <div className="text-left p-8 flex-grow flex-basis-3/4">

                <p className="text-black font-roboto-slab mb-6">{Disclarimer}</p>
                
            </div>
          </div>
      </main>   


    )
  }