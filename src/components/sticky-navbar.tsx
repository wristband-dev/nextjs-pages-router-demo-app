import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { redirectToLogout } from '@wristband/react-client-auth';

import Logo from '../../public/wristband-logo.png';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const pathname = usePathname();

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed z-[999] w-full h-16 shadow-xl bg-slate-900 text-white border-b border-white">
      <div className="flex justify-between items-center h-full w-full pl-6 pr-8 2xl:px-16">
        <div className="flex left items-center">
          <Link href="/" className="cursor-pointer mr-4">
            <Image src={Logo} alt="Logo" height="40" className="cursor-pointer" priority />
          </Link>
          <p className="text-sm font-semibold">
            Next.js Demo
            <br /> (Pages Router)
          </p>
        </div>
        <div className="hidden sm:flex">
          <ul className="hidden sm:flex">
            <Link href="/">
              <li
                className={`ml-8 capitalize border-b-2 transition ease-in-out duration-200 text-xl ${
                  pathname === '/' ? 'border-pink text-pink' : 'border-transparent hover:border-pink hover:text-pink'
                }`}
              >
                Client
              </li>
            </Link>
            <Link href="/server">
              <li
                className={`ml-8 capitalize border-b-2 transition ease-in-out duration-200 text-xl ${
                  pathname === '/server'
                    ? 'border-pink text-pink'
                    : 'border-transparent hover:border-pink hover:text-pink'
                }`}
              >
                Server
              </li>
            </Link>
            <div onClick={() => redirectToLogout('/api/auth/logout')} className="cursor-pointer">
              <li className="ml-8 capitalize border-b-2 border-transparent hover:border-pink hover:text-pink transition ease-in-out duration-200 text-xl">
                Log Out
              </li>
            </div>
          </ul>
        </div>
        <div
          onClick={handleNav}
          className="sm:hidden cursor-pointer pl-24 hover:text-pink transition ease-in-out duration-200"
        >
          <AiOutlineMenu size={25} />
        </div>
      </div>
      <div
        className={
          menuOpen
            ? 'fixed left-0 top-0 w-[100%] sm:hidden h-screen bg-[#ecf0f3] p-10 ease-in duration-300'
            : 'fixed left-[-100%] top-0 p-10 h-screen ease-in duration-300'
        }
      >
        <div className="flex w-full items-center justify-end text-black">
          <div onClick={handleNav} className="cursor-pointer hover:text-pink transition ease-in-out duration-200">
            <AiOutlineClose size={25} />
          </div>
        </div>
        <div className="flex-col py-4 text-black">
          <ul>
            <Link href="/">
              <li
                onClick={() => setMenuOpen(false)}
                className="py-4 cursor-pointer hover:text-pink transition ease-in-out duration-200"
              >
                Client
              </li>
            </Link>
            <Link href="/server">
              <li
                onClick={() => setMenuOpen(false)}
                className="py-4 cursor-pointer hover:text-pink transition ease-in-out duration-200"
              >
                Server
              </li>
            </Link>
            <div onClick={() => redirectToLogout('/api/auth/logout')} className="cursor-pointer">
              <li
                onClick={() => setMenuOpen(false)}
                className="py-4 cursor-pointer hover:text-pink transition ease-in-out duration-200"
              >
                Log Out
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}
