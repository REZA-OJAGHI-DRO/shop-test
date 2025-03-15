

function code({ valueCod, setValueCod, label }) {
    const [valueArray, setValueArray] = useState(["", "", "", "", ""]);
    const inputRefs = useRef([]);
  
    const handleChange = (e, index) => {
      const inputValue = e.target.value;
      const pattern = /^[0-9]*$/;
      if (pattern.test(inputValue)) {
        const newValueArray = [...valueArray];
        newValueArray[index] = inputValue;
        setValueArray(newValueArray);
  
        if (inputValue && index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
  
        setValueCod(newValueArray.join(''));
      }
    };
  
    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace") {
        if (valueArray[index] === "") {
          if (index > 0) {
            inputRefs.current[index - 1].focus();
          }
        } else {
          const newValueArray = [...valueArray];
          newValueArray[index] = "";
          setValueArray(newValueArray);
          setValueCod(newValueArray.join(''));
        }
      }
    };
  
    return (
      <div className="w-[100%] flex flex-wrap gap-3">
        <label htmlFor="" className="w-full text-white text-[1.2rem] md:text-[1.5rem]">
          {label}
        </label>
        <div dir='ltr' className="w-full gap-5 px-2 flex justify-between items-center">
          {valueArray.map((value, index) => (
            <input
              key={index}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              value={value}
              type="text"
              className=" py-1 w-[50px] h-[50px] rounded-xl text-center shadow-inner-custom-2 bg-[#d9d9d9] text-[1.2rem] px-4 focus:border-transparent focus:outline-none"
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
      </div>
    );
}

export default code