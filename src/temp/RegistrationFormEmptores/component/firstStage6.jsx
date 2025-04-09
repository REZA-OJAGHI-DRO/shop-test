import React, { useCallback, useEffect, useState } from "react";
import WithSupport from "../../componentGeneral/withSupport.jsx";
import SvgDesktop6 from "../../componentGeneral/svg2/svg6.jsx";
import Button from "../../componentGeneral/button.jsx";
import Text from "../../componentGeneral/input/text.jsx";
import TextNumber from "../../componentGeneral/input/textNumber.jsx";
import City from "../../componentGeneral/city/city.jsx";
import TextArea from "../../componentGeneral/input/textArea.jsx";
import "../../App.css";
import { useSelector } from "react-redux";
import Load from "../../componentGeneral/load.jsx";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { sendShopperCreate, fetchProvinces, cityData } from "../../data.js";
const Modal = ({ onClose, title, children, style }) => {
  return (
    <>
      <style>
        {`
      .boxFilter11{
    //   background:rgba(0,0,0,.3);
      backdrop-filter:blur(10px);
      }
      .boxFilter12{
    //   background:rgba(0,0,0,.3);
      backdrop-filter:blur(10px);
      }
      `}
      </style>
      <div className="fixed h-[100vh] inset-0 bg-opacity-50 flex items-center justify-center boxFilter11 z-50">
        <div
          className={` ${style} w-[90vw] lg:w-[50vw] py-4 bg-[#f5f2fdda] shadow-custom-8 rounded-2xl overflow-hidden`}
        >
          <div className="flex justify-between items-center px-4">
            <h2 className="text-lg font-bold">{title}</h2>
            <button onClick={onClose} className="text-red-500 text-[2rem]">
              &times;
            </button>
          </div>
          <div className=" myElement overflow-y-auto ">{children}</div>
        </div>
      </div>
    </>
  );
};

