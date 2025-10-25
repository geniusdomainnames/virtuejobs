"use client"

import React from 'react'
import { useState } from 'react'

export default function ApplicationLinkComponent({applicationLink}) {
  const [showApplicationLink, setShowAppllicationLink]= useState(false)
  return (
     <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Application Link</h2>

            {
              showApplicationLink ?
                (

                  <p className=" overflow-hidden">
                    <a
                      href={applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full max-w-full text-blue-500 hover:underline break-all"
                    >
                      {applicationLink}
                    </a>
                  </p>

                ) :

                (

                  <button className="flex justify-between mt-2 bg-green-500 text-white p-2 rounded max-w-[100px] " onClick={() => {
                    setShowAppllicationLink(true)
                  }}>Show Link</button>
                 

                )


            }

       </div>
  )
}
