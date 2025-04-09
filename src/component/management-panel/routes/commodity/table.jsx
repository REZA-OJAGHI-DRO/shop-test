import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "@/index.css";
import { Pagination } from "swiper/modules";
import FormUpdate from "./form/form-update";
import {
  React,
  useCallback,
  useEffect,
  useState,
  Button,
  Modal,
  Load,
  CheckMessage,
  Loading,
  useSelector,
  fetchGoodGet,
  postGoodList,
  postGoodDelete,
} from "@/component/management-panel/import-management.js";
import { ArrowDown } from "lucide-react";
import { downloadExcel } from "@/lib/utils";

function Table({
  type,
  token,
  updateTable,
  setUpdateTable,
  setLoad5,
  dataEdit,
  setDataEdit,
  setDataEditCheck,
  dataEditCheck,
}) {
  const [dataTable, setDataTable] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tempFilter, setTempFilter] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [checkData, setCheckData] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState();
  const [loadEdit, setLoadEdit] = useState(false);
  const [load3, setLoad3] = useState(false);

  const [check, setCheck] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });
  const [messageData2, setMessageData2] = useState([]);
  const [checkData2, setCheckData2] = useState(false);
  const [checkDataAll2, setCheckDataAll2] = useState({
    check1: false,
  });
  const [isLoading2, setIsLoading2] = useState(true);
  useEffect(() => {
    setIsLoading2(
      !Object.values(checkDataAll2).every((value) => value === true)
    );
  }, [checkDataAll2]);

  const [filters, setFilters] = useState({
    name: "",
    mainCategoryId: null,
    subCategoryId: null,
    supplierCode: "",
  });

  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const columnWidths = ["5%", "25%", "15%", "10%", "15%", "15%", "15%"];
  const chabk = useSelector((state) => state.product.chabk);

  const GoodList = useCallback(() => {
    setIsLoading2(true);
    const dataAll = {
      filter: {
        name: filters.name || "",
        mainCategoryId: filters.mainCategoryId || null,
        subCategoryId: filters.subCategoryId || null,
        supplierCode: filters.supplierCode || "",
      },
      pageSize: rowsPerPage,
      pageIndex: currentPage,
      orderType: 1,
      orderPropertyName: "",
    };

    postGoodList({
      dataAll,
      token,
      chabk,
      setDataTable,
      setTotalItems,
      setCheckDataAll2,
      setCheckData2,
      setMessageData2,
    });
  }, [filters, token, chabk, currentPage, rowsPerPage, updateTable]);

  useEffect(() => {
    GoodList();
  }, [GoodList]);

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
    GoodList();
  };

  const [dataImages2, setDataImages2] = useState([]);
  const [image2, setImage2] = useState([]);
  const [imagesEdited, setImagesEdited] = useState();
  const [load, setLoad] = useState(false);
  const [showDeleteModalImg, setShowDeleteModalImg] = useState(false);
  const [dataDeleteImg, setDataDeleteImg] = useState("");
  const closeModalImg = () => {
    setShowDeleteModalImg(false);
  };
  const deleteDataImg = (e) => {
    e.preventDefault();
    const indexToDelete = parseInt(dataDeleteImg, 10);
    const updatedImages = image2.filter((_, index) => index !== indexToDelete);
    const updatedDataImages = dataImages2.filter(
      (_, index) => index !== indexToDelete
    );
    setDataImages2(updatedDataImages);
    setImage2(updatedImages);
    setDataDeleteImg("");
    setShowDeleteModalImg(false);
  };

  const openEditModal = async (rowData) => {
    setDataEditCheck(!dataEditCheck);
    setStatus(2);
    setLoadEdit(true);
    fetchGoodGet(
      rowData,
      token,
      chabk,
      setCheck,
      setMessage,
      setCheckData,
      setDataEdit,
      setCheckDataAll,
      setLoadEdit
    );
    if (type == 1) {
      setShowEditModal(true);
    }
  };
  const [dataDelete, setDataDelete] = useState("");

  const deleteData = async (e) => {
    setLoad5(true);
    try {
      const result = await postGoodDelete(dataDelete, token, chabk, setMessage);
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
    setDataEdit();
    setDataEditCheck(!dataEditCheck);
  };
  const [checkDataAll, setCheckDataAll] = useState({
    check1: false,
  });
  useEffect(() => {
    setIsLoading(!Object.values(checkDataAll).every((value) => value === true));
  }, [checkDataAll]);

  const openViewModal = async (rowData) => {
    setStatus(1);
    setLoadEdit(true);
    fetchGoodGet(
      rowData,
      token,
      chabk,
      setCheck,
      setMessage,
      setCheckData,
      setDataEdit,
      setCheckDataAll,
      setLoadEdit
    );

    setShowEditModal(true);

    setDataEditCheck(!dataEditCheck);
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

  const { start, end, pages } = getPaginationRange();

  function downloadExcelFile() {
    downloadExcel(
      dataTable.map((item) => {
        return {
          "شناسه کد کالای تامین کننده": item.supplierCode,
          "قیمت اصلی": item.price,
          "موجودی (0,1)": item.inStock ? "1" : "0",
          "تعداد موجودی": "1",
          توضیحات: "",
          "نام کالا": `${item.name} (غیر قابل تغییر)`,
        };
      }),
      "products_List"
    );
  }

  return (
    <>
      <CheckMessage message={message} check={check} />
      <div className="w-[100%] overflow-hidden rounded-2xl shadow-custom-6 boxFilter4 bg-[#ffffff4f] px-2">
        <div className="flex justify-end">
          <button
            className="text-custom-green flex gap-2 items-center p-3 text-sm"
            onClick={downloadExcelFile}
          >
            <ArrowDown className="size-5" />
            دریافت کالاها به صورت فایل اکسل
          </button>
        </div>
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
            {[
              "شناسه کد کالا تامین کننده",
              "موجودی",
              "قیمت اصلی بدون تخفیف",
              "نام ویژگی",
              "عملیات",
            ].map((text, index) => (
              <div
                key={index}
                className="text-zinc-500 p-2 text-center flex items-center justify-center"
                style={{ width: columnWidths[index + 2] }}
              >
                {text}
              </div>
            ))}
          </div>

          {/* Table Rows */}
          <div className="w-full h-[410px] flex flex-col  overflow-y-scroll myElement rounded-2xl bg-[#ffffff4f] overflow-hidden">
            {loading ? (
              <div className="w-full h-full flex justify-center items-center">
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              </div>
            ) : (
              dataTable &&
              dataTable?.map((row, rowIndex) => (
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
                    {row.supplierCode}
                  </div>
                  <div
                    className="p-2 text-center"
                    style={{ width: columnWidths[3] }}
                  >
                    {row.inStock == true ? "موجود" : " نا موجود"}
                  </div>
                  <div
                    className="p-2 text-center"
                    style={{ width: columnWidths[4] }}
                  >
                    {row.price.toLocaleString()}
                  </div>
                  <div
                    className="p-2 text-center"
                    style={{ width: columnWidths[4] }}
                  >
                    {row.extendedProperty}
                  </div>
                  <div
                    className="p-2 text-center flex justify-center items-center gap-1 cursor-pointer group"
                    style={{ width: "5%" }}
                    onClick={() => openViewModal(row.goodCodeId)}
                  >
                    <i className="bi bi-eye text-orange-600" title="مشاهده"></i>
                  </div>
                  <div
                    className="p-2 text-center flex justify-center items-center gap-1 cursor-pointer group"
                    style={{ width: "5%" }}
                    onClick={() => openEditModal(row.goodCodeId)}
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
            className="w-full flex justify-center py-2"
          >
            <button
              type="button"
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
                    type="button"
                    onClick={() => handlePageChange(1)}
                    className="px-4 mx-2 bg-white rounded-lg"
                  >
                    1
                  </button>
                )}
                {start > 2 && (
                  <span className="px-4 mx-2 bg-white rounded-lg">...</span>
                )}
                {Array.from(
                  { length: end - start + 1 },
                  (_, index) => start + index
                ).map((page) => (
                  <button
                    type="button"
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 mx-2 rounded-lg ${
                      currentPage === page
                        ? "bg-blue-500 text-white "
                        : "bg-white"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                {end < totalPages - 1 && (
                  <span className="px-4 mx-2 bg-white rounded-lg">...</span>
                )}
                {end < totalPages && (
                  <button
                    type="button"
                    onClick={() => handlePageChange(totalPages)}
                    className="px-4 mx-2 bg-white rounded-lg"
                  >
                    {totalPages}
                  </button>
                )}
              </>
            )}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 bg-white rounded-lg"
            >
              بعدی
            </button>
          </div>
        </div>
      </div>
      <Load load={loadEdit} text={" لطفا منتظر بمانید ..."} />
      <Load load={load3} text={"در حال ویرایش کالا لطفا منتظر بمانید ..."} />
      {showEditModal && (
        <Modal
          style={"h-[90vh] w-[100%] xl:w-[80%]"}
          onClose={closeModal}
          title={status == 1 ? "مشاهده" : "ویرایش"}
        >
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
                  {message}
                </p>
              </div>
            )
          ) : (
            <>
              {dataEdit && (
                <FormUpdate
                  status={status}
                  data={dataEdit}
                  setLoad={setLoad}
                  setLoad3={setLoad3}
                  setData={setDataEdit}
                  setCheck={setCheck}
                  setMessage={setMessage}
                  setUpdateTable={setUpdateTable}
                  updateTable={updateTable}
                  setImage2={setImage2}
                  image2={image2}
                  setDataImages2={setDataImages2}
                  dataImages2={dataImages2}
                  setImagesEdited={setImagesEdited}
                  imagesEdited={imagesEdited}
                  setShowDeleteModalImg={setShowDeleteModalImg}
                  setDataDeleteImg={setDataDeleteImg}
                  setShowEditModal={setShowEditModal}
                  setCheckData={setCheckData}
                  setIsLoading={setIsLoading}
                  dataEditCheck={dataEditCheck}
                />
              )}
            </>
          )}
        </Modal>
      )}

      {showDeleteModalImg && (
        <Modal onClose={closeModalImg} title="">
          <div className="w-full flex flex-wrap justify-center gap-5">
            <p className="w-full text-center text-[1.5rem]">
              ایا مطمئن هستید که می خواهید این عکس را حذف کنید؟
            </p>
            <div className="w-[100%] flex justify-center">
              <Button
                value={"حذف"}
                click={() => deleteDataImg(event)}
                styleButton={13}
              />
            </div>
          </div>
        </Modal>
      )}
      <Load load={load} text={"در حال آپلود تصاویر لطفا منتظر بمانید ..."} />
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
