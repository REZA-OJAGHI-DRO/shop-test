import "@/App.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  React,
  useEffect,
  useState,
  Load,
} from "@/component/management-panel/import-management.js";

function TableInstallments({ updateTable, setUpdateTable, dataAll }) {
  const [data, setData] = useState([]);
  const [dataTable, setDataTable] = useState(dataAll || []);
  const [totalItems, setTotalItems] = useState(dataAll?.length || 0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [load, setLoad] = useState(false);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    const startIdx = (currentPage - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    setPaginatedData(dataTable.slice(startIdx, endIdx));
  }, [currentPage, rowsPerPage, dataTable]);

  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const columnWidths = ["10%", "90%"];

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const getPaginationRange = () => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    let start = Math.max(1, Math.floor((currentPage - 1) / 3) * 3 + 1);
    let end = Math.min(totalPages, start + 2);

    if (end - start < 2 && end < totalPages) {
      end = Math.min(totalPages, start + 2);
    }
    if (start > 1 && end < totalPages) {
      start = Math.max(1, end - 2);
    }

    return { start, end, pages };
  };

  const { start, end } = getPaginationRange();

  return (
    <>
      <div className="w-[100%] overflow-hidden rounded-2xl shadow-custom-6 boxFilter4 bg-[#ffffff4f] px-2">
        <div className="w-full">
          {/* Header */}
          <div className="w-full flex rounded-2xl py-1 px-2">
            {/* Search Input */}
            <div
              className="flex items-center gap-2 text-zinc-800"
              style={{ width: columnWidths[0] }}
            >
              ردیف
            </div>

            {/* Headers */}
            {["مدت چک"].map((text, index) => (
              <div
                key={index}
                className="text-zinc-800 p-2 text-center flex items-center justify-center"
                style={{ width: columnWidths[index + 1] }}
              >
                {text}
              </div>
            ))}
          </div>

          {/* Table Rows */}
          <div className="w-full flex h-[205px] overflow-y-scroll myElement flex-col rounded-2xl bg-[#ffffff4f] overflow-hidden">
            {loading ? (
              <div className="w-full h-full flex justify-center items-center">
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              </div>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <div
                  className="w-full flex border-b border-zinc-400 "
                  key={rowIndex}
                >
                  <div
                    className="p-2 text-center"
                    style={{ width: columnWidths[0] }}
                  >
                    {rowsPerPage * (currentPage - 1) + (rowIndex + 1)}
                  </div>
                  <div
                    className="p-2 text-center"
                    style={{ width: columnWidths[1] }}
                  >
                    {row}
                    <span className="px-3">روز</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Rows per Page Selector */}
          <div className="w-full flex justify-start gap-4 px-4 mt-2">
            <span>تعداد سطرها در هر صفحه:</span>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="border rounded-lg px-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
            </select>
          </div>

          {/* Pagination */}
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
                      currentPage === start + index ? "bg-slate-500" : ""
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
      </div>

      <Load load={load} text={"لطفا منتظر بمانید ..."} />
    </>
  );
}

export default TableInstallments;
