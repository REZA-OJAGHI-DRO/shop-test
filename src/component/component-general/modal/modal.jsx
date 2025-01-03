import React from 'react'

function Modal({ onClose, title, children, style }) {
  return (
    <>
    <style>
      {`
    .boxFilter11{
  //   background:rgba(0,0,0,.3);
    backdrop-filter:blur(10px);
    }
    .boxFilter12{
  //   background:rgba(0,0,0,.3);
    backdrop-filter:blur(10px);
    }
    `}
    </style>
    <div className="fixed z-50 w-[100vw] inset-0 bg-opacity-50 flex items-center justify-center boxFilter11">
      <div
        className={` ${style}  py-4 bg-[rgba(229,231,235,1)] shadow-custom-6 boxFilter12 rounded-2xl overflow-hidden`}
      >
        <div className="flex justify-between items-center px-4 border-b-2 border-zinc-300">
          <h2 className="text-lg font-bold">{title}</h2>
          <button type="button" onClick={onClose} className="text-red-500 text-[2rem]">
            &times;
          </button>
        </div>
        
        <div className="w-full h-[85%] px-4 mt-4 overflow-y-auto py-4">
          {children}
        </div>
      </div>
    </div>
  </>
  )
}

export default Modal

