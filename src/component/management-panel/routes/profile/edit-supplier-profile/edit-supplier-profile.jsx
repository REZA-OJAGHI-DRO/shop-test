
import Form1 from "./form-1";
import Form2 from "./form-2";
import Form3 from "./form-3";
import Form4 from "./form-4";
import {
  React,
  useEffect,
  useState,
  Load,
  CheckMessage,
  Loading,
} from "@/component/management-panel/import-management.js";

function editSupplier({ data, updateTable, setUpdateTable }) {
  const [messageData, setMessageData] = useState([]);
  const [checkData, setCheckData] = useState(false);
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
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });
  return (
    <>
      <CheckMessage message={message} check={check} />
      {isLoading == false ? (
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
        <div className='w-full flex flex-wrap px-4 pb-2 justify-between content-start"'>
          <article className="w-full "></article>
          <article className="w-[100%]  flex flex-wrap content-start justify-start">
            <p className="w-fit h-[40px] text-[1.2rem] shadow-custom-7 -translate-x-5 translate-y-5 z-10 bg-white px-3 rounded-2xl flex items-center gap-2">
              {" "}
              <span className="text-red-600 ">*</span> اطلاعات تماس و هویتی
            </p>
            <div
              dir="rtl"
              className="w-[100%] min-h-[360px] rounded-3xl px-4 py-7 flex gap-5 shadow-custom-6 justify-between flex-wrap boxFilter"
            >
             
                <Form1
                  data={data}
                  setLoad={setLoad}
                  setLoad2={setLoad2}
                  setCheck={setCheck}
                  setMessage={setMessage}
                  setUpdateTable={setUpdateTable}
                  updateTable={updateTable}
                />
            
            </div>
          </article>
          <article className="w-[100%] lg:w-[48%]  flex flex-wrap content-start justify-start">
            <p className="w-fit h-[40px] text-[1.2rem] shadow-custom-7 -translate-x-5 translate-y-5 z-10 bg-white px-3 rounded-2xl flex items-center gap-2">
              <span className="text-red-600">*</span> آدرس
            </p>
            <div
              dir="rtl"
              className="w-[100%] rounded-3xl px-4 py-7 flex shadow-custom-6 justify-between content-start flex-wrap boxFilter"
            >
            
                <Form2
                  data={data}
                  setLoad={setLoad}
                  setLoad2={setLoad2}
                  setCheck={setCheck}
                  setMessage={setMessage}
                  setUpdateTable={setUpdateTable}
                  updateTable={updateTable}
                />
           
            </div>
          </article>
          <article className="w-[100%] lg:w-[48%]  flex flex-wrap content-start justify-start">
            <p className="w-fit h-[40px] text-[1.2rem] shadow-custom-7 -translate-x-5 translate-y-5 z-10 bg-white px-3 rounded-2xl flex items-center gap-2">
              <span className="text-red-600">*</span> شرایط فروش
            </p>
            <div
              dir="rtl"
              className="w-[100%] min-h-[403px] rounded-3xl px-4 py-7 flex gap-5 shadow-custom-6 justify-between content-start flex-wrap boxFilter"
            >
              
                <Form3
                  data={data}
                  setLoad={setLoad}
                  setLoad2={setLoad2}
                  setCheck={setCheck}
                  setMessage={setMessage}
                  setUpdateTable={setUpdateTable}
                  updateTable={updateTable}
                />
          
            </div>
          </article>
          <article className="w-[100%]  flex flex-wrap content-start justify-start">
            <p className="w-fit h-[40px] text-[1.2rem] shadow-custom-7 -translate-x-5 translate-y-5 z-10 bg-white px-3 rounded-2xl flex items-center gap-2">
              {" "}
              <span className="text-red-600 ">*</span> فعالیت
            </p>
            <div
              dir="rtl"
              className="w-[100%] min-h-[403px] rounded-3xl px-4 py-7 flex gap-5 shadow-custom-6 justify-around flex-wrap boxFilter content-start"
            >
             
                <Form4
                  data={data}
                  setLoad={setLoad}
                  setLoad2={setLoad2}
                  setCheck={setCheck}
                  setMessage={setMessage}
                  setUpdateTable={setUpdateTable}
                  updateTable={updateTable}
                  setIsLoading={setIsLoading}
                  setCheckDataAll={setCheckDataAll}
                  setCheckData={setCheckData}
                  setMessageData={setMessageData}
                />
             
            </div>
          </article>

          <Load load={load} text={"در حال ثبت لطفا منتظر بمانید ..."} />
          <Load
            load={load2}
            text={"در حال آپلود تصاویر لطفا منتظر بمانید ..."}
          />
        </div>
      )}
    </>
  );
}

export default editSupplier;
