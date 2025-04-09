import { isAction } from "@reduxjs/toolkit";
import img1 from "/img/head-1.webp";
import {
  React,
  useEffect,
  useCallback,
  useState,
  WithSupport2,
  useSelector,
  Modal,
  Modal2,
  Load,
  CheckMessage,
  GeneralTable,
  postShopperGetList,
} from "@/component/management-panel/import-management.js";
import FormIssuanceOfCertificate from "./form-issuance-of-certificate";
import ViewIssuanceOfCertificate from "./view-issuance-of-certificate";

function CertificateAuthenticity() {
  const chabk = useSelector((state) => state.product.chabk);
  const token = useSelector((state) => state.product.token);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [load, setLoad] = useState(false);
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });
  const [selectedId, setSelectedId] = useState(null);
  const [dataTable, setDataTable] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [messageData, setMessageData] = useState([]);
  const [checkData, setCheckData] = useState(false);
  const [checkDataAll, setCheckDataAll] = useState({
    check1: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(!Object.values(checkDataAll).every((value) => value === true));
  }, [checkDataAll]);
  const [filters, setFilters] = useState({
    name: "",
  });
  const ShopperGetList = useCallback(() => {
    setIsLoading(true);
    const dataAll = {
      ...filters,
      pageSize: rowsPerPage,
      pageIndex: currentPage,
      orderType: 1,
      orderPropertyName: "",
    };
    postShopperGetList(
      dataAll,
      token,
      chabk,
      setDataTable,
      setTotalItems,
      setCheckDataAll,
      setCheckData,
      setMessageData
    );
  }, [filters, token, chabk, currentPage, rowsPerPage]);

  useEffect(() => {
    ShopperGetList();
  }, [ShopperGetList]);

  const items = (
    dataTable && dataTable && Array.isArray(dataTable) ? dataTable : []
  ).map((item) => ({
    id: item.id,
    name: item.name,
    mobile: item.mobile,
    naionalCode: item.naionalCode,
    status: item.isActive == true ? "فعال" : "غیر فعال",
    isActive: item.isActive,
  }));

  const headers = [
    {
      key: "id",
      title: "ردیف",
      style: "w-[5%] border-l h-[40px] text-center font-medium",
    },
    {
      key: "name",
      title: "نام خریدار",
      style: "w-[20%] border-l h-[40px] text-center font-medium",
    },
    {
      key: "mobile",
      title: "موبایل",
      style: "w-[20%] border-l h-[40px] text-center font-medium",
    },
    {
      key: "naionalCode",
      title: "کد ملی",
      style: "w-[20%] border-l h-[40px] text-center font-medium",
    },
    {
      key: "status",
      title: "وضعیت",
      style: "w-[20%] border-l h-[40px] text-center font-medium",
    },

    {
      key: "actions",
      title: "عملیات",
      style: "w-[20%] border-l h-[35px] text-center font-medium ",
      buttons: [
        {
          text: "صدور گواهی",
          style: `bg-[#B27BFF] text-white px-2 py-1 rounded hover:scale-95 transition-all duration-300`,
          onClick: (item) => {
            setOpenModal(true);
            setSelectedId(item.id);
          },
        },
        {
          text: "مشاهده گواهی",
          style: `bg-green-500 text-white px-2 py-1 rounded hover:scale-95 transition-all duration-300`,
          onClick: (item) => {
            setOpenModal2(true);
            setSelectedId(item.id);
          },
        },
      ],
    },
  ];
  const [filter, setFilter] = useState("");
  const filteredItems = items.filter((item) => item.name.includes(filter));

  const closeModal = () => {
    setOpenModal(false);
    setOpenModal2(false);
  };
  return (
    <>
      <CheckMessage message={message} check={check} />
      <div className="w-full min-h-[100vh] flex justify-center">
        <div className="w-full  flex 2xl:container justify-center  flex-wrap content-between">
          <section className="w-[81%]  pt-10">
            <div className="w-full h-[140px] rounded-2xl shadow-custom-6">
              <img src={img1} alt="" className="w-full h-full rounded-2xl" />
            </div>
            <div className="w-full py-5">
              <div dir="ltr" className="w-full">
                <div dir="rtl" className="w-full h-full">
                  <section className="w-full h-full flex flex-wrap px-4 pb-2 gap-4">
                    <h3 className="w-full flex justify-center text-[1.3rem] ">
                      گواهی اعتبار خریدار
                    </h3>

                    <article className="w-full px-4 py-2 flex gap-4 rounded-2xl shadow-custom-6 justify-center flex-wrap boxFilter ">
                      <GeneralTable
                        data={dataTable}
                        items={items}
                        headers={headers}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                        totalItems={totalItems}
                        filteredItems={filteredItems}
                        filter={filter}
                        setFilter={setFilter}
                        disabled={true}
                      />
                    </article>
                  </section>
                </div>
              </div>
            </div>
          </section>
          <div className="w-full h-[50px] flex justify-center items-center">
            <WithSupport2 />
          </div>
        </div>
      </div>
      <Load load={load} text={"در حال ثبت لطفا منتظر بمانید ..."} />
      {openModal && (
        <Modal2 onClose={closeModal} title="صدور گواهی اعتبار">
          <div className="w-full flex flex-wrap justify-center gap-5">
            <FormIssuanceOfCertificate
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              setOpenModal={setOpenModal}
              setLoad={setLoad}
              setCheckData={setCheckData}
              setMessageData={setMessageData}
              setCheckDataAll={setCheckDataAll}
              setCheck={setCheck}
              setMessage={setMessage}
            />
          </div>
        </Modal2>
      )}
      {openModal2 && (
        <Modal onClose={closeModal} title="مشاهده گواهی اعتبار">
          <div className="w-full flex flex-wrap justify-center gap-5">
            <ViewIssuanceOfCertificate selectedId={selectedId} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default CertificateAuthenticity;
