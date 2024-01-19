import Link from "next/link";
import React from "react";

import Button from "./components/Button";
import CreatePollWidget from "./components/CreatePollWidget";
import Navbar from "./components/Navbar";

export default function Home(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Navbar />
      <section className="flex h-[100vh] flex-row items-center justify-center">
        <div className="headerCont w-[50%]">
          <h1 className="text-left text-6xl font-bold text-white">Create a Poll <br /><span className="text-primaryBlue">in seconds</span>.</h1>
          <p className="my-[20px] text-left text-primaryLight">
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
        <div className="pollCreationCont flex w-[50%] items-center justify-center">
          <CreatePollWidget />
        </div>
      </section>
    </main>
  );
}
