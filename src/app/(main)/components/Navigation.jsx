import NavLink from "./NavLink";
import Link from "next/link";
import Image from "next/image";

import React from 'react'
import Logo from "./Logo";

export default async function Navigation() {

  return (
    
    <nav className="sticky top-0  z-50 bg-green-950 mx-auto px-4 sm:px-6 lg:px-8 py-5 rounded-bl-3xl rounded-br-3xl lg:rounded-bl-4xl lg:rounded-br-4xl">
      <div className="px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center  w-full justify-between lg:pr-[100px]">

            <div >
              <Logo />
            </div>

            <div className="hidden md:flex items-center gap-8">


              <NavLink href="/about" label="About us" />
              <NavLink href="/contact" label="Contact us" />

            </div>



            {/* Auth Buttons */}
            <div className="">
              <Link
                href="/resume-builder"
                //className=" text-sm text-center  lg:w-[150px] bg-green-600 text-white lg:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                 className=" text-sm text-center px-2 lg:w-[150px] bg-green-600 text-white lg:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Resume Builder
              </Link>
            </div>


          </div>


        </div>


       
      </div>













      <div>






      </div>

      <div className="flex items-center justify-between">
          {/* <JobFilter /> Removed from Navigation */}
        </div>
    </nav>
  )
}
