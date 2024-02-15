import Link from "next/link";
import React from "react";

import Button from "./components/Button";
import CreatePollWidget from "./components/CreatePollWidget";
import Navbar from "./components/Navbar";

export default function Home(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Navbar />
      <section className="flex h-[100vh] flex-col items-center justify-between xs:flex-col sm:flex-row md:flex-row lg:flex-row">
        <div className="headerCont w-[40%]">
          <h1 className="text-left text-5xl font-bold text-white"><span className="text-primaryBlue">Make a poll in less time</span> than it takes to read this</h1>
          <p className="my-[20px] text-left text-primaryLight">
          Seeking fast feedback or curious about opinions? Quick Poll makes creating straw polls a breeze. Dive in, get insights, and see what your audience thinks today!
          </p>
          <div className="btnCont flex w-[325px] flex-row justify-between">
            <Button theme="primary">
              <Link href="/signup">Login</Link>
            </Button>
            <Button theme="secondary">
              <Link href="/signup">Signup</Link>
            </Button>
          </div>
        </div>
        <div className="pollCreationCont flex w-[40%] items-center justify-end">
          <CreatePollWidget />
        </div>
      </section>
    </main>
  );
}
