import Link from "next/link";
import React from "react";

import Button from "./components/Button";
import CreatePollWidget from "./components/CreatePollWidget";
import Navbar from "./components/Navbar";

export default function Home(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-center lg:flex-row">
      <Navbar />

      <div className="header w-full lg:w-1/2">
        <div className="headerCont flex flex-col p-20">
          <h1 className="text-left text-5xl font-bold text-white"><span className="text-primaryBlue">Make a poll in less time</span> than it takes to read this</h1>
          <p className="my-[20px] text-left text-primaryLight">
            Seeking fast feedback or curious about opinions? Quick Poll makes creating straw polls a breeze. Dive in, get insights, and see what your audience thinks today!
          </p>
        </div>
        <div className="buttonCont flex flex-row items-center justify-center lg:items-start">
          <Button theme="primary">
            <Link href="/signup">Login</Link>
          </Button>
          <Button theme="secondary">
            <Link href="/signup">Signup</Link>
          </Button>
        </div>
      </div>
      <div className="pollCreationCont pt-[100px] ">
        <CreatePollWidget />
      </div>
    </main>

  );
}
