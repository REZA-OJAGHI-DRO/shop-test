import { useState } from "react";

function checkBox({setDate , label , setCheckedOpen}) {
    const [data1, setData1] = useState(false);
        function clickOption() {
          const newData1 = !data1;
          setData1(newData1);
          setDate(newData1);
          setCheckedOpen(!newData1);
          }
    
  return (
    <>
      <div   
        onClick={() => clickOption()}
      className="w-full cursor-pointer h-[40px] xl:h-[40px]  flex justify-center bg-[#E4E4E4] px-2 rounded-2xl items-center ">
        <div
          className="w-[100%] cursor-pointer h-full text-zinc-500  rounded-2xl flex justify-center items-center"
        >
          {label}
        </div>
        <i
          className={`bi bi-check-square-fill ${
            data1 ? "text-[#83C100]" : "text-zinc-400"
          }`}
        ></i>
      </div>
    </>
  );
}

export default checkBox



