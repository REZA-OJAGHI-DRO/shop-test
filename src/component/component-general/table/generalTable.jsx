import CustomImage from "@/components/ui/custom-image";
import React, { useEffect, useState } from "react";

function GeneralTable({
  data,
  items,
  headers,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  totalItems,
  filteredItems,
  filter,
  setFilter,
  disabled,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (data !== null) {
      setLoading(false);
    }
  }, [data]);

  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  const currentItems = filteredItems;

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {items ? (
        <div className="w-full shadow-custom-6 rounded-3xl overflow-hidden">
          <div className="w-full overflow-x-auto myElement2">
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
              {loading ? (
                <div className="w-full flex justify-center items-center h-40 bg-[rgba(244,244,244,1)]">
                  <p className="text-lg font-semibold">در حال بارگذاری...</p>
                </div>
              ) : currentItems.length === 0 ? (
                <div className="w-full flex justify-center items-center h-40 bg-[rgba(244,244,244,1)]">
                  <p className="text-[16px]">
                    هیچ داده‌ای وجود ندارد
                  </p>
                </div>
              ) : (
                currentItems.map((item, idx) => (
                  <div
                    key={item.id + idx}
                    className={` ${disabled == true ? item.isActive == false ? "disabled-row" : "" : ''} ${
                      idx % 2 === 0 ? "bg-white" : "bg-[rgba(244,244,244,1)]"
                    } w-full h-auto min-h-[40px] flex py-2 items-center justify-center`}
                  >
                    {headers.map((header) => (
                      <div
                        key={header.key}
                        className={`${header.style} border-zinc-400 flex justify-center items-center flex-wrap`}
                      >
                        {header.key === "image" ? (
                          <div className="w-full flex justify-center items-center">
                            {item.image ? (
                              <figure className="w-[30px] h-[30px] object-cover rounded-md">
                                <CustomImage
                                  src={item.image || "/assets/icons/image.svg"}
                                  alt={"image"}
                                  className="w-[30px] h-[30px] object-cover rounded-md"
                                />
                              </figure>
                            ) : (
                              <span>تصویر موجود نیست</span>
                            )}
                          </div>
                        ) : (
                          <div className="w-full flex justify-center items-center px-2">
                            {header.key === "id"
                              ? (currentPage - 1) * rowsPerPage + idx + 1
                              : item[header.key]}
                          </div>
                        )}

                        {!header.subHeader && header.buttons ? (
                          <div className="flex gap-1 text-[11px]">
                            {header.buttons.map((button, btnIdx) => (
                              <button
                                type="button"
                                key={btnIdx}
                                onClick={() => button.onClick(item)}
                                className={`${disabled == true ? item.isActive == false ? "hidden" : "" : ''} ${button.style}`}
                              >
                                {button.text}
                              </button>
                            ))}
                          </div>
                        ) : null}

                        {header.subHeader && (
                          <div className="w-full flex justify-around">
                            {header.subHeader.map((sub) => (
                              <div
                                key={sub.key}
                                className={`${sub.style} border-zinc-400 flex justify-center items-center `}
                              >
                                {item[sub.key]}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))
              )}
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
      ) : (
        ""
      )}
    </>
  );
}

export default GeneralTable;
