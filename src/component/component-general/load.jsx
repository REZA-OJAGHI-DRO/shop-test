import React from 'react'

function Load({load , text}) {
  return (
    <>
    <style>
        {`
      .boxFilter11{
      // background:rgba(0,0,0,.3);
      backdrop-filter:blur(10px);
      }
      `}
      </style>
    <div style={{display:load==true?'flex':'none' , zIndex:'1000'}} className="w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,.5)]  boxFilter11  flex-wrap content-center justify-center items-center">
    <div className="sk-chase">
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
      <div className="sk-chase-dot"></div>
    </div>
    <p className="w-full text-center text-white text-[2rem]">{text}</p>
  </div>
  </>
  )
}

export default Load