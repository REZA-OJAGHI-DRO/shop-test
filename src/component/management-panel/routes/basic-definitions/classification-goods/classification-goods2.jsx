import img1 from "/img/head-1.webp";
import TableGoods from "./table-goods";
import FormEdit1 from "./form/form-edit-1";
import {
  React,
  useCallback,
  useEffect,
  useRef,
  useState,
  WithSupport2,
  Button,
  TextFull,
  SelectInput,
  TextNumber,
  Load,
  CheckMessage,
  Loading,
  useSelector,
  categoryGetAll,
  categoryCreate,
  CategoryGetList,
  Modal,

} from "@/component/management-panel/import-management.js";

function ClassificationOfGoods2() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  // const [level, setLevel] = useState(0);
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [options, setOptions] = useState([{ key: "", value: "" }]);
  const [styleError1, setStyleError1] = useState(false);
  const [load, setLoad] = useState(false);
  const [message, setMessage] = useState("");
  const [updateTable, setUpdateTable] = useState(false);

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
  const chabk = useSelector((state) => state.product.chabk);
  const token = useSelector((state) => state.product.token);

  const GetCategory = useCallback(() => {
    setIsLoading(true);
    categoryGetAll(
      1,
      "",
      token,
      chabk,
      setCheckDataAll,
      setCheckData,
      setMessageData,
      setOptions
    );
  }, [token, chabk]);
  const isFirstRender2 = useRef(true);
  useEffect(() => {
    if (isFirstRender2.current) {
      GetCategory();
      isFirstRender2.current = false;
    }
  }, [GetCategory]);

  const sendForm = async () => {
    if (!name) {
      setStyleError1(true);
    } else {
      setLoad(true);
      try {
        const result = await categoryCreate(
          name,
          code,
          2,
          parentCategoryId,
          token,
          chabk,
          setMessage
        );
        if (result.isSuccess == true) {
          setTimeout(() => {
            setCheck((r) => ({ ...r, check1: true }));
            setName("");
            setCode("");
            setLoad(false);
            setUpdateTable(!updateTable);
            setMessage(result.error ? result.error : result.message);
            setTimeout(() => {
              setCheck((r) => ({ ...r, check1: false }));
              setMessage("");
            }, 5000);
          }, 2000);
        } else if (result.isSuccess == false) {
          setTimeout(() => {
            setCheck((r) => ({ ...r, check4: true }));
            setName("");
            setCode("");
            setLoad(false);
            setUpdateTable(!updateTable);
            setMessage(result.error ? result.error : result.message);
            setTimeout(() => {
              setCheck((r) => ({ ...r, check4: false }));
              setMessage("");
            }, 5000);
          }, 2000);
        }
      } catch (error) {
        setTimeout(() => {
          setCheck((r) => ({ ...r, check4: true }));
          setLoad(false);
          setTimeout(() => {
            setCheck((r) => ({ ...r, check4: false }));
            setMessage("");
          }, 5000);
        }, 2000);
      }
    }
  };

  function findValueByKey(array, keyToFind) {
    for (const item of array) {
      if (item.key === keyToFind) {
        return item.value;
      }
    }
    return null;
  }
  const [dataTable, setDataTable] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState();
  const [nameTable, setNameTable] = useState();
  console.log(findValueByKey(options, parentCategoryId));

  const [filters, setFilters] = useState({
    name: "",
    code: "",
    level: 2,
  });

  const PackageTypeGetList = useCallback(() => {
    // setIsLoading(true);
    const dataAll = {
      ...filters,
      pageSize: rowsPerPage,
      pageIndex: currentPage,
      orderType: 1,
      orderPropertyName: "",
    };
    CategoryGetList(
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
    PackageTypeGetList();
  }, [PackageTypeGetList]);
  const [data, setData] = useState({});
  const [load2, setLoad2] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  function openEdit(item) {
    setData({
      id: item.id,
      name: item.name,
      code: item.code,
      level: 2,
    });
    setShowEditModal(true);
  }

  const closeModal = () => {
    setShowEditModal(false);
  };
  return (
    <>
      <style>
        {`
      .boxFilter{
      background:#ffffff4f;
      backdrop-filter:blur(10px);
      }
      .boxFilter4{
    //   background:#ffffff4f;
      backdrop-filter:blur(10px);
      }
      `}
      </style>
      <CheckMessage message={message} check={check} />
      {isLoading == true ? (
        checkData == false ? (
          <div className="w-full min-h-[100vh] flex content-center justify-center flex-wrap gap-5">
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
      ) : (
        <div className="w-full min-h-[100vh] flex justify-center">
          <div className="w-full min-h-[100vh] flex 2xl:container justify-center flex-wrap content-between">
            <section className="w-[81%]  pt-10">
              <div className="w-full h-[140px] rounded-2xl shadow-custom-6">
                <img src={img1} alt="" className="w-full h-full rounded-2xl" />
              </div>
              <div className="w-full py-5">
                <div dir="ltr" className="w-full">
                  <div dir="rtl" className="w-full h-full">
                    <section className="w-full h-full flex flex-wrap px-4 pb-2 gap-4">
                      <h3 className="w-full flex justify-center text-[1.3rem] ">
                        دسته بندی سطح دو
                      </h3>
                      <article className="w-[100%] rounded-2xl shadow-custom-7 boxFilter px-5 flex gap-y-10 py-5 flex-wrap justify-around items-center">
                        <div className="w-[100%] flex gap-5 justify-around">
                          <div className="w-[30%] flex-wrap flex justify-center content-center gap-2">
                            <p className="w-full">
                              <span className="text-red-500">*</span>
                              دسته بندی سطح یک :
                            </p>
                            <SelectInput
                              options={options}
                              setData={setParentCategoryId}
                              hasError={false}
                            />
                          </div>
                          <TextFull
                            pattern={
                              /^[a-zA-Z\u0600-\u06FF\s0-9\u0660-\u0669]+$/
                            }
                            placeholder={"لطفا نوع دسته بندی را وارد کنید..."}
                            label={"* نوع دسته بندی :"}
                            svg={false}
                            width={"w-[30%] h-[60px]"}
                            data={name}
                            setData={setName}
                            styleLabel={"text-[1rem] xl:text-[1rem] "}
                            styleInput={
                              "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"
                            }
                            styleError={styleError1}
                            styleBox={"bg-[#ffffff]"}
                          />
                          <TextNumber
                            placeholder={""}
                            label={"کد :"}
                            svg={false}
                            width={"w-[30%] h-[60px]"}
                            max={""}
                            data={code}
                            setData={setCode}
                            styleLabel={"text-[1rem] lg:text-[1rem] text-black"}
                            styleInput={
                              "text-[1rem] lg:text-[1.2rem] h-[40px] lg:h-[35px]"
                            }
                            styleBox={"bg-[#ffffff]"}
                          />
                        </div>
                        <div className="w-[20%] flex">
                          <Button
                            value={"ثبت"}
                            click={() => sendForm(event)}
                            styleButton={10}
                          />
                        </div>
                      </article>
                      <TableGoods
                        status={2}
                        data={dataTable}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                        totalItems={totalItems}
                        openEdit={openEdit}
                      />
                    </section>
                  </div>
                </div>
              </div>
            </section>
            <div className="w-full h-[50px] flex justify-center items-center">
              <WithSupport2 />
            </div>
          </div>
          <Load
            load={load}
            text={"در حال ثبت نوع بسته بندی لطفا منتظر بمانید ..."}
          />
        </div>
      )}

      <Load load={load2} text={"در حال ویرایش لطفا منتظر بمانید ..."} />

      {showEditModal && (
        <Modal style={""} onClose={closeModal} title={"ویرایش"}>
          <>
            <FormEdit1
              data={data}
              setLoad={setLoad2}
              setIsLoading={setIsLoading}
              setMessage={setMessage}
              setCheck={setCheck}
              setShowEditModal={setShowEditModal}
              setUpdateTable={setUpdateTable}
              updateTable={updateTable}
              setCheckData={setCheckData}
            />
          </>
        </Modal>
      )}
    </>
  );
}

export default ClassificationOfGoods2;
