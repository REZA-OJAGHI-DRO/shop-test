import React, { useState } from "react";
import WithSupport from "../../componentGeneral/withSupport.jsx";
import SvgDesktop5 from "../../componentGeneral/svg2/svg5.jsx";
import Button from "../../componentGeneral/button.jsx";
import File from "../../componentGeneral/input/file.jsx";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function FirstStage5({ setDataAll, styleLeft, setStyleLeft }) {
  const [dataFile, setDataFile] = useState(null);
  const [dataFile2, setDataFile2] = useState(null);
  const [dataFile3, setDataFile3] = useState(null);
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [load3, setLoad3] = useState(false);
  const [check, setCheck] = useState({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });
  const [message, setMessage] = useState("");
  const send = (e) => {
    e.preventDefault();
    if (dataFile3 == null) {
      setError("لطفا تصویر تابلو مغازه را ارسال کنید !");
    } else {
      setStyleLeft(500);
      setDataAll((prev) => ({
        ...prev,
        docOrRentImage: dataFile,
        licenseImage: dataFile2,
        bannerImage: dataFile3,
      }));
    }
  };

  return (
    <>
      <div className="w-[50%] z-50 fixed top-[5vh] left-[25%]">
        <Stack sx={{ width: "100%" }} spacing={2}>
          {check.check1 == true && (
            <Alert severity="success" className="border-2 border-black">
              {message}
            </Alert>
          )}
          {/* <Alert severity="info">This is an info Alert.</Alert> */}
          {/* <Alert severity="warning">This is a warning Alert.</Alert> */}
          {check.check3 == true && (
            <Alert severity="warning" className="border-2 border-black">
              {message}
            </Alert>
          )}
          {check.check4 == true && (
            <Alert severity="error" className="border-2 border-black">
              {message}
            </Alert>
          )}
        </Stack>
      </div>
      <div
        style={{ display: styleLeft == 400 ? "flex" : "none" }}
        className="w-[100%] h-[100vh] flex xl:h-[75vh] justify-center overflow-y-auto xl:overflow-y-hidden px-3"
      >
        <div className="w-[100%] lg:w-[65%] flex flex-wrap justify-center content-between gap-3 py-16 xl:py-5 sm:py-5 px-3 ">
          <article className="w-[100%] flex flex-wrap justify-center items-center gap-3 sm:gap-0 mt-0 md:mt-10 xl:mt-0">
            <SvgDesktop5 />
            <p className="w-[100%] flex justify-center text-white text-[1.1rem] lg:text-[1.2rem]">
              اطلاعات محل کسب تون و تصویر سند و یا اجاره نامه، جواز کسب و ...
              باعث میشود تولیدکنندگان و وارد کنندگان دست اول بیشتر به شما اعتماد
              کنند و خرید راحت تری مخصوصا در حالت چکی و اعتباری داشته باشید.
            </p>
          </article>
          <article className="w-[100%]   flex flex-wrap justify-between gap-10 sm:gap-5 my-10 lg:my-0">
            <div className="lg:w-[31%] w-[100%] flex justify-around flex-wrap gap-1">
              <File
                width={"w-[100%]"}
                label={"تصویر تابلو مغازه :"}
                setDataFile={setDataFile3}
                style2={"h-[80px]"}
                styleLabel={"text-white pb-3 text-[1.1rem]"}
                fileType={"image"}
                type={5}
                setLoad={setLoad3}
                setCheck={setCheck}
                setMessage={setMessage}
              />
            </div>
            <div className="lg:w-[31%] w-[100%] flex justify-around flex-wrap gap-1">
              <File
                width={"w-[100%]"}
                label={"تصویر سند یا اجاره نامه :"}
                setDataFile={setDataFile}
                style2={"h-[80px]"}
                styleLabel={"text-white pb-3 text-[1.1rem]"}
                type={6}
                setLoad={setLoad}
                fileType={"image"}
                setCheck={setCheck}
                setMessage={setMessage}
              />
            </div>
            <div className="lg:w-[31%] w-[100%] flex justify-around flex-wrap gap-1">
              <File
                width={"w-[100%]"}
                label={"عکس جواز کسب :"}
                setDataFile={setDataFile2}
                style2={"h-[80px]"}
                styleLabel={"text-white pb-3 text-[1.1rem]"}
                fileType={"image"}
                type={4}
                setLoad={setLoad2}
                setCheck={setCheck}
                setMessage={setMessage}
              />
            </div>
            <p className="w-full text-red-600 flex justify-center mt-4 text-[1.2rem]">
              {error}
            </p>
          </article>
          <article className="w-full flex flex-wrap gap-5 justify-center ">
            <div className="w-[90%] sm:w-[50%] lg:w-[90%] flex flex-wrap justify-center ">
              <Button
                value={"مرحله بعد"}
                click={() => send(event)}
                styleButton={4}
              />
            </div>
            <div className="w-full  flex justify-center items-center mb-3 lg:mb-0">
              <WithSupport />
            </div>
          </article>
        </div>
        <div
          style={{ display: load == true ? "flex" : "none" }}
          className="w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,.5)] z-50 boxFilter11  flex-wrap content-center justify-center items-center"
        >
          <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
          </div>
          <p className="w-full text-center text-white text-[2rem]">
            در حال آپلود تصاویر لطفا منتظر بمانید ...
          </p>
        </div>
        <div
          style={{ display: load2 == true ? "flex" : "none" }}
          className="w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,.5)] z-50 boxFilter11  flex-wrap content-center justify-center items-center"
        >
          <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
          </div>
          <p className="w-full text-center text-white text-[2rem]">
            در حال آپلود تصاویر لطفا منتظر بمانید ...
          </p>
        </div>
        <div
          style={{ display: load3 == true ? "flex" : "none" }}
          className="w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,.5)] z-50 boxFilter11  flex-wrap content-center justify-center items-center"
        >
          <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
          </div>
          <p className="w-full text-center text-white text-[2rem]">
            در حال آپلود تصاویر لطفا منتظر بمانید ...
          </p>
        </div>
      </div>
    </>
  );
}

export default FirstStage5;
