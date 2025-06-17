"use client"
import React from 'react'
import Link from 'next/link';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function PageNav({ page, filter, value }) {
  const prevPage = Math.max(page - 1, 1);
  const nextPage = page + 1;

  // Build query string for filter
  const query = (filter && value)
    ? `?filter=${encodeURIComponent(filter)}&value=${encodeURIComponent(value)}`
    : (filter ? `?filter=${encodeURIComponent(filter)}` : "");

  return (
    <div className="mt-4 flex gap-2 mx-auto justify-center w-full">
      <Link href={`/page/${prevPage}${query}`}>
        <button
          disabled={page === 1}
          className="lg:px-7 lg:py-7 px-3 py-3 bg-green-800 text-green-100 disabled:opacity-50 rounded-full shadow lg:w-[200px] w-[100px] flex gap-2 items-center justify-center"
        >
          <MdKeyboardDoubleArrowLeft size={20} />
          Previous
        </button>
      </Link>
      <Link href={`/page/${nextPage}${query}`}>
        <button
          className="lg:px-7 lg:py-7 px-3 py-3 bg-green-800 text-green-100 rounded-full shadow lg:w-[200px] w-[100px] flex gap-2 items-center justify-center"
        >
          Next
          <MdKeyboardDoubleArrowRight />
        </button>
      </Link>
    </div>
  );
}
