"use client";

import Image from "next/image";
import {
  Tab, TabList, TabPanel, Tabs,
} from "react-tabs";

import FormContainer from "../components/FormContainer";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import Signup from "../components/Signup";

export default function Auth(): JSX.Element {
  return (
    <main>
      <Navbar />
      <div className="flex h-screen items-center justify-center">
        <div>
          <FormContainer className="p-0">
            <Tabs>
              <TabList className="flex w-full items-center justify-between">
                <Tab selectedClassName="bg-tetraDark tranistion-all" className="w-full cursor-pointer p-3 text-center font-bold transition-all">Login</Tab>
                <Tab selectedClassName="bg-tetraDark tranistion-all" className="w-full cursor-pointer p-3 text-center font-bold transition-all">Register</Tab>
              </TabList>
              <div className="logo flex w-full items-center justify-center p-2">
                <Image src="/assets/logo-white.svg" alt="logo" width={190} height={190} />
              </div>
              <div className="px-[25px] pb-[25px]">
                <TabPanel className="">
                  <Login className="" />
                </TabPanel>
                <TabPanel className="">
                  <Signup className="" />
                </TabPanel>
              </div>
            </Tabs>
          </FormContainer>
        </div>
      </div>
    </main>
  );
}
