import React, { useState } from 'react';

function InputSearch3({ rows, placeholder, setFilteredRows , width , styleInput}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredRows(rows);
    } else {
      const filteredData = rows.filter(row =>
        row.value.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredRows(filteredData);
    }
  };

  return (
    <div className={`${width} bg-white rounded-2xl flex justify-center items-center p-0`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className={`w-[70%] ${styleInput} h-[30px] px-2 rounded-lg bg-transparent focus:border-transparent focus:outline-none`}
      />
      <i className="bi bi-search"></i>
    </div>
  );
}

export default InputSearch3;
