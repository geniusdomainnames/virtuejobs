

import React, { useState } from 'react';


export default function AddListItem({ label, action }) {
 

  return (
     <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-lg"
     onClick={() => {
        action();
      }}
     >
      { label }
     
    </div>
  );
}