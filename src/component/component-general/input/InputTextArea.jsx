import { useRef, useState } from "react";
import "@/App.css";

function InputTextArea({ label, width, placeholder, checked, setData }) {
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
    <div className={`${width} flex flex-wrap gap-1 xl:gap-1`}>
      {label == "" ? null : (
        <label
          htmlFor=""
          className="w-full text-white text-[1rem] xl:text-[1.2rem]"
        >
          {label}
        </label>
      )}
      <textarea
        onChange={() => handleChange(event)}
        ref={textareaRef}
        name=""
        id=""
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={` w-[100%] px-2 text-[1rem] xl:text-[1rem] text-zinc-500 rounded-xl shadow-inner-custom bg-white`}
        style={{ resize: "none" }}
        disabled={!checked}
      ></textarea>
    </div>
  );
}

export default InputTextArea;
