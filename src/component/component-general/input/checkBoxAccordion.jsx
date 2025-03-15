
import React from "react";

function checkBoxAccordion({ label, isChecked, onCheck , checkedSend}) {
  return (
    <>
      <div onClick={() => onCheck()} className="w-full cursor-pointer h-[40px] xl:h-[40px]  flex justify-center bg-[#E4E4E4] px-2 rounded-2xl items-center ">
        <div
          className="w-[100%] cursor-pointer h-full text-zinc-500  rounded-2xl flex justify-center items-center"
          
        >
          {label}
        </div>
        <div className="h-full flex items-center justify-center">
        {checkedSend===false ? (isChecked ? <Svg2 /> : <Svg1 />) : <Svg2 />}
        </div>
      </div>
    </>
  );
}

export default checkBoxAccordion;

function Svg1() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 40 40"
        fill="none"
      >
        <g filter="url(#filter0_d_0_562)">
          <rect
            x="5"
            y="4"
            width="25"
            height="24"
            rx="7"
            fill="#969696"
            shapeRendering="crispEdges"
          />
          <path d="M12 17L15.695 20.5L23.0849 13" fill="#83C100" />
          <path
            d="M12 17L15.695 20.5L23.0849 13"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_0_562"
            x="0.6"
            y="0.6"
            width="39.8"
            height="38.8"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="3" dy="4" />
            <feGaussianBlur stdDeviation="3.7" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_0_562"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_0_562"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
function Svg2() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 40 40"
        fill="none"
      >
        <g filter="url(#filter0_d_0_557)">
          <rect
            x="5"
            y="4"
            width="25"
            height="24"
            rx="7"
            fill="#83C100"
            shapeRendering="crispEdges"
          />
          <path d="M12 17L15.695 20.5L23.0849 13" fill="#83C100" />
          <path
            d="M12 17L15.695 20.5L23.0849 13"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_0_557"
            x="0.6"
            y="0.6"
            width="39.8"
            height="38.8"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="3" dy="4" />
            <feGaussianBlur stdDeviation="3.7" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_0_557"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_0_557"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}