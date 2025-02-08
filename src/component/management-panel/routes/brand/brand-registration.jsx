import img1 from "/img/head-1.webp";
import "@/App.css";
import "@/index.css";

import Table from "./table.jsx";
import FormBrand from "./form-brand.jsx";
import {
  React,
  useCallback,
  useEffect,
  useRef,
  useState,
  WithSupport2,
  Load,
  CheckMessage,
  Loading,
  useSelector,
  supplierNameGetAll,
} from "@/component/management-panel/import-management.js";
function BrandRegistration() {

  const [updateTable, setUpdateTable] = useState(false);

  const [options, setOptions] = useState([{ key: "", value: "" }]);
  const [options4, setOptions4] = useState([{ key: "", value: "" }]);
  const [ownerId, setOwnerId] = useState("");
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [load3, setLoad3] = useState(false);
  const [load4, setLoad4] = useState(false);
  const [load5, setLoad5] = useState(false);
  const [load6, setLoad6] = useState(false);
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

  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const GetSupplier = useCallback(() => {
    const keyword = "";
    supplierNameGetAll(
      keyword,
      token,
      chabk,
      setMessageData,
      setCheckData,
      (data) => {
        setOptions4(data);
        setCheckDataAll((r) => ({ ...r, check1: true }));
      }
    );
  }, [token, chabk]);
  const isFirstRender1 = useRef(true);
  useEffect(() => {
    if (isFirstRender1.current) {
      GetSupplier();
      isFirstRender1.current = false;
    }
  }, [GetSupplier]);



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
          <div className="w-full flex 2xl:container justify-center flex-wrap content-between">
            <section className="w-[81%] pt-10">
              <div className="w-full h-[140px] rounded-2xl shadow-custom-6">
                <img src={img1} alt="" className="w-full h-full rounded-2xl" />
              </div>
              <div className="w-full py-5">
                <div dir="ltr" className="w-full h-full">
                  <section className="w-full h-full flex flex-wrap px-4 pb-2 justify-center">
                    <h3 className="w-full flex justify-center text-[1.3rem] ">
                      ثبت برند
                    </h3>
                    <article
                      dir="rtl"
                      className="w-full flex justify-center gap-10 py-7"
                    ></article>
                    <article className="w-full flex justify-center gap-10 py-7">
                      <FormBrand
                        setLoad={setLoad}
                        setLoad2={setLoad2}
                        setLoad3={setLoad3}
                        setCheckData={setCheckData}
                        setMessageData={setMessageData}
                        setCheckDataAll={setCheckDataAll}
                        setUpdateTable={setUpdateTable}
                        updateTable={updateTable}
                        setCheck={setCheck}
                        setMessage={setMessage}
                      />
                    </article>
                    <article dir="rtl" className="w-[100%] flex justify-center">
                      <Table
                        updateTable={updateTable}
                        setUpdateTable={setUpdateTable}
                        options={options}
                        setLoad={setLoad}
                        setLoad2={setLoad2}
                        setLoad4={setLoad4}
                        setLoad5={setLoad5}
                        setLoad6={setLoad6}
                        token={token}
                        options4={options4}
                        setOwnerId={setOwnerId}
                        ownerId={ownerId}
                      />
                    </article>
                  </section>
                </div>
              </div>
            </section>

            <div className="w-full h-[50px] flex justify-center items-center">
              <WithSupport2 />
            </div>
          </div>
          <Load load={load} text={"در حال آپلود فایل ..."} />
          <Load load={load2} text={"در حال آپلود فایل ..."} />
          <Load load={load3} text={"در حال ثبت برند لطفا منتظر بمانید ..."} />
          <Load
            load={load4}
            text={"در حال ویرایش برند لطفا منتظر بمانید ..."}
          />
          <Load load={load5} text={"در حال حذف برند لطفا منتظر بمانید ..."} />
          <Load
            load={load6}
            text={"در حال بررسی وضعیت برند لطفا منتظر بمانید ..."}
          />
        </div>
      )}
    </>
  );
}

export default BrandRegistration;
