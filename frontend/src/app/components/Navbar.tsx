"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import Button from "./Button";
import {
  JwtPayload, QpAxios, getToken, getUserData,
} from "@/helpers/quickpollaxios";

export default function Navbar(): JSX.Element {
  const [userData, setUserData] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const user = getUserData();
    setUserData(user);
    console.log("User data set:", user);
  }, []);
  return (
    <nav className="fixed inset-x-0 top-0 flex items-center justify-between  sm:px-6 md:px-8 lg:px-24">
      <div className="logo p-2">
        <Image src="/assets/logo-white.svg" alt="logo" width={142} height={142} />
      </div>

      {/*  eslint-disable-next-line jsx-control-statements/jsx-use-if-tag */}
      {userData && userData.user_id ? (
        <Button theme="secondary">
          <Link href="/auth">Sign out</Link>
        </Button>
      ) : (
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
      )}
    </nav>
  );
}
