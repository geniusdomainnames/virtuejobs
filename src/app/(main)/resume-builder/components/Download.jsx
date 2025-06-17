import { useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { BsFiletypeDocx } from "react-icons/bs";
import { FaSpinner } from 'react-icons/fa';

export default function DownloadResume({selectedFormat, setSelectedFormat, loadingDownload, handleSubmit}) {
  



  const baseClasses =
    "w-[200px] border border-green-800 shadow p-3 rounded-2xl flex justify-center items-center cursor-pointer transition";

  return (
    <div>
      <h1 className="text-xl mb-4">Please select the resume format</h1>

      <div className="flex gap-10 mb-6">
        <div
          className={`${baseClasses} ${
            selectedFormat === "pdf"
              ? "bg-green-800 bg-opacity-80"
              : "hover:bg-green-900 hover:bg-opacity-50"
          }`}
          onClick={() => setSelectedFormat("pdf")}
        >
          <FaFilePdf size={50} color={selectedFormat === "pdf" ? "white" : "#309689"} />
        </div>

        <div
          className={`${baseClasses} ${
            selectedFormat === "docx"
              ? "bg-green-800 bg-opacity-80"
              : "hover:bg-green-900 hover:bg-opacity-50"
          }`}
          onClick={() => setSelectedFormat("docx")}
        >
          <BsFiletypeDocx size={50} color={selectedFormat === "docx" ? "white" : "#309689"} />
        </div>
      </div>

    <div className="flex items-center gap-3">
          <button
        className="border border-green-950 px-4 py-2 rounded disabled:opacity-50"
        disabled={!selectedFormat}
        onClick={()=>{handleSubmit()}}
      >
        Download
      </button>

           {
            loadingDownload &&   <FaSpinner className="animate-spin text-2xl text-green-600" />

           }

    </div>
    </div>
  );
}
