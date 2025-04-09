import "@/App.css";
import {
  React,
  useCallback,
  useEffect,
  useState,
  Button,
  useSelector,
  Load,
  Loading,
  postMessageGetList,
} from "@/component/management-panel/import-management.js";

const Modal = ({ onClose, title, children, style }) => {
  return (
    <>
      <style>
        {`
      .boxFilter11{
    //   background:rgba(0,0,0,.3);
      backdrop-filter:blur(10px);
      }
      .boxFilter12{
    //   background:rgba(0,0,0,.3);
      backdrop-filter:blur(10px);
      }
      `}
      </style>
      <div className="fixed  inset-0 bg-opacity-50 flex items-center justify-center boxFilter11">
        <div
          className={` ${style}  py-4 bg-[#eed9f8] shadow-custom-8 border-2 border-[#d892f8] boxFilter12 rounded-2xl overflow-hidden w-1/2`}
        >
          <div className="flex justify-between items-center overflow-y-scroll myElement px-4">
            <h2 className="text-lg font-bold">{title}</h2>
            <button onClick={onClose} className="text-red-500 text-[2rem]">
              &times;
            </button>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </>
  );
};

function TableMessageList({ updateTable, setUpdateTable }) {
  const [dataTable, setDataTable] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tempFilter, setTempFilter] = useState("");
  const [dataDelete, setDataDelete] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [editFormData, setEditFormData] = useState();
  const token = useSelector((state) => state.product.token);
  const [filters, setFilters] = useState(null);
  const [load, setLoad] = useState(false);
  const chabk = useSelector((state) => state.product.chabk);

  useEffect(() => {
    if (selectedRowData) {
      setEditFormData(selectedRowData);
    }
  }, [selectedRowData]);

  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const columnWidths = ["5%", "25%", "55%", "15%"];

  const [messageData, setMessageData] = useState([]);
  const [checkData, setCheckData] = useState(false);
  const [checkDataAll, setCheckDataAll] = useState({
    check1: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(!Object.values(checkDataAll).every((value) => value === true));
  }, [checkDataAll]);

  // ******

  const MessageGetList = useCallback(() => {
    setIsLoading(true);
    const dataAll = {
      ...filters,
      pageSize: rowsPerPage,
      pageIndex: currentPage,
      orderType: 1,
      orderPropertyName: "id",
    };
    postMessageGetList(
      dataAll,
      token,
      chabk,
      setDataTable,
      setTotalItems,
      setCheckDataAll,
      setCheckData,
      setMessageData
    );
  }, [filters, token, chabk, currentPage, rowsPerPage, updateTable]);

  useEffect(() => {
    MessageGetList();
  }, [MessageGetList]);

  // ******

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
    setIsLoading(true);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
    // window.location.reload();
  };

  const handleSearch = () => {
    setFilters({ ...filters, name: tempFilter });
    setCurrentPage(1);
  };

  const openEditModal = (rowData) => {
    //   setSelectedRowData(rowData);
    //   setShowEditModal(true);
  };
  const openDelete = (rowData) => {
    //   setDataDelete(rowData)
    //   setShowDeleteModal(true)
  };

  const deleteData = async (e) => {};

  const openViewModal = (rowData) => {};

  const closeModal = () => {
    setDataDelete("");
    setShowDeleteModal(false);
    setShowEditModal(false);
    setShowViewModal(false);
  };

  const handleSaveChanges = () => {
    closeModal();
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
            <div
              className="flex items-center gap-2"
              style={{ width: columnWidths[1] }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  placeholder="نام کالا"
                  value={tempFilter}
                  onChange={(e) => setTempFilter(e.target.value)}
                  className="p-2 bg-white w-[70%] h-[30px] rounded-2xl text-[.9rem]"
                />
                <button
                  type="submit"
                  className="bg-custom-green rounded-full w-[2rem] h-[2rem] flex justify-center items-center text-black px-2 pt-1"
                >
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </div>

            {/* Headers */}
            {["پیامک", "عملیات"].map((text, index) => (
              <div
                key={index}
                className="text-zinc-800 p-2 text-center flex items-center justify-center"
                style={{ width: columnWidths[index + 2] }}
              >
                {text}
              </div>
            ))}
          </div>

          {/* Table Rows */}
          <div className="w-full flex h-[410px] overflow-y-scroll myElement flex-col rounded-2xl bg-[#ffffff4f] overflow-hidden">
            {isLoading == true ? (
              checkData == false ? (
                <div className="w-full h-full flex content-center justify-center flex-wrap gap-5">
                  <Loading />
                  <p className="w-full flex justify-center items-center text-[1.2rem]">
                    لطفاً منتظر بمانید، داده‌ها در حال بارگذاری هستند ...
                  </p>
                </div>
              ) : (
                <div className="w-full h-full flex content-center justify-center flex-wrap gap-5">
                  <p className="w-full flex justify-center items-center text-[1.5rem]">
                    خطاهای پردازش
                  </p>
                  <p className="w-full flex justify-center items-center text-[1.2rem]">
                    {messageData}
                  </p>
                </div>
              )
            ) : (
              dataTable.map((row, rowIndex) => (
                <div
                  className="w-full flex border-b border-zinc-400"
                  key={rowIndex}
                >
                  <div
                    className="p-2 text-center"
                    style={{ width: columnWidths[0] }}
                  >
                    {rowsPerPage * (currentPage - 1) + (rowIndex + 1)}
                  </div>
                  {/* نمایش مقدار نام */}
                  <div
                    className="p-2 text-center"
                    style={{ width: columnWidths[1] }}
                  >
                    {row.userName}
                  </div>

                  {/* نمایش کد ملی */}
                  <div
                    className="p-2 text-center"
                    style={{ width: columnWidths[2] }}
                  >
                    {row?.content}
                  </div>

                  {/* <div
                    className="p-2 text-center flex justify-center items-center gap-1 cursor-pointer group"
                    style={{ width: "5%" }}
                    onClick={() => openViewModal(row)}
                  >
                    <i className="bi bi-eye text-orange-600" title="مشاهده"></i>
                  </div>
                  <div
                    className="p-2 text-center flex justify-center items-center gap-1 cursor-pointer group"
                    style={{ width: "5%" }}
                    onClick={() => openEditModal(row, rowIndex)}
                  >
                    <i
                      className="bi bi-pencil-square text-green-600"
                      title="ویرایش"
                    ></i>
                  </div>
                  <div
                    className="p-2 text-center flex justify-center items-center gap-1 cursor-pointer group"
                    style={{ width: "5%" }}
                    onClick={() => openDelete(row)}
                  >
                    <i
                      className="bi bi-trash3-fill text-red-700"
                      title="حذف"
                    ></i>
                  </div> */}
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

      {/* Edit Modal */}
      {showEditModal && (
        <Modal onClose={closeModal} title="ویرایش">
          {editFormData && (
            <div className="w-full flex flex-wrap justify-between gap-3 px-10">
              {/* فیلدهای فرم ویرایش */}
              {/* <label className="block mb-2 w-[45%]">
          نام و نام خانوادگی :
          <input
            type="text"
            name="name"
            value={editFormData.name}
            onChange={handleFormChange}
            className="border p-2 rounded-xl shadow-custom-7 mt-2 w-full"
          />
        </label> */}
              <div className="w-[100%] flex justify-center mt-10">
                <Button
                  value={"ویرایش"}
                  click={() => handleSaveChanges(event)}
                  styleButton={14}
                />
              </div>
            </div>
          )}
        </Modal>
      )}

      {showDeleteModal && (
        <Modal onClose={closeModal} title="">
          <div className="w-full flex flex-wrap justify-center gap-5">
            <p className="w-full text-center text-[1.5rem]">
              ایا مطمئن هستید که می خواهید این برند را حذف کنید؟
            </p>
            <div className="w-[100%] flex justify-center">
              <Button
                value={"حذف"}
                click={() => deleteData(event)}
                styleButton={13}
              />
            </div>
          </div>
        </Modal>
      )}

      {/* View Modal */}
      {showViewModal && selectedRowData && (
        <Modal onClose={closeModal} title="مشاهده جزئیات">
          <div className="flex flex-wrap gap-5 px-5">
            <p className="flex gap-3 w-[45%]">
              <strong>نام کالا :</strong> {selectedRowData?.name}
            </p>
            <p className="flex gap-3 w-[45%]">
              <strong>کد ملی :</strong> {selectedRowData?.naionalCode}
            </p>
            <p className="flex gap-3 w-[45%]">
              <strong>شماره همراه :</strong> {selectedRowData?.mobile}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}

export default TableMessageList;
