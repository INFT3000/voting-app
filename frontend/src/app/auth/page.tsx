"use client";

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
          <FormContainer>
            <Tabs>
              <TabList className="flex gap-2">
                <Tab selectedClassName="">Login</Tab>
                <Tab selectedClassName="">Register</Tab>
              </TabList>

              <TabPanel>
                <Login className="" />
              </TabPanel>
              <TabPanel>
                <Signup className="" />
              </TabPanel>
            </Tabs>
          </FormContainer>
        </div>
      </div>
    </main>
  );
}
