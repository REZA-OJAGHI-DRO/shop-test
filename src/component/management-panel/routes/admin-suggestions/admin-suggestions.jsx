import FormAdminSuggestions from "./form/form-admin-suggestions";
import Table from "./table";
import img1 from "/img/head-1.webp";
import {
    React,
    useEffect,
    useState,
    WithSupport2,
    Load,
    CheckMessage,
  } from "@/component/management-panel/import-management.js";

function AdminSuggestions() {
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
        check6: false,
      });
      const [isLoading, setIsLoading] = useState(true);
      useEffect(() => {
        setIsLoading(!Object.values(checkDataAll).every((value) => value === true));
      }, [checkDataAll]);
        const [updateTable, setUpdateTable] = useState(false);
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
                  پیشنهادات ادمین
                </h3>
     
                <article className="w-full px-4 py-2 flex gap-4 rounded-2xl shadow-custom-6 justify-center flex-wrap boxFilter ">
                  <FormAdminSuggestions
                    setLoad={setLoad}
                    setIsLoading={setIsLoading}
                    setMessage={setMessage}
                    setCheck={setCheck}
                    setUpdateTable={setUpdateTable}
                    setCheckDataAll={setCheckDataAll}
                    updateTable={updateTable}
                    setCheckData={setCheckData}
                    setMessageData={setMessageData}
                  />
                </article>

              
                <article className="w-full flex justify-center items-center pb-4">
                 <Table/>
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
            <Load
              load={load}
              text={"در حال ثبت لطفا منتظر بمانید ..."}
            />
  </>
  )
}

export default AdminSuggestions