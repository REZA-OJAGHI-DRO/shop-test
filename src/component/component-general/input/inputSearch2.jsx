import React, { useState } from 'react';

function InputSearch2({ rows, setFilteredRows , width , styleInput}) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
      setSearchTerm(term);
      if (term.trim() === '') {
        setFilteredRows(rows);
      } else {
        const filteredData = rows.filter(row =>
          row.idCode.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredRows(filteredData);
      }
    };
  return (
    <div className={`${width} bg-white rounded-2xl flex justify-center items-center p-0`}>
    <input
      type="text"
      placeholder="شناسه کد کالا تامین کننده"
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)}
      className={`w-[70%] ${styleInput} h-[30px] px-2 rounded-lg placeholder:text-[.8rem] bg-transparent focus:border-transparent focus:outline-none`}
    />
    <i className="bi bi-search"></i>
  </div>
  )
}

export default InputSearch2