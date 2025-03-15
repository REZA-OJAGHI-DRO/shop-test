import img1 from "/img/head-1.webp";
import "@/App.css";
import "@/index.css";
const Table = React.lazy(() => import("./table"));
import FormRegister from "./form/form-register";
import FormRegisterList from "./form/form-register-list";
import {
  React,
  useCallback,
  useEffect,
  Suspense,
  useRef,
  useState,
  WithSupport2,
  Button,
  Modal,
  File,
  SelectInput,
  Load,
  CheckMessage,
  Loading,
  GetAllUnit,
  loadUserGetAllPosition,
  useSelector,
  GetProductClassification,
  GetAllBrand,
  PackageTypeGetAll,
  supplierNameGetAll,
  GetCookie,
  GetListProduct,
} from "@/component/management-panel/import-management.js";

function RegisterOfGoods() {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);
  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));
  const [dataEditCheck, setDataEditCheck] = useState(false);
  const [dataEdit, setDataEdit] = useState();
  const [load5, setLoad5] = useState(false);
  const [dataImages, setDataImages] = useState([]);
  const [dataFile, setDataFile] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [nameSupplier, setNameSupplier] = useState(null);
  const [updateTable, setUpdateTable] = useState(false);
  const [formCheck, setFormCheck] = useState(false);

  // ******loadMessage
  const [load2, setLoad2] = useState(false);
  const [load, setLoad] = useState(false);
  const [messageData, setMessageData] = useState([]);
  const [checkData, setCheckData] = useState(false);
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });
  const [checkDataAll, setCheckDataAll] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
    // check6: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(!Object.values(checkDataAll).every((value) => value === true));
  }, [checkDataAll]);
  
  // ************nameLogin
  const [nameLogin, setNameLogin] = useState("");
  const UserGet33 = useCallback(() => {
    if (roleCookie == "Supplier") {
      loadUserGetAllPosition(
        roleCookie,
        token,
        chabk,
        setNameSupplier,
        setNameLogin
      );
    }
  }, [roleCookie, token, chabk, setNameSupplier, setNameLogin]);
  useEffect(() => {
    UserGet33();
  }, [UserGet33, nameSupplier]);
  // *****ProductClassification
  const [options1, setOptions1] = useState([{ key: "", value: "" }]);
  const [options6, setOptions6] = useState([{ key: "", value: "" }]);
  const [options7, setOptions7] = useState([{ key: "", value: "" }]);
  const [parentCategoryId, setParentCategoryId] = useState(null);
  const [parentCategoryId2, setParentCategoryId2] = useState(null);

  const UserGet = useCallback(() => {
    // setIsLoading(true);
    GetProductClassification(
      token,
      chabk,
      1,
      null,
      setMessageData,
      setCheckData,
      (data) => {
        setOptions1(data);
        setCheckDataAll((r) => ({ ...r, check1: true }));
      }
    );
  }, []);
  const isFirstRender1 = useRef(true);

  useEffect(() => {
    if (isFirstRender1.current) {
      UserGet();
      isFirstRender1.current = false;
    }
  }, [UserGet]);

  const UserGet2 = useCallback(() => {
    // setIsLoading(true);
    GetProductClassification(
      token,
      chabk,
      2,
      parentCategoryId,
      setMessageData,
      setCheckData,
      (data) => {
        setOptions6(data);
        setCheckDataAll((r) => ({ ...r, check1: true }));
      }
    );
  }, [parentCategoryId]);

  useEffect(() => {
    UserGet2();
  }, [UserGet2]);

  const UserGet3 = useCallback(() => {
    // setIsLoading(true);
    GetProductClassification(
      token,
      chabk,
      3,
      parentCategoryId2,
      setMessageData,
      setCheckData,
      (data) => {
        setOptions7(data);
        setCheckDataAll((r) => ({ ...r, check1: true }));
      }
    );
  }, [parentCategoryId2]);

  useEffect(() => {
    UserGet3();
  }, [UserGet3]);

  // ********* fetchGetAllBrand
  const [options2, setOptions2] = useState([{ key: "", value: "" }]);

  const GetBrand = useCallback(() => {
    setIsLoading(true);
    GetAllBrand(token, chabk, setMessageData, setCheckData, (data) => {
      setOptions2(data);
      setCheckDataAll((r) => ({ ...r, check2: true }));
    });
  }, [token, chabk]);
  const isFirstRender2 = useRef(true);
  useEffect(() => {
    if (isFirstRender2.current) {
      GetBrand();
      isFirstRender2.current = false;
    }
  }, [GetBrand]);

  // ***********GetListProduct
     const [searchData, setSearchData] = useState("");
     const [options, setOptions] = useState([{ key: "", value: "" }]);
      const GoodGet = useCallback(() => {
        GetListProduct(token, chabk , setMessageData, setCheckData, setOptions  , {keyword: searchData});
      }, [token, chabk , searchData]);

      useEffect(() => {
        if(searchData.length > 3 ){
          if(options2.length !== 0){
            GoodGet();
          }
        }else{
          GoodGet();
        }
      }, [GoodGet]);

  // *************fetchUnitGetAll
  const [options3, setOptions3] = useState([{ key: "", value: "" }]);

  const GetUnit = useCallback(() => {
    setIsLoading(true);
    GetAllUnit(token, chabk, setMessageData, setCheckData, (data) => {
      setOptions3(data);
      setCheckDataAll((r) => ({ ...r, check3: true }));
    });
  }, [token, chabk]);
  const isFirstRender3 = useRef(true);
  useEffect(() => {
    if (isFirstRender3.current) {
      GetUnit();
      isFirstRender3.current = false;
    }
  }, [GetUnit]);

  // ********fetchPackageTypeGetAll
  const [options4, setOptions4] = useState([{ key: "", value: "" }]);

  const PackageTypeGet = useCallback(() => {
    setIsLoading(true);
    PackageTypeGetAll(token, chabk, setMessageData, setCheckData, (data) => {
      setOptions4(data);
      setCheckDataAll((r) => ({ ...r, check4: true }));
    });
  }, [token, chabk]);
  const isFirstRender4 = useRef(true);
  useEffect(() => {
    if (isFirstRender4.current) {
      PackageTypeGet();
      isFirstRender4.current = false;
    }
  }, [PackageTypeGet]);

  // *******
  const [options5, setOptions5] = useState([{ key: "", value: "" }]);

  const GetSupplier = useCallback(() => {
    const keyword = "";
    supplierNameGetAll(
      keyword,
      token,
      chabk,
      setMessageData,
      setCheckData,
      (data) => {
        setOptions5(data);
        setCheckDataAll((r) => ({ ...r, check5: true }));
      }
    );
  }, [token, chabk]);
  const isFirstRender5 = useRef(true);
  useEffect(() => {
    if (isFirstRender5.current) {
      GetSupplier();
      isFirstRender5.current = false;
    }
  }, [GetSupplier]);

  // *********
  const [image, setImage] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const closeModal = () => {
    setShowDeleteModal(false);
  };

  const [dataDelete, setDataDelete] = useState("");
  const deleteData = (e) => {
    e.preventDefault();
    const indexToDelete = parseInt(dataDelete, 10);
    const updatedImages = image.filter((_, index) => index !== indexToDelete);
    const updatedDataImages = dataImages.filter(
      (_, index) => index !== indexToDelete
    );
    setDataImages(updatedDataImages);
    setImage(updatedImages);
    setDataDelete("");
    setShowDeleteModal(false);
  };

  // ******
  function openForm(x) {
    if (x == 0) {
      setFormCheck(false);
    } else if (x == 1) {
      setFormCheck(true);
    }
  }

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
                        ثبت کالا
                      </h3>
                      <article className="w-full flex justify-between pb-4">
                        <div className="w-[50%] h-[70px] flex gap-3 content-center">
                          <h4 className="flex items-center text-[1.2rem]">
                            نام تامین کننده :
                          </h4>
                          <div className="w-[48%] flex-wrap flex justify-start content-center">
                            {roleCookie == "Admin" ? (
                              <SelectInput
                                options={options5}
                                data={nameSupplier}
                                setData={setNameSupplier}
                                // hasError={styleError8}
                              />
                            ) : (
                              nameLogin
                            )}
                          </div>
                        </div>
                        <div className="w-[50%] h-[70px] flex items-center justify-end">
                          <File
                            width={"w-[40%] h-[60px]"}
                            label={"بارگذاری فایل اکسل :"}
                            setDataFile={setDataFile}
                            style2={"h-[40px]"}
                            styleLabel={"text-black"}
                            type={""}
                          />
                          <div className="w-[80px] h-[70px] flex flex-wrap justify-center">
                            <h4>نمونه اکسل</h4>
                            <a
                              href="/excel/excelUpdateProduct.xlsx"
                              download="/excel/excelUpdateProduct.xlsx"
                              className="bg-custom-green shadow-custom-6 w-[50px] h-[40px] py-2 px-2 hover:scale-95 transition-all duration-300 text-white rounded-2xl text-[1.3rem] md:text-[2rem] flex justify-center items-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.2rem"
                                height="1.2rem"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fill="currentColor"
                                  d="M15.534 1.36L14.309 0H4.662c-.696 0-.965.516-.965.919v3.63H5.05V1.653c0-.154.13-.284.28-.284h6.903c.152 0 .228.027.228.152v4.82h4.913c.193 0 .268.1.268.246v11.77c0 .246-.1.283-.25.283H5.33a.287.287 0 0 1-.28-.284V17.28H3.706v1.695c-.018.6.302 1.025.956 1.025H18.06c.7 0 .939-.507.939-.969V5.187l-.35-.38zm-1.698.16l.387.434l2.596 2.853l.143.173h-2.653q-.3 0-.38-.1q-.08-.098-.093-.313zm-1.09 9.147h4.577v1.334h-4.578zm0-2.666h4.577v1.333h-4.578zm0 5.333h4.577v1.334h-4.578zM1 5.626v10.667h10.465V5.626zm5.233 6.204l-.64.978h.64V14H3.016l2.334-3.51l-2.068-3.156H5.01L6.234 9.17l1.223-1.836h1.727L7.112 10.49L9.449 14H7.656z"
                                ></path>
                              </svg>
                            </a>
                          </div>
                        </div>
                      </article>
                      <article className="w-full px-4 py-2 flex gap-4 rounded-2xl shadow-custom-6 justify-center flex-wrap boxFilter ">
                        <div className="w-[100%] md:w-[45%] xl:w-[30%] flex justify-center">
                          <Button
                            value={"انتخاب از لیست کالاهای ثبت شده"}
                            click={() => openForm(0)}
                            styleButton={formCheck == false ? 24 : 18}
                          />
                        </div>
                        <div className="w-[100%] md:w-[45%] xl:w-[30%] flex justify-center">
                          <Button
                            value={"ثبت کالای جدید"}
                            click={() => openForm(1)}
                            styleButton={formCheck == true ? 24 : 18}
                          />
                        </div>
                      </article>

                      {formCheck == true ? (
                        <>
                          <FormRegister
                            data={dataEdit}
                            setLoad={setLoad}
                            setLoad3={setLoad2}
                            setData={setDataEdit}
                            options5={options5}
                            nameSupplier={nameSupplier}
                            setNameSupplier={setNameSupplier}
                            nameLogin={nameLogin}
                            setCheck={setCheck}
                            setMessage={setMessage}
                            setUpdateTable={setUpdateTable}
                            updateTable={updateTable}
                            setCheckData={setCheckData}
                            setIsLoading={setIsLoading}
                            dataEditCheck={dataEditCheck}
                            options2={options2}
                            options4={options4}
                            options3={options3}
                            options1={options1}
                            options6={options6}
                            options7={options7}
                            parentCategoryId={parentCategoryId}
                            parentCategoryId2={parentCategoryId2}
                            setParentCategoryId={setParentCategoryId}
                            setParentCategoryId2={setParentCategoryId2}
                            setSubCategoryId={setSubCategoryId}
                            subCategoryId={subCategoryId}
                            dataImages={dataImages}
                            setDataImages={setDataImages}
                            setShowDeleteModal={setShowDeleteModal}
                            setDataDelete={setDataDelete}
                            setImage={setImage}
                            image={image}
                            supplierId={nameSupplier}
                          />
                        </>
                      ) : formCheck == false ? (
                        <>
                          <FormRegisterList
                            setLoad3={setLoad2}
                            setData={setDataEdit}
                            options={options}
                            setCheck={setCheck}
                            setMessage={setMessage}
                            setUpdateTable={setUpdateTable}
                            updateTable={updateTable}
                            setCheckData={setCheckData}
                            dataEditCheck={dataEditCheck}
                          />
                        </>
                      ) : (
                        ""
                      )}
                      <article className="w-full flex justify-center items-center pb-4">
                        <Suspense fallback={<div>Loading ...</div>}>
                          <Table
                            type={1}
                            token={token}
                            updateTable={updateTable}
                            setUpdateTable={setUpdateTable}
                            setLoad5={setLoad5}
                            dataEdit={dataEdit}
                            setDataEdit={setDataEdit}
                            setDataEditCheck={setDataEditCheck}
                            dataEditCheck={dataEditCheck}
                          />
                        </Suspense>
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
          <Load
            load={load}
            text={"در حال آپلود تصاویر لطفا منتظر بمانید ..."}
          />
          <Load load={load2} text={"در حال ثبت کالا لطفا منتظر بمانید ..."} />
          <Load load={load5} text={"در حال حذف کالا لطفا منتظر بمانید ..."} />
        </div>
      )}

      {showDeleteModal && (
        <Modal onClose={closeModal} title="">
          <div className="w-full flex flex-wrap justify-center gap-5">
            <p className="w-full text-center text-[1.5rem]">
              ایا مطمئن هستید که می خواهید این عکس را حذف کنید؟
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

export default RegisterOfGoods;
