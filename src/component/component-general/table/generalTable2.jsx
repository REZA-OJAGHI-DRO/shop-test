import React, { useEffect, useState } from "react";

function GeneralTable2({items , headers , currentPage , setCurrentPage , rowsPerPage , setRowsPerPage , totalItems , filteredItems, filter, setFilter}) {

  // const [filter, setFilter] = useState(""); // New state for filter

//   const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  // Filter items based on filter text

  // const currentItems = filteredItems.slice(
  //   (currentPage - 1) * rowsPerPage,
  //   currentPage * rowsPerPage
  // );
  const currentItems = filteredItems

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(()=>{
console.log(items , filteredItems , currentItems , currentPage , rowsPerPage);

  },[items])

  return (
    <div className="w-full shadow-custom-6 rounded-3xl overflow-hidden">
      <div className="w-full overflow-x-auto myElement2">

        {/* Filter Input */}
        <div className="min-w-[1000px] flex justify-start px-4 py-2 bg-[rgba(244,244,244,1)] border-b border-zinc-400">
          <input
            type="text"
            placeholder="جستجوی نام یا کد ملی..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-2"
          />
        </div>
        <div className="min-w-[1000px] h-[70px] flex text-[.8rem] border-b border-zinc-400 bg-[rgba(244,244,244,1)]">
          {headers.map((header) => (
            <div
              key={header.key}
              className={`${header.style} h-[70px] border-zinc-400 flex justify-center items-center flex-wrap`}
            >
              <p className="w-full flex justify-center px-2 h-[35px] items-center">
                {header.title}
              </p>
              {header.subHeader && (
                <div className="w-full flex justify-around">
                  {header.subHeader.map((sub) => (
                    <div
                      key={sub.key}
                      className={`${sub.style} flex justify-center items-center`}
                    >
                      {sub.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="min-w-[1000px] max-h-[400px] h-auto flex flex-col text-[.8rem]">
          {currentItems.map((item, idx) => (
            <div
              key={item.id + idx}
              className={`${
                idx % 2 === 0 ? "bg-white" : "bg-[rgba(244,244,244,1)]"
              } w-full h-[40px] flex items-center justify-center`}
            >
              {headers.map((header) => (
                <div
                  key={header.key}
                  className={`${header.style} border-zinc-400 flex justify-center items-center flex-wrap`}
                >
                  {!header.subHeader && header.buttons ? (
                    <div className="flex space-x-1">
                      {header.buttons.map((button, btnIdx) => (
                        <button
                        type="button"
                          key={btnIdx}
                          onClick={() => button.onClick(item)}
                          className={button.style}
                        >
                          {button.text}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="w-full flex justify-center items-center px-2">
                      {header.key === "id"
                        ? (currentPage - 1) * rowsPerPage + (idx) + 1
                        : item[header.key]}
                    </div>
                  )}
                  {header.subHeader && (
                    <div className="w-full flex justify-around">
                      {header.subHeader.map((sub) => (
                        <div
                          key={sub.key}
                          className={`${sub.style} border-zinc-400 flex justify-center items-center`}
                        >
                          {item[sub.key]}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-start gap-4 px-4 mt-2">
        <span>تعداد سطرها در هر صفحه:</span>
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="border rounded-lg px-1"
        >
          {[5, 10, 20, 30, 40].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{ display: totalItems > rowsPerPage ? "flex" : "none" }}
        className="w-full flex justify-center py-2"
      >
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 bg-white rounded-lg"
        >
          قبلی
        </button>
        {totalPages > 1 && (
          <>
            {start > 1 && (
              <button
                onClick={() => handlePageChange(1)}
                className="px-4 mx-2 bg-white rounded-lg"
              >
                1
              </button>
            )}
            {start > 2 && <span className="mx-2">...</span>}
            {Array.from({ length: end - start + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(start + index)}
                className={`px-4 mx-2 bg-white rounded-lg ${
                  start + index === currentPage ? "font-bold" : ""
                }`}
              >
                {start + index}
              </button>
            ))}
            {end < totalPages - 1 && <span className="mx-2">...</span>}
            {end < totalPages && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className="px-4 mx-2 bg-white rounded-lg"
              >
                {totalPages}
              </button>
            )}
          </>
        )}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 bg-white rounded-lg"
        >
          بعدی
        </button>
      </div>
    </div>
  );
}

export default GeneralTable2;
