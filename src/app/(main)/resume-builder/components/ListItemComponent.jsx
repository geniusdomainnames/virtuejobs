

import React from "react";
import { IoTrashBin } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
export default function ListItemComponent({ title, deleteAction, editAction }) {

    return (
        <div className="flex flex-col lg:flex-row justify-between items-center p-4 gap-4 border-b-2 border-b-green-300 hover:bg-green-100 cursor-pointer bg-green-50 rounded-2xl">
            <p>{title}</p>

            <div className="flex gap-2 text-gray-500">
                <p onClick={() => { editAction() }} className="text-indigo-600 hover:text-indigo-900" ><FiEdit /></p>
                <p onClick={() => { deleteAction() }}  className="text-red-600 hover:text-red-900" ><IoTrashBin /></p>
               
            </div>

        </div>
    )
}