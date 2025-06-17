import Link from 'next/link';
import React from 'react'
import { MdOutlineDateRange } from "react-icons/md";
import { PiTimerLight } from "react-icons/pi";


import { Rowdies } from 'next/font/google';


const rowdies = Rowdies({
  subsets: ['latin'],
  weight: ['300', '400', '700'], // optional: customize weights
});

export default function BlogListItem({ blogpost }) {
  return (
    <div className=" flex  flex-col gap-3 bg-white p-6 rounded-lg shadow-lg border border-gray-100 lg:w-full w-[95%] mx-auto ">
      <div className='flex flex-col gap-4'>
        <div className='flex gap-2 lg:flex-row flex-col-reverse items-center justify-between'>
          <p className='bg-green-100 text-xs lg:max-w-[250px] w-full text-grey-200 text-center border border-green-100 shadow-md py-2 px-3 rounded-3xl'>{blogpost.category}</p>
          <div className=' bg-purple-100 text-xs flex items-center justify-center gap-2 lg:max-w-[280px] w-full text-grey-200 text-center border border-green-100 shadow-md py-2 px-3 rounded-3xl'>
            <MdOutlineDateRange />
            {blogpost.created_at === blogpost.updated_at
              ? `Posted on: ${new Date(blogpost.created_at).toDateString()}`
              : `Updated on: ${new Date(blogpost.updated_at).toDateString()}`}
          </div>
        </div>
         
        <h1 className={`${rowdies.className} text-3xl text-bold`} >{blogpost.title}</h1>

      </div >
      <p className='text-base lg:text-xl text-gray-600 leading-9'>{blogpost.excerpt}</p>

      <div className='flex items-center justify-between mt-4'>

       <div className='flex justify-start'>

              <div className='flex items-center gap-1 text-xs'>
                <PiTimerLight />
                <p>{blogpost.readtime} minutes read</p> 
              </div>

       </div>
       <div className='flex justify-end'>
         <Link className="text-green-100 bg-green-600 hover:text-green-300 font-medium flex items-center gap-2 py-3 px-5 rounded-full" href={`/blog/post/${blogpost.slug}`}>
        Read more..
      </Link>
       </div>

      </div>
    </div >
  )
}
