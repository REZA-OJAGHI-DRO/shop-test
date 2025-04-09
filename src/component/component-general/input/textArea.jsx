import { useRef, useState } from "react";
import "@/App.css";

function textArea({ label, width, placeholder, checked,data,setData ,styleError , styleTextarea , styleLabel}) {
    const [focused, setFocused] = useState(false);
    const textareaRef = useRef(null);
  
    const handleChange = (e) => {
      const inputValue = e.target.value;
        setData(inputValue);
    };
    const handleFocus = () => {
      setFocused(true);
      if (textareaRef.current) {
        textareaRef.current.style.paddingTop = "0";
        textareaRef.current.style.paddingBottom = "0";
        textareaRef.current.style.textAlign = "right";
        textareaRef.current.style.direction = "ltr";
      }
    };
  
    const handleBlur = () => {
      setFocused(false);
      if (textareaRef.current) {
        //   textareaRef.current.style.paddingTop = "calc((50px) / 2)";
        //   textareaRef.current.style.paddingBottom = "calc((50px) / 2)";
        textareaRef.current.style.textAlign = "center";
        textareaRef.current.style.direction = "rtl";
      }
    };
  
    return (
      <div className={`${width} flex flex-wrap gap-0 overflow-hidden rounded-2xl xl:gap-0`}>
        {label == "" ? null : (
          <label
            htmlFor=""
            className={`${styleLabel} w-full  text-[1rem] xl:text-[1rem]`}
          >
            {label}
          </label>
        )}
        <textarea
          onChange={() => handleChange(event)}
          ref={textareaRef}
          name=""
          id=""
          value={data === null ? "" : data}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${styleError == true?'border-2 border-red-500':''} ${styleTextarea} myElement w-[100%] px-2 text-[1rem] xl:text-[1rem] text-zinc-500 rounded-2xl shadow-inner-custom-2 bg-[rgb(217,217,217)] placeholder:text-center`}
          style={{ resize: "none" }}
          disabled={!checked}
        ></textarea>
      </div>
    );
}

export default textArea