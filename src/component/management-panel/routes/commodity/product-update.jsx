import img1 from "/img/head-1.webp";
const Table = React.lazy(() => import("./table"));
import FormUpdate from "./form/form-update";
import {
  React,
  useCallback,
  useEffect,
  Suspense,
  useRef,
  useState,
  Load,
  WithSupport2,
  File,
  Modal,
  SelectInput,
  CheckMessage,
  Button,
  useSelector,
  loadUserGetAllPosition,
  supplierNameGetAll,
  GetCookie,
} from "@/component/management-panel/import-management.js";

import "@/App.css";
import "@/index.css";

function ProductUpdate() {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);
  const [load, setLoad] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [load3, setLoad3] = useState(false);

  const [updateTable, setUpdateTable] = useState(false);
  const [load5, setLoad5] = useState(false);
  const [roleCookie, setRoleCookie] = useState(GetCookie("role"));
  const [styleError8, setStyleError8] = useState(false);

  const [dataFile, setDataFile] = useState(null);

  const [dataEdit, setDataEdit] = useState();
  const [dataEditCheck, setDataEditCheck] = useState(false);

  const [dataImages2, setDataImages2] = useState([]);
  const [image2, setImage2] = useState([]);
  const [imagesEdited, setImagesEdited] = useState();

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
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(!Object.values(checkDataAll).every((value) => value === true));
  }, [checkDataAll]);
  // ************nameLogin
  const [nameLogin, setNameLogin] = useState("");
  const [nameSupplier, setNameSupplier] = useState(null);
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
  // ********
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
  // ***********

  // *********

  const handleDownload = () => {
    const fileUrl = "/excel/edit-product.xlsx";
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "edit-product.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
    setMessage("عکس با موفقیت حذف شد");
    setCheck((r) => ({ ...r, check1: true }));
    setTimeout(() => {
      setMessage("");
      setCheck((r) => ({ ...r, check1: false }));
    }, 5000);
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
      <div className="w-full min-h-[100vh] flex justify-center">
        <div className="w-full min-h-[100vh] flex 2xl:container justify-center  flex-wrap content-between">
          <section className="w-[81%] pt-10">
            <div className="w-full h-[140px] rounded-2xl shadow-custom-6">
              <img src={img1} alt="" className="w-full h-full rounded-2xl" />
            </div>
            <div className="w-full py-5">
              <div dir="ltr" className="w-full ">
                <section
                  dir="rtl"
                  className="w-full flex flex-wrap px-4 pb-2 gap-4"
                >
                  <h3 className="w-full flex justify-center text-[1.3rem] ">
                    بروز رسانی کالا
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
                            hasError={styleError8}
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
                        setLoad={setLoad2}
                        fileType={"excel"}
                        setCheck={setCheck}
                        setMessage={setMessage}
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
                    {/* <div className="w-[50%] h-[70px] flex gap-4 items-end justify-end">
                      <h4 className="h-[40px] flex items-center text-[1.2rem]">
                        انتخاب کالا :
                      </h4>
                      <InputSearch
                        rows={""}
                        placeholder={"نام کالا"}
                        setFilteredRows={""}
                        width={" w-[70%] bg-white shadow-custom-6"}
                        styleInput={"h-[40px] w-[80%]"}
                      />
                    </div> */}
                  </article>
                  <FormUpdate
                    status={2}
                    data={dataEdit}
                    setLoad={setLoad}
                    setLoad3={setLoad3}
                    setData={setDataEdit}
                    options5={options5}
                    nameSupplier={nameSupplier}
                    setNameSupplier={setNameSupplier}
                    nameLogin={nameLogin}
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
                    setCheckData={setCheckData}
                    setIsLoading={setIsLoading}
                    dataEditCheck={dataEditCheck}
                    setShowEditModal={setShowEditModal}
                    // setLoad,
                  />
                  <article className="w-full flex justify-center items-center pb-4">
                    <Suspense fallback={<div>Loading ...</div>}>
                      <Table
                        type={2}
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
          </section>
          <div className="w-full h-[50px] flex justify-center items-center">
            <WithSupport2 />
          </div>
        </div>
      </div>

      <Load load={load} text={"در حال آپلود تصاویر لطفا منتظر بمانید ..."} />
      <Load
        load={load2}
        text={"در حال آپلود فایل اکسل لطفا منتظر بمانید ..."}
      />
      <Load load={load3} text={"در حال ویرایش کالا لطفا منتظر بمانید ..."} />

      {/* modal */}

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
    </>
  );
}

export default ProductUpdate;
