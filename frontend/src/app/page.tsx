import Link from "next/link";
import React from "react";

import Button from "./components/Button";
import CreatePollWidget from "./components/CreatePollWidget";
import Navbar from "./components/Navbar";

export default function Home(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Navbar />
      <section className="flex h-[100vh] flex-col items-center justify-between sm:flex-row">
        <div className="headerCont">
          <h1 className="text-left  text-6xl font-bold text-white">Create a Poll <br /><span className="text-primaryBlue">in seconds</span>.</h1>
          <p className="my-[20px] text-left text-primaryLight">
            ouga bouga
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna ex,
            porttitor egestas vestibulum ut, tincidunt pellentesque erat. In blandit
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
