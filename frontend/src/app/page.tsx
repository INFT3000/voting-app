"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Button from "./components/Button";
import CreatePollWidget from "./components/CreatePollWidget";
import Navbar from "./components/Navbar";
import {
  JwtPayload, QpAxios, getToken, getUserData,
} from "@/helpers/quickpollaxios";

export default function Home(): JSX.Element {
  const [userData, setUserData] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const user = getUserData();
    setUserData(user);
    console.log("User data set:", user);
  }, []);

  return (
    <main className="flex h-[100vh] w-[100vw] flex-col items-center justify-between gap-10 p-24 lg:flex-row lg:gap-0">
      <Navbar />

      <div className="header flex w-full flex-col items-center justify-center gap-2 lg:w-1/2 lg:items-start">
        <div className="headerCont flex w-full flex-col items-center">
          <h1 className="w-full text-center text-4xl font-bold text-white md:text-6xl lg:text-left">
            <span className="text-primaryBlue">Make a poll in less time</span> than it takes to read this
          </h1>
          <p className="my-[20px] hidden text-center text-primaryLight md:block lg:text-left">
            Seeking fast feedback or curious about opinions? Quick Poll makes
            creating straw polls a breeze. Dive in, get insights, and see what
            your audience thinks today!
          </p>
        </div>
        <div>
          {/*  eslint-disable-next-line jsx-control-statements/jsx-use-if-tag */}
          {userData && userData.user_id ? (
            <div> </div>
          ) : (
            <div className="buttonCont flex flex-row items-center justify-center gap-5 lg:items-start">
              <Button theme="primary">
                <Link href="/auth">Login</Link>
              </Button>
              <Button theme="secondary">
                <Link href="/auth">Signup</Link>
              </Button>
            </div>
          )}

        </div>
      </div>

      <div className="pollCreationCont">
        <CreatePollWidget />
      </div>
    </main>
  );
}
