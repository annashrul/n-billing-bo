import React from 'react';
import {doLogout} from 'lib/auth'
import {useRouter} from 'next/router'
import Link from 'next/link'
import { useEffect } from 'react';


interface HeaderProps {
  toggleSidebar: () => void;
  openProfile: boolean;
  toggleProfile: (toggle:boolean) => void;
}


const Header: React.FC<HeaderProps> = ({toggleSidebar,openProfile,toggleProfile}) => {
  const router = useRouter()
 
  useEffect(() => {
    // const coo: string=Cookies.get('__uid')!;
    // const datum:iUser= JSON.parse(atob(coo));
   

	}, []);
  const actLogout=()=>{
    doLogout();
    router.push('/auth/login')
  }
  return (
    <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* Mobile hamburger */}
        <button className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple" onClick={toggleSidebar} aria-label="Menu">
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
            </div>
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* Theme toggler */}
          <li className="flex">
            <button className="rounded-md focus:outline-none focus:shadow-outline-purple" aria-label="Toggle color mode">
              <template x-if="!dark" />
              <template x-if="dark" />
            </button>
          </li>
          
          {/* Profile menu */}
          <li className="relative">
            {/* <button className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none" aria-label="Account" aria-haspopup="true" onClick={()=>{toggleProfile(!openProfile)}}>
              <img className="object-cover w-8 h-8 rounded-full" src="/logo.png" alt="" aria-hidden="true" />
            </button>
             */}
            <button  className="flex flex-row items-center space-x-2 w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent text-gray-700 dark:text-gray-400  md:w-auto md:inline md:mt-0 md:ml-4 focus:bg-gray-800 focus:outline-none focus:shadow-outline" onClick={()=>{toggleProfile(!openProfile)}}>
              <span>{'PT NETINDO MEDIATAMA PERKASA'}</span>
              <img className="inline h-6 rounded-full" src={'/logo.png'} />
              <svg fill="currentColor" viewBox="0 0 20 20"className="inline w-4 h-4 transition-transform duration-200 transform">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <div className={openProfile?'':'hidden'}>

                  <ul className={"absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700 "} aria-label="submenu">
                      <li className="flex">
                        <Link href="/profile"><a className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200" >
                          <svg className="w-4 h-4 mr-3" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>Profile</span>
                        </a>
                        </Link>
                      </li>
                      <li className="flex">
                        <button className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200" onClick={actLogout}>
                          <svg className="w-4 h-4 mr-3" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                          </svg>
                          <span>Log out</span>
                        </button>
                      </li>
                    </ul>
            </div>

                </li>
              </ul>
      </div>
    </header>

  );
};
export default Header;
