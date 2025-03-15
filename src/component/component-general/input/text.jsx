import { useState, useEffect } from "react";

function Text({
  placeholder,
  label,
  svg,
  svg2,
  width,
  setData,
  styleLabel,
  styleInput,
  styleError,
  disabled,
  styleBox,
}) {
  const [valueText, setValueText] = useState("");

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const pattern = /^[a-zA-Z\u0600-\u06FF\s]+$/;
    if (pattern.test(inputValue)) {
      setValueText(inputValue);
    } else {
      setValueText("");
    }
  };

  useEffect(() => {
    setData(valueText);
  }, [valueText, setData]);

  return (
    <div className={`${width} flex flex-wrap gap-2 lg:gap-3`}>
      <label htmlFor="" className={`${styleLabel} w-full`}>
        {label}
      </label>
      <div
        className={`${
          styleError ? "border-2 border-red-500" : ""
        } ${styleBox} w-full rounded-2xl px-2 gap-3 py-1 shadow-inner-custom-2 flex justify-between items-center`}
      >
        <input
          onChange={handleChange}
          value={valueText === null ? "" : valueText}
          type="text"
          className={`${styleInput} bg-transparent w-full text-right px-4 focus:border-transparent focus:outline-none placeholder:text-center text-gray-very-dark`}
          placeholder={placeholder}
          disabled={disabled}
        />
        {svg ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 35 35"
            fill="none"
            style={{ width: "35px", height: "35px" }}
          >
            <path
              d="M21.8845 14.2395C24.4791 14.2395 26.5824 12.3461 26.5824 10.0104C26.5824 7.6747 24.4791 5.78125 21.8845 5.78125C19.29 5.78125 17.1866 7.6747 17.1866 10.0104C17.1866 12.3461 19.29 14.2395 21.8845 14.2395Z"
              stroke="#575757"
              strokeOpacity="0.69"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.46216 28.1352C8.46216 22.7962 13.8708 18.4686 20.5424 18.4686M26.5825 28.7394L33.2938 22.6978L30.6093 20.2811L23.898 26.3227V28.7394H26.5825Z"
              stroke="#575757"
              strokeOpacity="0.69"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : svg2 === 2 ? (
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
  );
}

export default Text;
