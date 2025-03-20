import React, { forwardRef } from "react";

const InputTextNoValid = forwardRef(
  (
    {
      placeholder,
      label,
      svg,
      width,
      styleLabel,
      styleInput,
      disabled,
      styleBox,
      value,
      onChange,
      type,
      ...rest
    },
    ref
  ) => {
    return (
      <React.Fragment>
        <div className={`${width} flex flex-wrap gap-2 lg:gap-2`}>
          {label && (
            <label htmlFor="" className={`${styleLabel} w-full`}>
              {label}
            </label>
          )}
          <div
            className={` ${styleBox} w-full rounded-2xl px-2 gap-3 py-1 shadow-inner-custom-2 flex justify-between items-center`}
          >
            <input
              ref={ref} 
              value={value}
              onChange={onChange}
              type={type}
              {...rest}
              placeholder={placeholder}
              className={`${styleInput} bg-transparent w-full text-right px-4 focus:border-transparent focus:outline-none placeholder:text-center`}
              disabled={disabled}
            />
            {svg === true ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 41 44"
                fill="none"
                style={{ width: "20px", height: "20px" }}
                className="cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.625 21.5C0.625 19.7429 1.32299 18.0578 2.56542 16.8154C3.80785 15.573 5.49294 14.875 7.25 14.875H33.75C35.5071 14.875 37.1922 15.573 38.4346 16.8154C39.677 18.0578 40.375 19.7429 40.375 21.5V36.9583C40.375 38.7154 39.677 40.4005 38.4346 41.6429C37.1922 42.8853 35.5071 43.5833 33.75 43.5833H7.25C5.49294 43.5833 3.80785 42.8853 2.56542 41.6429C1.32299 40.4005 0.625 38.7154 0.625 36.9583V21.5ZM22.7083 25.9167C22.7083 25.331 22.4757 24.7693 22.0615 24.3551C21.6474 23.941 21.0857 23.7083 20.5 23.7083C19.9143 23.7083 19.3526 23.941 18.9385 24.3551C18.5243 24.7693 18.2917 25.331 18.2917 25.9167V32.5417C18.2917 33.1274 18.5243 33.6891 18.9385 34.1032C19.3526 34.5173 19.9143 34.75 20.5 34.75C21.0857 34.75 21.6474 34.5173 22.0615 34.1032C22.4757 33.6891 22.7083 33.1274 22.7083 32.5417V25.9167Z"
                  fill="#ffffff"
                />
                <path
                  d="M11.6667 17.0833V10.4583C11.6667 8.11559 12.5973 5.86879 14.2539 4.21222C15.9105 2.55565 18.1573 1.625 20.5 1.625C22.8428 1.625 25.0895 2.55565 26.7461 4.21222C28.4027 5.86879 29.3333 8.11559 29.3333 10.4583V17.0833"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
);

export default InputTextNoValid;
