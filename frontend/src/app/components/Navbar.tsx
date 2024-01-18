import React from 'react';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className='flex fixed top-0 left-0 right-0 px-4 sm:px-6 md:px-8 py-4 justify-between items-center'>
            <div className="logo p-2">
                <Image src="/assets/logo-white.svg" alt="logo" width={142} height={142} />
            </div>
            <div className="links sm:block w-32">
                <ul className='flex space-x-4'>
                    <li>
                        <a href="" className='text-white font-medium hover:underline hover:text-primaryBlue'>Login</a>
                    </li>
                    <li>
                        <a href="" className='text-white font-medium hover:underline hover:text-primaryBlue'>Signup</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
