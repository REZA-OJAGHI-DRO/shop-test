import "@/App.css";
import FormBrandEdit from "./form-edit-brand";
import {
  React,
  useCallback,
  useEffect,
  useState,
  Button,
  Modal,
  CheckMessage,
  Loading,
  Load,
  useSelector,
  postPackageTypeUpdateBrand,
  postBrandGetList,
  postSupplierToggleBrand,
  postBrandDelete,
  postBrandGetEdit,
} from '@/component/management-panel/import-management.js'

function Table({
  updateTable,
  setUpdateTable,
  setLoad5,
  token,
}) {
    const [load, setLoad] = useState(false);
    const [load2, setLoad2] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tempFilter, setTempFilter] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [selectedRowData, setSelectedRowData] = useState(null);

  const [editFormData, setEditFormData] = useState();
  const [edit, setEdit] = useState();


  const [message, setMessage] = useState("");
  const [check, setCheck] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });
  const [messageData, setMessageData] = useState([]);
  const [checkData, setCheckData] = useState(false);
  const [checkDataAll, setCheckDataAll] = useState({
    check1: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(!Object.values(checkDataAll).every((value) => value === true));
  }, [checkDataAll]);
  const [messageData2, setMessageData2] = useState([]);
  const [messageData3, setMessageData3] = useState([]);
  const [checkData2, setCheckData2] = useState(false);
  const [checkDataAll2, setCheckDataAll2] = useState({
    check1: false,
  });
  const [isLoading2, setIsLoading2] = useState(true);
  useEffect(() => {
    setIsLoading2(!Object.values(checkDataAll2).every((value) => value === true));
  }, [checkDataAll2]);



  const [filters, setFilters] = useState({
    activeStatus: 0,
    name: "",
    enName: "",
  });
  const chabk = useSelector((state) => state.product.chabk);

  useEffect(() => {
    if (selectedRowData) {
      setEditFormData(selectedRowData);
    }
  }, [selectedRowData]);

  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const columnWidths = ["5%", "20%", "20%", "10%", "15%", "15%", "15%"];

  const BrandGetList = useCallback(() => {
    setIsLoading(true);
    const dataAll = {
      ...filters,
      pageSize: rowsPerPage,
      pageIndex: currentPage,
      orderType: 1,
      orderPropertyName: "name",
    };
    postBrandGetList(
      dataAll,
      token,
      chabk,
      setDataTable,
      setTotalItems,
      setCheckDataAll,
      setCheckData,
      setMessageData3
    );
  }, [filters,token, chabk, currentPage, rowsPerPage, updateTable]);

  useEffect(() => {
    BrandGetList();
  }, [BrandGetList]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
    setIsLoading(true);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setFilters({ ...filters, name: tempFilter });
    setCurrentPage(1);
  };

  const toggleConfirmation = async (row) => {
    setIsLoading(true);
    try {
      const result = await postSupplierToggleBrand(
        row.id,
        token,
        chabk,
        setCheckDataAll,
        setCheckData,
        setMessage
      );
      if (result.isSuccess == true) {
        setMessage(result.error ? result.error : result.message);
        setUpdateTable(!updateTable);
        setCheck((r) => ({ ...r, check1: true }));
        setTimeout(() => {
          setCheck((r) => ({ ...r, check1: false }));
          setMessage("");
        }, 5000);
      } else if (result.isSuccess == false) {
        setMessage(result.error ? result.error : result.message);
        setUpdateTable(!updateTable);
        setCheck((r) => ({ ...r, check4: true }));
        setTimeout(() => {
          setCheck((r) => ({ ...r, check4: false }));
          setMessage("");
        }, 5000);
      }
    } catch (error) {
      setCheck((r) => ({ ...r, check4: true }));
      setTimeout(() => {
        setMessage("");
        setCheck((r) => ({ ...r, check4: false }));
      }, 5000);
    }
  };

  const openEditModal = async (rowData) => {
    setIsLoading2(true);
    try {
      const result = await postBrandGetEdit(
          rowData.id,
          token,
          chabk,
          setCheckDataAll2,
          setCheckData2,
          setMessageData2
        );
      setSelectedRowData(result.data);
      setShowEditModal(true);
      setEdit(result.data);
    } catch (error) {
      //   setCheck((r) => ({ ...r, check4: true }));
    }
  };

  const [dataDelete, setDataDelete] = useState("");

  const deleteData = async (e) => {
    setLoad5(true);
    try {
      const result = await postBrandDelete(dataDelete, token, chabk , setMessage);
      if (result.isSuccess == true) {
        setMessage(result.error ? result.error : result.message);
        setTimeout(() => {
          setCheck((r) => ({ ...r, check1: true }));
          setLoad5(false);
          setShowDeleteModal(false);
          setDataDelete("");
          setUpdateTable(!updateTable);
          setTimeout(() => {
            setCheck((r) => ({ ...r, check1: false }));
            setMessage("");
          }, 5000);
        }, 2000);
      } else if (result.isSuccess == false) {
        setMessage(result.error ? result.error : result.message);
        setTimeout(() => {
          setCheck((r) => ({ ...r, check4: true }));
          setLoad5(false);
          setShowDeleteModal(false);
          setDataDelete("");
          setUpdateTable(!updateTable);
          setTimeout(() => {
            setCheck((r) => ({ ...r, check4: false }));
            setMessage("");
          }, 5000);
        }, 2000);
      }
    } catch (error) {
      setTimeout(() => {
        setLoad5(false);
        setShowDeleteModal(false);
        setDataDelete("");
        setUpdateTable(!updateTable);
        setCheck((r) => ({ ...r, check4: true }));
        setTimeout(() => {
          setCheck((r) => ({ ...r, check4: false }));
          setMessage("");
        }, 5000);
      }, 2000);
    }
  };

  const openDelete = (rowData) => {
    setDataDelete(rowData);
    setShowDeleteModal(true);
  };

  const closeModal = () => {
    setDataDelete("");
    setShowDeleteModal(false);
    setShowEditModal(false);
    setShowViewModal(false);
    setCheck((r) => ({ ...r, check2: false }));
    setCheck((r) => ({ ...r, check4: false }));
  };


  const openViewModal = (rowData) => {
    // setSelectedRowData(rowData);setMessage
    // setShowViewModal(true);
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
      <CheckMessage message={message} check={check} />

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
              className="flex items-center gap-2 "
              style={{ width: columnWidths[1] }}
            >
              <input
                type="text"
                placeholder="نام برند را وارد کنید ..."
                value={tempFilter}
                onChange={(e) => setTempFilter(e.target.value)}
                className="p-2 bg-white w-[70%] h-[30px] rounded-2xl text-[.9rem]"
              />
              <button
                onClick={handleSearch}
                className="bg-custom-green rounded-full w-[2rem] h-[2rem] flex justify-center items-center text-black px-2 pt-1"
              >
                <i className="bi bi-search"></i>
              </button>
            </div>

            {/* Headers */}
            {[
              "نام برند به لاتین",
              "آرم برند",
              "مالک برند",
              "وضعیت",
              "عملیات",
            ].map((text, index) => (
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
          <div className="w-full flex h-[487px] overflow-y-scroll myElement flex-col rounded-2xl bg-[#ffffff4f] overflow-hidden">
            {isLoading == true ? (
              checkData == false ? (
                <div className="w-full h-full flex content-center justify-center flex-wrap gap-5">
                  <Loading />
                  <p className="w-full flex justify-center items-center text-[1.2rem]">
                    لطفاً منتظر بمانید، داده‌ها در حال بارگذاری هستند ...
                  </p>
                </div>
              ) : (
                <div className="w-full min-h-[100vh] flex content-center justify-center flex-wrap gap-5">
                  <p className="w-full flex justify-center items-center text-[1.5rem]">
                    خطاهای پردازش
                  </p>
                        <p     
                          className="w-full flex justify-center items-center text-[1.2rem]"
                        >
                          {messageData3}
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
                    {row.name}
                  </div>
                  <div
                    className="p-2 text-center"
                    style={{ width: columnWidths[2] }}
                  >
                    {row.enName}
                  </div>
                  <div
                    className="p-2 text-center flex justify-center"
                    style={{ width: columnWidths[3] }}
                  >
                    <img
                      src={row.logoLink}
                      alt=""
                      className="w-[30px] h-[30px] rounded-lg"
                    />
                  </div>

                  <div
                    className="p-2 text-center"
                    style={{ width: columnWidths[4] }}
                  >
                    {row.ownerName}
                  </div>
                  <div
                    className={`p-2 text-center flex justify-center items-center gap-1 cursor-pointer group ${
                      row.enabled == true ? "text-green-700" : "text-red-500"
                    }`}
                    style={{ width: columnWidths[5] }}
                    onClick={() => toggleConfirmation(row)}
                  >
                    {row.enabled ? "فعال" : "غیرفعال"}
                  </div>
                  <div
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
            className="w-full flex justify-center py-2 "
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

                <Load load={load} text={"در حال آپلود فایل ..."} />
                <Load load={load2} text={"در حال آپلود فایل ..."} />

      {/* Edit Modal */}
      {showEditModal && (
        <Modal style={"h-[70vh] w-[70%]"} onClose={closeModal} title="ویرایش">
             {isLoading2 == true ? (
              checkData2 == false ? (
                <div className="w-full h-full flex content-center justify-center flex-wrap gap-5">
                  <Loading />
                  <p className="w-full flex justify-center items-center text-[1.2rem]">
                    لطفاً منتظر بمانید، داده‌ها در حال بارگذاری هستند ...
                  </p>
                </div>
              ) : (
                <div className="w-full min-h-[100vh] flex content-center justify-center flex-wrap gap-5">
                  <p className="w-full flex justify-center items-center text-[1.5rem]">
                    خطاهای پردازش
                  </p>
                  {messageData &&
                    messageData.map((val, i) => {
                      return (
                        <p
                          key={i}
                          className="w-full flex justify-center items-center text-[1.2rem]"
                        >
                          {i + 1} - {val}
                        </p>
                      );
                    })}
                </div>
              )
            ) : (<>
          {editFormData && (
            <div className="w-full flex flex-wrap justify-between gap-3 px-10">
              <FormBrandEdit
              data={edit}
              setLoad={setLoad}
              setLoad2={setLoad2}
              closeModal={closeModal}
              setIsLoading={setIsLoading}
              setCheckData={setCheckData}
              setMessageData={setMessageData}
              setCheckDataAll={setCheckDataAll}
              setUpdateTable={setUpdateTable}
              updateTable={updateTable}
              setCheck={setCheck}
              setMessage={setMessage}
              />
            </div>
          )}</>
        )}
        </Modal>
      )}

      {/* View Modal */}
      {showViewModal && selectedRowData && (
        <Modal onClose={closeModal} title="مشاهده جزئیات">
          {/* <div className="flex flex-wrap gap-5 px-5">
            <p className="flex gap-3 w-[45%]">
              <strong>نام برند :</strong>{" "}
              {selectedRowData?.name ? selectedRowData?.name : "ندارد"}
            </p>
            <p className="flex gap-3 w-[45%]">
              <strong>نام برند به لاتین :</strong>{" "}
              {selectedRowData?.enName ? selectedRowData?.enName : "ندارد"}
            </p>
            <p className="flex gap-3 w-[45%]">
              <strong>آرم برند :</strong>
              <img
                src={selectedRowData?.logoLink}
                alt=""
                className="w-[30px] h-[30px] rounded-lg"
              />
            </p>
            <p className="flex gap-3 w-[45%]">
              <strong>مالک برند :</strong>{" "}
              {selectedRowData?.ownerName
                ? selectedRowData?.ownerName
                : "ندارد"}
            </p>
          </div> */}
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
    </>
  );
}

export default Table;
