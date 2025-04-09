import React, { forwardRef } from "react";

const InputTextArea = forwardRef(
  (
    {
      label,
      width,
      placeholder,
      disabled,
      styleTextarea,
      styleLabel,
      onChange,
      value,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className={`${width} flex flex-wrap gap-0 overflow-hidden rounded-2xl xl:gap-0`}
      >
        {label && (
          <label
            className={`${styleLabel} w-full text-[1rem] xl:text-[1rem]`}
          >
            {label}
          </label>
        )}
        <textarea
          {...rest}
          ref={ref}  
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          className={`myElement w-[100%] px-2 text-[1rem] xl:text-[1rem] text-zinc-500 rounded-2xl shadow-inner-custom-2 bg-[rgb(217,217,217)] ${styleTextarea}`}
          style={{ resize: "none" }}
          disabled={disabled}
        ></textarea>
      </div>
    );
  }
);

export default InputTextArea;
