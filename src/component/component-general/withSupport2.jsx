import React from 'react'
import svg from '/img/Group.png'

function withSupport2() {
    return (
        <>
        <button className="h-full text-[1rem] text-white lg:text-[1rem] flex  gap-2 font-semibold">
         <span className="text-[#424242]">
             تماس با پشتیبانی
            </span>
            <img src={svg} className="w-[25px] h-[25px]" alt="" />
        </button>
        </>
      );
}

export default withSupport2