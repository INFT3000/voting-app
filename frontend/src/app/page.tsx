import Link from "next/link";
import React from "react";

import Button from "./components/Button";
import CreatePollWidget from "./components/CreatePollWidget";
import Navbar from "./components/Navbar";

export default function Home(): JSX.Element {
  return (
    <main className="flex size-[100vh] flex-col items-center justify-between gap-10 p-24 lg:flex-row lg:gap-0">
      <Navbar />

      <div className="header flex w-full flex-col items-center justify-center gap-2 lg:w-1/2 lg:items-start">
        <div className="headerCont flex w-full flex-col items-center">
          {/* eslint-disable-next-line max-len */}
          <h1 className="w-full text-center text-4xl font-bold text-white md:text-6xl lg:text-left"><span className="text-primaryBlue">Make a poll in less time</span> than it takes to read this</h1>
          <p className="my-[20px] hidden text-center text-primaryLight md:block lg:text-left">
            Seeking fast feedback or curious about opinions? Quick Poll makes creating straw polls a breeze. Dive in, get insights, and see what your audience thinks today!
          </p>
        </div>
        <div className="buttonCont flex flex-row items-center justify-center gap-5 lg:items-start">
          <Button theme="primary">
            <Link href="/auth">Login</Link>
          </Button>
          <Button theme="secondary">
            <Link href="/auth">Signup</Link>
          </Button>
        </div>
      </div>
      <div className="pollCreationCont ">
        <CreatePollWidget />
      </div>
    </main>
  );
}
