import Image from "next/image";

export default function Navbar(): JSX.Element {
  return (
    <nav className="fixed inset-x-0 top-0 flex items-center justify-between p-4 sm:px-6 md:px-8">
      <div className="logo p-2">
        <Image src="/assets/logo-white.svg" alt="logo" width={142} height={142} />
      </div>
      <div className="links w-32 sm:block">
        <ul className="flex space-x-4">
          <li>
            <a href="" className="font-medium text-white hover:text-primaryBlue hover:underline">Login</a>
          </li>
          <li>
            <a href="" className="font-medium text-white hover:text-primaryBlue hover:underline">Signup</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
