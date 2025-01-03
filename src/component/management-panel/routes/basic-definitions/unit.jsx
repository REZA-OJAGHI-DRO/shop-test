import img1 from "/img/head-1.webp";
import Table2 from "./table-unit-goods.jsx";
import {
  React,
  useState,
  WithSupport2,
  Button,
  TextFull,
  Load,
  CheckMessage,
  useSelector,
  postUnitCreate
} from '@/component/management-panel/import-management.js'
function Unit() {
    const [title, setTitle] = useState("");
    const [styleError1, setStyleError1] = useState(false);
    const [updateTable, setUpdateTable] = useState(false);
    const [message, setMessage] = useState("");
    const [check, setCheck] = useState({
      check1: false,
      check2: false,
      check3: false,
      check4: false,
    });
    const [load, setLoad] = useState(false);
    const chabk = useSelector((state) => state.product.chabk);
    const token = useSelector((state) => state.product.token);
  
    const sendForm = async () => {
      if (!title) {
        setStyleError1(true);
      } else {
        setLoad(true);
        try {
          const result = await postUnitCreate(
            title,
             token,
              chabk,
              setMessage
            );
          if (result.isSuccess == true) {
            setTimeout(() => {
              setTitle("");
              setCheck((r) => ({ ...r, check1: true }));
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
              setTitle("");
              setCheck((r) => ({ ...r, check4: true }));
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
            setLoad(false);
            setCheck((r) => ({ ...r, check4: true }));
            setTimeout(() => {
              setCheck((r) => ({ ...r, check4: false }));
              setMessage("");
            }, 5000);
            }, 2000);
      
        }
      }
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
          <div className="w-full min-h-[100vh] flex 2xl:container justify-center flex-wrap content-between">
            <section className="w-[81%]  pt-10">
              <div className="w-full h-[140px] rounded-2xl shadow-custom-6">
                <img src={img1} alt="" className="w-full h-full rounded-2xl" />
              </div>
              <div className="w-full py-5">
                <div
                  dir="ltr"
                  className="w-full"
                >
                  <div dir="rtl" className="w-full h-full">
                    <section className="w-full h-full flex flex-wrap px-4 pb-2 gap-4">
                      <h3 className="w-full flex justify-center text-[1.3rem] ">
                        واحد کالا
                      </h3>
                      <article className="w-[100%]  rounded-2xl shadow-custom-7 boxFilter px-5 flex flex-wrap gap-8 py-5 justify-around items-center">
                        <div className="w-[100%]">
                        <div className="w-[40%] flex items-center pb-3">
                          <TextFull
                            pattern={/^[a-zA-Z\u0600-\u06FF\s0-9\u0660-\u0669]+$/}
                            placeholder={"لطفا نوع واحد کالا را وارد کنید..."}
                            label={"* نوع واحد کالا :"}
                            svg={false}
                            width={"w-[100%] h-[60px]"}
                            data={title}
                            setData={setTitle}
                            styleLabel={"text-[1rem] xl:text-[1rem] text-black"}
                            styleInput={
                              "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"
                            }
                            styleError={styleError1}
                            styleBox={"bg-[#ffffff]"}
                            />
                        </div>
                          </div>
                        <div className="w-[20%] flex items-end pb-2">
                          <Button
                            value={"ثبت"}
                            click={() => sendForm(event)}
                            styleButton={10}
                          />
                        </div>
                      </article>
                      <Table2
                        updateTable={updateTable}
                        setUpdateTable={setUpdateTable}
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
            text={"در حال ثبت نوع واحد کالا لطفا منتظر بمانید ..."}
          />
        </div>
      </>
    );
}

export default Unit