function FirstStage6({
  dataAll,
  setDataAll,
  stage7,
  setStage7,
  setStyleLeft,
  styleLeft,
}) {
  const [options, setOptions] = useState([{ key: "0", value: "استان" }]);
  const [options2, setOptions2] = useState([{ key: "0", value: "شهر" }]);
  const [dataCityId, setDataCityId] = useState();
  const [dataCityId2, setDataCityId2] = useState();
  const [dataIdEntityNotitia, setDataIdEntityNotitia] = useState([]);
  const [name, setName] = useState();
  const [mobile, setMobile] = useState();
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [checkAll, setCheckAll] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState();
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);
  function deleteCookie(name) {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  const loadProvinces = useCallback(async () => {
    if (styleLeft == 500) {
      try {
        const provinces = await fetchProvinces(token, chabk);
        if (Array.isArray(provinces)) {
          setOptions(provinces);
        } else {
          console.error("Invalid data format:", provinces);
        }
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    }
  }, [styleLeft]);

  useEffect(() => {
    loadProvinces();
  }, [loadProvinces]);

  useEffect(() => {
    if (dataCityId != null) {
      async function fetchData() {
        try {
          const result = await cityData(dataCityId, token, chabk);
          setOptions2(result.data);
        } catch (error) {
          alert(error);
        }
      }
      fetchData();
    }
  }, [dataCityId]);

  useEffect(() => {
    setDataAll((prev) => ({
      ...prev,
      friends: dataIdEntityNotitia.length > 0 ? dataIdEntityNotitia : [],
    }));
  }, [dataIdEntityNotitia]);

  const send = async (e) => {
    e.preventDefault();
    const updatedDataAll = dataAll;
    if (name || mobile || dataCityId2 || description) {
      if (dataIdEntityNotitia.length === 0) {
        console.log("reza");

        setError("لطفا روی افزودن کلیک کنید");
      } else {
        setLoad(true);
        try {
          const result = await sendShopperCreate(updatedDataAll, token, chabk);
          if (result.isSuccess == true) {
            if (result) {
              setTimeout(() => {
                setLoad(false);
                setStage7(false);
                deleteCookie("numberLogin");
              }, 2000);
            } else {
              setTimeout(() => {
                setLoad(false);
                setShowViewModal(true);
              }, 2000);
            }
          } else {
            setMessage(result?.error ? result?.error : result?.message);
            setTimeout(() => {
              setLoad(false);
              setCheckAll((r) => ({ ...r, check4: true }));
              setTimeout(() => {
                setCheckAll((r) => ({ ...r, check4: false }));
                setMessage("");
              }, 5000);
            }, 2000);
          }
          // alert("ارسال شد");
        } catch (error) {
          setTimeout(() => {
            setLoad(false);
            if (error.response && error.response.status === 400) {
              setShowViewModal(true);
            } else {
              setMessage("مشکلی در ارسال به وجود آمده خطای 500");
              setCheckAll((r) => ({ ...r, check4: true }));
              setTimeout(() => {
                setCheckAll((r) => ({ ...r, check4: false }));
                setMessage("");
              }, 5000);
            }
          }, 2000);
        }
      }
    } else {
      setLoad(true);
      try {
        const result = await sendShopperCreate(updatedDataAll, token, chabk);
        if (result.isSuccess == true) {
          if (result) {
            setTimeout(() => {
              setLoad(false);
              setStage7(false);
              deleteCookie("numberLogin");
            }, 2000);
          } else {
            setTimeout(() => {
              setLoad(false);
              setShowViewModal(true);
            }, 2000);
          }
        } else {
          setMessage(result?.error ? result?.error : result?.message);
          setTimeout(() => {
            setLoad(false);
            setCheckAll((r) => ({ ...r, check4: true }));
            setTimeout(() => {
              setCheckAll((r) => ({ ...r, check4: false }));
              setMessage("");
            }, 5000);
          }, 2000);
        }
        // alert("ارسال شد");
      } catch (error) {
        setTimeout(() => {
          setLoad(false);
          if (error.response && error.response.status === 400) {
            setShowViewModal(true);
          } else {
            setMessage("مشکلی در ارسال به وجود آمده خطای 500");
            setCheckAll((r) => ({ ...r, check4: true }));
            setTimeout(() => {
              setCheckAll((r) => ({ ...r, check4: false }));
              setMessage("");
            }, 5000);
          }
        }, 2000);
      }
    }
  };

  const closeModal = () => {
    setShowViewModal(false);
  };

  const clickAdd = () => {
    const newEntry = {
      name: name,
      mobile: mobile,
      cityId: String(dataCityId2),
      description: description,
    };
    setDataIdEntityNotitia((prevData) => [...prevData, newEntry]);
  };

  const clickDelete = (x) => {
    setDataIdEntityNotitia((prevData) =>
      prevData.filter((item) => item !== dataIdEntityNotitia[x])
    );
  };
  return (
    <>
      <div className="w-[50%] z-50 fixed top-[5vh] left-[25%]">
        <Stack sx={{ width: "100%" }} spacing={2}>
          {checkAll.check1 == true && (
            <Alert severity="success" className="border-2 border-black">
              {message}
            </Alert>
          )}
          {/* <Alert severity="info">This is an info Alert.</Alert> */}
          {/* <Alert severity="warning">This is a warning Alert.</Alert> */}
          {checkAll.check4 == true && (
            <Alert severity="error" className="border-2 border-black">
              {message}
            </Alert>
          )}
        </Stack>
      </div>
      <div
        style={{ display: styleLeft == 500 ? "flex" : "none" }}
        className="w-[100%] h-[100vh] flex xl:h-[75vh] justify-center overflow-y-auto xl:overflow-y-hidden px-3"
      >
        <div className="w-[90%] lg:w-[80%] flex flex-wrap justify-center content-between gap-3 py-16 xl:py-5 sm:py-5 px-3">
          <article className="w-[100%] flex flex-wrap justify-center items-center gap-3 sm:gap-0 mt-0 md:mt-10 xl:mt-0">
            <SvgDesktop6 />
            <p className="w-[100%] flex justify-center text-white text-[1.5rem] lg:text-[1.5rem] mb-3">
              اطلاعات هویتی
            </p>
            <p className="w-[100%] flex justify-center text-white text-[1.3rem] lg:text-[1rem]">
              اگر تمایل دارید از همکارانتون کسانی را که میتوانند به عنوان معرف
              شما باشد و شما با آنها به عنوان تامین کننده کار کردید را وارد
              کنید.
            </p>
          </article>
          <article className="w-[100%] flex flex-wrap justify-center xl:justify-start content-start gap-5 sm:gap-2 mt-2">
            <Text
              placeholder={"نام خود را وارد کنید"}
              label={"* نام و نام خانوادگی : "}
              svg={true}
              width={"w-[100%] xl:w-[32%] h-[90px]"}
              setData={setName}
              styleLabel={"text-[1.2rem] xl:text-[1rem] text-white"}
              styleInput={"text-[1rem] xl:text-[1rem] h-[30px] xl:h-[30px]"}
              styleError={""}
              styleBox={"shadow-custom-6 bg-white"}
            />
              <TextNumber
                placeholder={"شماره تماس را وارد کنید"}
                label={"* تلفن همراه:"}
                svg={true}
                width={"w-[100%] xl:w-[32%] h-[90px]"}
                max={11}
                data={mobile}
                setData={setMobile}
                styleLabel={"text-[1.2rem] xl:text-[1rem] text-white"}
                styleInput={"text-[1rem] xl:text-[1rem] h-[30px] xl:h-[30px]"}
                styleError={""}
                styleBox={"shadow-custom-6 bg-white"}
              />
            <div className="w-[100%] xl:w-[32%]">
              <City
              dataCityId={dataCityId}
              setDataCityId={setDataCityId}
              dataCityId2={dataCityId2}
              setDataCityId2={setDataCityId2}
              selectedProvinceData={''}
              selectedCityData={''}
              styleError={''}
              isDisabled={false}
              styleLabel={"text-[1.2rem] xl:text-[1rem] text-white"}     
              />
              </div>
            <TextArea
              label={"توضیحات"}
              width={"w-[100%] xl:w-[32%] flex h-[90px] rounded-none text-white"}
              placeholder={"توضیح برند یا کالا خاص و یا ... در مورد معرف"}
              checked={true}
              data={description}
              setData={setDescription}
              styleError={""}
              styleLabel={'h-[20px]'}
            />
            <div className=" w-[100%] md:w-[48%] xl:w-[30%]  justify-center flex-wrap gap-1 rounded-xl overflow-hidden pt-8">
              <div
                dir="ltr"
                className="w-full rounded-xl h-[60px] overflow-hidden "
              >
                <div className="w-full h-full overflow-y-scroll myElement content-around py-2 gap-2 flex flex-wrap justify-center px-1 bg-[#d9d9d994] shadow-inner-custom-2">
                  <div
                    dir="rtl"
                    className="w-[28%] h-[35px] shadow-inner-custom-3 rounded-xl bg-[rgba(62,62,62,.2)]"
                  >
                    {dataIdEntityNotitia[0] ? (
                      <div className="w-full h-full py-1 text-zinc-500 px-2 text-[.9rem] flex justify-between items-center rounded-xl shadow-custom-7 bg-[#D9D9D9]">
                        {dataIdEntityNotitia[0].name}
                        <i
                          onClick={() => clickDelete(0)}
                          className="bi cursor-pointer text-red-600 bi-trash3-fill text-[.9rem]"
                        ></i>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    dir="rtl"
                    className="w-[28%] h-[35px] shadow-inner-custom-3 rounded-xl bg-[rgba(62,62,62,.2)]"
                  >
                    {dataIdEntityNotitia[1] ? (
                      <div className="w-full h-full text-zinc-500 px-2 py-1 text-[.9rem] flex justify-between items-center rounded-xl shadow-custom-7 bg-[#D9D9D9]">
                        {dataIdEntityNotitia[1].name}
                        <i
                          onClick={() => clickDelete(1)}
                          className="bi cursor-pointer text-red-600 bi-trash3-fill text-[.9rem]"
                        ></i>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    dir="rtl"
                    className="w-[28%] h-[35px] shadow-inner-custom-3 rounded-xl bg-[rgba(62,62,62,.2)]"
                  >
                    {dataIdEntityNotitia[2] ? (
                      <div className="w-full h-full text-zinc-500 px-2 py-1 text-[.9rem] flex justify-between items-center rounded-xl shadow-custom-7 bg-[#D9D9D9]">
                        {dataIdEntityNotitia[2].name}
                        <i
                          onClick={() => clickDelete(2)}
                          className="bi cursor-pointer text-red-600 bi-trash3-fill text-[.9rem]"
                        ></i>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  {dataIdEntityNotitia.map((val, i) => {
                    return (
                      <>
                        {i > 2 ? (
                          <div
                            dir="rtl"
                            className="w-[28%] h-[35px] shadow-inner-custom-3 rounded-xl bg-[rgba(62,62,62,.2)]"
                          >
                            <div
                              key={i}
                              className="w-full py-1 h-full text-zinc-500 px-2 text-[.9rem] flex justify-between items-center rounded-xl shadow-custom-7 bg-[#D9D9D9]"
                            >
                              {val.name}
                              <i
                                onClick={() => clickDelete(2)}
                                className="bi cursor-pointer text-red-600 bi-trash3-fill text-[.9rem]"
                              ></i>
                            </div>
                          </div>
                        ) : null}
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="w-[50%] flex justify-center pt-2 items-center">
                <Button
                  value={"افزودن "}
                  click={clickAdd}
                  styleButton={10}
                  icon={true}
                />
              </div>
            </div>
            <p className="w-full text-red-600 flex justify-center mt-4 text-[1.2rem]">
              {error}
            </p>
          </article>
          <article className="w-full flex justify-center flex-wrap gap-2 ">
            <div className="w-[90%] sm:w-[50%] lg:w-[90%]  flex flex-wrap justify-center ">
              <Button
                value={"ثبت نهایی"}
                click={() => send(event)}
                styleButton={4}
              />
            </div>
            <div className="w-full  flex justify-center items-center mb-3 lg:mb-0">
              <WithSupport />
            </div>
          </article>
        </div>
      </div>
      <Load load={load} text={"در حال ثبت لطفا منتظر بمانید ..."} />
      {showViewModal && (
        <Modal onClose={closeModal} title="">
          <div className="w-[100%] flex justify-center content-center flex-wrap gap-5 px-5 ">
            <p className="w-[100%] text-[1.2rem] lg:text-[1.5rem] text-zinc-700 px-3 lg:px-10">
              مشکلی در ذخیره‌سازی اطلاعات به وجود آمده است. لطفاً مجدداً تلاش
              کنید و یا با پشتیبانی تماس بگیرید.
            </p>
            <WithSupport3 />
          </div>
        </Modal>
      )}
    </>
  );
}

export default FirstStage6;
