import React, { forwardRef } from "react";

const InputNumber = forwardRef(
  (
    {
      placeholder,
      label,
      svg,
      svg2,
      width,
      styleLabel,
      styleInput,
      styleBox,
      disabled,
      type,
      onChange,
      value,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={`${width} flex flex-wrap gap-1 lg:gap-1`}>
        <label htmlFor="" className={`${styleLabel} w-full whitespace-nowrap`}>
          {label}
        </label>
        <div
          className={` w-full rounded-xl ${styleBox} bg-[rgba(228, 228, 228, 1)] px-2 gap-3 py-1 shadow-inner-custom-2 flex justify-between items-center`}
        >
          <input
            {...rest}
            ref={ref} 
            onChange={onChange}
            value={value ?? ''}
            type={type}
            className={`${styleInput} appearance-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden placeholder:text-[.9rem] bg-transparent w-full text-right px-2 focus:border-transparent focus:outline-none placeholder:text-center`}
            placeholder={placeholder || ''}
            disabled={disabled}
          />
          {svg && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "20px", height: "20px" }}
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                d="M22.8541 16.6187C22.6502 18.1093 21.8893 19.4775 20.7135 20.4677C19.5378 21.458 18.0275 22.0027 16.4648 22C7.3863 22 1.03461e-05 14.8939 1.03461e-05 6.15984C-0.00279093 4.65644 0.563343 3.20347 1.59267 2.0723C2.62201 0.941132 4.04414 0.209117 5.59347 0.0129775C5.98525 -0.0330459 6.38201 0.0440659 6.72449 0.232802C7.06698 0.421538 7.33684 0.711775 7.49378 1.06019L9.90862 6.24674V6.25994C10.0288 6.52664 10.0784 6.81782 10.0531 7.10747C10.0277 7.39712 9.92821 7.67623 9.76341 7.91985C9.74283 7.94955 9.7211 7.97705 9.69823 8.00455L7.3177 10.7194C8.1741 12.3936 9.99437 14.1294 11.7575 14.9555L14.5405 12.6774C14.5678 12.6553 14.5964 12.6347 14.6262 12.6158C14.8793 12.4534 15.1704 12.3543 15.4732 12.3274C15.7761 12.3006 16.0811 12.3467 16.3608 12.4618L16.3756 12.4684L21.7621 14.7905C22.1249 14.941 22.4273 15.2004 22.6242 15.5299C22.821 15.8594 22.9016 16.2414 22.8541 16.6187Z"
                fill="#535353"
              />
            </svg>
          )}
          {svg2 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "20px", height: "20px" }}
              viewBox="0 0 20 21"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.66667 6.33333C6.66667 5.44928 7.01786 4.60143 7.64298 3.97631C8.2681 3.35119 9.11594 3 10 3C10.8841 3 11.7319 3.35119 12.357 3.97631C12.9821 4.60143 13.3333 5.44928 13.3333 6.33333C13.3333 7.21739 12.9821 8.06523 12.357 8.69036C11.7319 9.31548 10.8841 9.66667 10 9.66667C9.11594 9.66667 8.2681 9.31548 7.64298 8.69036C7.01786 8.06523 6.66667 7.21739 6.66667 6.33333ZM6.66667 11.3333C5.5616 11.3333 4.50179 11.7723 3.72039 12.5537C2.93899 13.3351 2.5 14.3949 2.5 15.5C2.5 16.163 2.76339 16.7989 3.23223 17.2678C3.70107 17.7366 4.33696 18 5 18H15C15.663 18 16.2989 17.7366 16.7678 17.2678C17.2366 16.7989 17.5 16.163 17.5 15.5C17.5 14.3949 17.061 13.3351 16.2796 12.5537C15.4982 11.7723 14.4384 11.3333 13.3333 11.3333H6.66667Z"
                fill="#424242"
              />
            </svg>
          )}
        </div>
      </div>
    );
  }
);

export default InputNumber;
