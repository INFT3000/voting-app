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
          <h1 className="text-6xl text-white">
            Create a Poll <br />
            <span className="text-primaryBlue">in seconds</span>.
          </h1>
          <p className="text-left text-primaryLight">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna ex,
            porttitor egestas vestibulum ut, tincidunt pellentesque erat. In blandit
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <div className="buttonCont m-2 flex flex-row">
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
