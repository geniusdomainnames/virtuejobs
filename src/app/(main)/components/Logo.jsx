import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Logo() {
  return (
    
  <div className=" flex items-center gap-2 ">
        <Link href="/">
                <Image
                  src="/svgs/logo.svg"
                  alt="site-logo"
                  width={50}
                  height={50}
                  priority
                  className='w-5'
                />
              </Link>
              <Link href="/">
                <p className="lg:text-xl font-bold text-green-200 cursor-pointer"><span className='text-green-400 font-extrabold text-2xl lg:text-3xl'>Virtue</span>Jobs</p>
              </Link>
    </div>
    
  
  )
}
