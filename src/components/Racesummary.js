import Link from 'next/link';
import Image from 'next/image';
import Flag from 'react-flagkit';


/* funkcja przygotowująca summary dla wizyty na torze, która później używana jest na Racelist - podstawowym komponencie strony Racing */

export function RaceSummary({ name, date, imageUrl, url, city, countrycode }) {
    return (
        <div>
          <Link href={url} className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 m-0.5">
              <div className="w-full md:w-80">
                  <Image 
                    className="object-cover w-full rounded-t-lg h-96 md:h-48 md:rounded-none md:rounded-s-lg" 
                    src={imageUrl}
                    width={384}
                    height={384}
                    alt=""
                    priority
                  />
              </div>
              <div className="flex flex-col justify-between p-4 leading-normal w-full">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                  <div className="flex justify-between mb-3">
                      <p className="font-normal text-gray-700 dark:text-gray-400">{date}</p>
                  </div>
                  <div className="flex justify-between mb-3">
                    <div className="flex items-center">
                        <p className="mb-3 text-gray-700 dark:text-gray-400 mr-2">{city}</p>
                        <Flag country={countrycode} className="mb-[10px]"/>
                    </div>
                  </div>
              </div>
          </Link>
        </div>
    )
}


