import { useState, useRef, useEffect } from "react";
import "@/index.css";

function Select({
  label,
  svg,
  width,
  options,
  data,
  setData,
  styleLabel,
  styleInput,
  styleError,
  styleBox,
  isDisabled,   
  selectedValueData
}) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(selectedValueData || '');
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const selectRef = useRef(null);
  const inputRef = useRef(null);  

  const toggleOptions = () => {
    if (!isDisabled) {  
      setIsOptionsOpen((prev) => !prev);
      setShowSearch(true); 
    }
  };

  const handleOptionSelect = (e, key, value) => {
    e.stopPropagation();
    if (!isDisabled) {  
      setSelectedValue(value);
      setIsOptionsOpen(false);
      setData(String(key));
      setSearchTerm(""); 
      setShowSearch(false); 
    }
  };

  const handleOutsideClick = (e) => {
    if (selectRef.current && !selectRef.current.contains(e.target) && inputRef.current && !inputRef.current.contains(e.target)) {
      setIsOptionsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // useEffect(() => {
  //   if (isDisabled) {
  //     setSelectedValue("");  
  //     setData(null);   
  //   }
  // }, [isDisabled]);  

  useEffect(() => {
    if (!data) {  
      setSelectedValue("");  
    }
  }, [data]);

  const filteredOptions = options.filter(option => 
    option.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <style>
        {`
          .boxFilter24{
            backdrop-filter:blur(10px);
            background:rgba(255,255,255,.5);
          }
          .custom-input {
            width: 80%; /* عرض فیکس */
            border: none; /* برداشتن بوردر */
            outline: none; /* برداشتن خط فوکوس */
            padding: 0.5rem; /* فاصله داخلی */
            background-color: transparent; /* پس‌زمینه شفاف */
          }
        `}
      </style>

      <div className={` h-[40px] xl:h-[50px] flex flex-wrap gap-1 xl:gap-3 mb-7 sm:mb-0 ${width}`}>
        <label htmlFor="" className={`${styleLabel} w-full`}>
          {label}
        </label>
        <div
          ref={selectRef}
          className={`${styleError ? 'border-2 border-red-500' : ''} ${styleBox} w-full rounded-2xl gap-3 py-1 shadow-custom-6 flex justify-between items-center relative`}
        >
          <div
            className={` ${styleInput} relative flex justify-between sm:justify-center items-center custom-select bg-transparent w-full text-center px-4 focus:border-transparent focus:outline-none cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}  
            onClick={toggleOptions}
            aria-expanded={isOptionsOpen}
            aria-controls="options-list"
          >
            {showSearch && (
              <input
                type="text"
                ref={inputRef}
                placeholder={!selectedValueData?"جستجو...": selectedValueData}
                value= {searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsOptionsOpen(true)}  
                className="custom-input"
              />
            )}
            {!showSearch && (
              <p className="w-full text-zinc-500 h-full flex justify-center items-center">
                {selectedValue || "انتخاب کنید"}
              </p>
            )}
          </div>
          {isOptionsOpen && !isDisabled && ( 
            <div
             style={{zIndex:'1000' }}
              id="options-list"
              className="absolute boxFilter24 bg-[rgba(255,255,255,.2)] top-[110%] h-[150px] py-3 left-0 w-full flex justify-center overflow-hidden rounded-2xl "
            >
              <div className="w-full flex flex-col" style={{zIndex:'1000'}}>
                <div dir="ltr" className="w-full overflow-y-scroll myElement flex flex-wrap gap-2 px-4 content-start rounded-2xl z-50">
                  {filteredOptions.map((val, i) => (
                    <div
                      dir="rtl"
                      key={i}
                      className="w-full h-[40px] lg:h-[35px] hover:scale-105 transition-all duration-300"
                    >
                      <div
                        className="w-full cursor-pointer h-full text-zinc-500 bg-white shadow-custom-6 rounded-2xl flex justify-center items-center"
                        onClick={(e) => handleOptionSelect(e, val.key, val.value)}
                      >
                        <p className="w-full h-full flex justify-center items-center gridArea">
                          {val.value}
                        </p>
                        <span className="h-full flex items-center translate-y-1 justify-end text-[1.7rem] gridArea">
                          <i className="bi bi-plus"></i>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Select;
