import { useState } from "react";
import React from "react";
  const Button = ({abc}) => {
    return(
    <div>
        <button  className='bg-orange-400 px-5 py-5 rounded'
                onClick={abc}

                    
            >
                Add ToDo
            </button>
    </div>
    );
  };
  export default Button;