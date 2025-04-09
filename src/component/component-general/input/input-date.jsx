import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function InputDate({dataDate, setDataDate , disabled , placeholder}) {

    const handleDateChange = (selectedDate) => {
      const gregorianDate = selectedDate?.toDate(); 
    //   console.log("ISO Format:", gregorianDate?.toISOString());
    setDataDate(gregorianDate?.toISOString());
    };
  
    return (
      <div className="w-[210px] h-[70px] flex justify-center items-center flex-wrap relative">
        <label className="w-full">انتخاب تاریخ:</label>
        <DatePicker
          value={dataDate}
          onChange={handleDateChange}
          calendar={persian} 
          locale={persian_fa} 
          inputClass={` ${disabled ? "bg-[rgba(0,0,0,.1)]" : "bg-[#ffffff]"} rounded-md h-[40px] shadow-inner-custom-2 px-3 relative zIndex`}
          format="YYYY/MM/DD" 
          containerClass="bg-black "
          disabled={disabled} 
          placeholder={placeholder}
        />
      </div>
    );
}

export default InputDate