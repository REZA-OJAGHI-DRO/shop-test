import React from "react";
import "@/index.css";
import "@/App.css";
function AddNumber({
  width,
  label,
  modal,
  setModal,
  valuesArrayModal,
  styleLabel,
  styleError,
  styleBox,

}) {
  return (
    <div className={`${width} flex flex-wrap gap-1 lg:gap-3`}>
      <label htmlFor="" className={`${styleLabel} w-full`}>
        {label}
      </label>
      <div
        className={`${
          styleError == true ? "border-2 border-red-500" : ""
        } ${styleBox} w-full rounded-2xl px-2 gap-3 py-1 shadow-inner-custom-2 flex justify-between items-center`}
      >
        <div className="h-full w-[90%] flex p-1 myElement2 gap-2">   
                <div style={{display:valuesArrayModal==''?'none':'flex'}} className=" px-2 bg-[#E4E4E4] rounded-xl  justify-center items-center shadow-custom-6">
                  {valuesArrayModal}
                </div>
        </div>

       <svg
          onClick={() => ( modal == false ? setModal(true) : setModal(false))}
          className="cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="20%"
          height="100%"
          viewBox="0 0 33 33"
          fill="none"
        >
          <path
            d="M4 16.7178C4 9.81421 9.59644 4.21777 16.5 4.21777C23.4036 4.21777 29 9.81421 29 16.7178C29 23.6213 23.4036 29.2178 16.5 29.2178C9.59644 29.2178 4 23.6213 4 16.7178Z"
            fill="#969696"
          />
          <path d="M16 17.2178H11H16Z" fill="white" />
          <path
            d="M16 12.2178V17.2178M16 17.2178V22.2178M16 17.2178H21M16 17.2178H11"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default AddNumber;
