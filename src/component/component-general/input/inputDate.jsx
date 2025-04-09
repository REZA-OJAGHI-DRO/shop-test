import React, { useState, useEffect } from "react";
import moment from "jalali-moment";

const InputDate = ({
  placeholder,
  label,
  svg,
  width,
  max,
  data,
  setData,
  styleLabel,
  styleInput,
  styleError,
  styleBox,
  disabled,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [days, setDays] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [selectedYear, setSelectedYear] = useState(currentMonth.jYear());
  const [selectedMonth, setSelectedMonth] = useState(currentMonth.jMonth() + 1);

  useEffect(() => {
    generateDays();
  }, [currentMonth]);

  const generateDays = () => {
    const startOfMonth = currentMonth.clone().startOf("jMonth");
    const endOfMonth = currentMonth.clone().endOf("jMonth");
    const daysArray = [];
    const emptyDays = [];

    for (let i = 0; i < startOfMonth.jDay(); i++) {
      emptyDays.push("");
    }

    for (let i = 1; i <= endOfMonth.jDate(); i++) {
      daysArray.push(i);
    }

    setDays([...emptyDays, ...daysArray]);
  };

  const handleDateClick = (day) => {
    if (day) {
      const selected = currentMonth.clone().jDate(day);
      setData(selected.format("jYYYY/jMM/jDD"));
      setShowCalendar(false);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, "jMonth"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, "jMonth"));
  };

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
    setCurrentMonth(currentMonth.clone().jYear(year)); 
  };

  const handleMonthChange = (event) => {
    const month = parseInt(event.target.value) - 1; 
    setSelectedMonth(month + 1); 
    setCurrentMonth(currentMonth.clone().jMonth(month)); 
  };


  const generateYears = (start, end) => {
    const years = [];
    for (let year = start; year <= end; year++) {
      years.push(year);
    }
    return years;
  };

  const yearOptions = generateYears(currentMonth.jYear() - 100, currentMonth.jYear() + 100); 

  const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  
  useEffect(()=>{
    if(disabled == true){
      setShowCalendar(false)
    }
  },[disabled])

  return (
    <div className={`${width} relative flex flex-wrap gap-1 lg:gap-3 h-[80px]`}>
      <label htmlFor="" className={`${styleLabel} w-full`}>
        {label}
      </label>
      <div
        className={`${
          styleError === true ? "border-2 border-red-500" : ""
        } w-full rounded-2xl ${styleBox} bg-[rgba(228, 228, 228, 1)] px-2 gap-3 py-1 shadow-inner-custom-2 flex justify-between items-center`}
      >
        <input
          onClick={() => setShowCalendar(!showCalendar)}
          value={data || ""}
          type="text"
          className={`${styleInput} bg-transparent w-full text-right px-2 focus:border-transparent focus:outline-none placeholder:text-center`}
          readOnly
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
      {showCalendar && (
        <div style={{zIndex:'1000'}} className="absolute top-[100%] z-50 w-72 bg-white border border-gray-300 rounded-lg shadow-lg p-2">
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={handlePrevMonth}
              className="px-2 py-1 bg-gray-200 rounded-md"
            >
              ماه قبل
            </button>
            <span>{currentMonth.format("jMMMM jYYYY")}</span>
            <button
              onClick={handleNextMonth}
              className="px-2 py-1 bg-gray-200 rounded-md"
            >
              ماه بعد
            </button>
          </div>
          <div className="flex justify-between mb-2">
            <select 
              value={selectedYear} 
              onChange={handleYearChange} 
              className="border rounded-md h-10 px-2 bg-gray-100"
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select 
              value={selectedMonth} 
              onChange={handleMonthChange} 
              className="border rounded-md h-10 px-2 bg-gray-100"
            >
              {persianMonths.map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <table className="table-auto w-full text-center">
            <thead>
              <tr>
                {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day, index) => (
                  <th key={index} className="">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from(
                { length: Math.ceil(days.length / 7) },
                (_, weekIndex) => (
                  <tr key={weekIndex}>
                    {days
                      .slice(weekIndex * 7, (weekIndex + 1) * 7)
                      .map((day, index) => (
                        <td
                          key={index}
                          onClick={() => handleDateClick(day)}
                          className={`p-1 text-center cursor-pointer hover:bg-blue-100 ${
                            day === currentMonth.jDate() ? "bg-blue-200" : ""
                          }`}
                        >
                          {day || ""}
                        </td>
                      ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InputDate;
