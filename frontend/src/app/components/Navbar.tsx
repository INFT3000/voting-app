
import Image from 'next/image'
export default function Navbar() {
    return (
        <nav className='flex fixed top-0 left-0 right-0 px-[300px] py-[18px] justify-between items-center'>
            <div className="logo">
                <Image src="/assets/logo-white.png" alt="logo" width={142} height={142} />
            </div>
            <div className="links w-32">
                <ul className='flex w-200 justify-between'>
                    <li className=''>
                        <a href="" className='text-white font-medium hover:underline hover:text-primaryBlue'>Login</a>
                    </li>
                    <li className=''>
                        <a href="" className='text-white font-medium hover:underline hover:text-primaryBlue'>Signup</a>
                    </li>
                </ul>
            </div>

        </nav>
    );
}