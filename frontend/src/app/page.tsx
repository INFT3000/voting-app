import Link from "next/link";
import React from "react";

import Button from "./components/Button";
import CreatePollWidget from "./components/CreatePollWidget";
import Navbar from "./components/Navbar";

export default function Home(): JSX.Element {
  return (
    <main className="flex flex-col md:flex-row">
  <Navbar />
  <section className="flex flex-col md:flex-row items-center justify-center">
    <div className="headerCont text-center md:text-left md:w-1/2 pt-10">
      <h1 className="text-white text-3xl md:text-5xl mb-4">
        Create a Poll <br />
        <span className="text-primaryBlue">in seconds</span>.
      </h1>
      <p className="text-primaryLight text-sm md:text-base">
        ouga bouga
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna ex,
        porttitor egestas vestibulum ut, tincidunt pellentesque erat. In blandit
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <div className="btnCont mt-4 md:mt-6">
        <Button theme="primary">
          <Link href="/signup">Login</Link>
        </Button>
        <Button theme="secondary" className="ml-2 md:ml-4">
          <Link href="/signup">Signup</Link>
        </Button>
      </div>
    </div>
    <div className="pollCreationCont md:w-1/2 pt-[100px] pl-[50px]">
      <CreatePollWidget />
    </div>
  </section>
</main>

  );
}
