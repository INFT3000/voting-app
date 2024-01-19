import React from 'react'
import Navbar from './components/Navbar'
import Button from './components/Button'
import CreatePollWidget from './components/CreatePollWidget'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Navbar />
      <section className='flex justify-center items-center h-[100vh] flex-row'>
        <div className='headerCont w-[50%]'>
          <h1 className='text-6xl font-bold text-left text-white'>Create a Poll <br></br><span className='text-primaryBlue'>in seconds</span>.</h1>
          <p className='text-left text-primaryLight my-[20px]' >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec urna ex, 
            porttitor egestas vestibulum ut, tincidunt pellentesque erat. In blandit
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className='btnCont flex flex-row w-[325px] justify-between' >
            <Button theme='primary'>
              <Link href='/signup'>Login</Link>
            </Button>
            <Button theme='secondary'>
            <Link href='/signup'>Signup</Link>
            </Button>
          </div>
        </div>
        <div className='pollCreationCont w-[50%] flex justify-center items-center'>
          <CreatePollWidget />
        </div>
      </section>
    </main>
  )
}
