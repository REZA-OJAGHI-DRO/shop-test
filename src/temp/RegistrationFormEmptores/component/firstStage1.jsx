import { useState } from "react";
import Button from "../../componentGeneral/button.jsx";
import Text from "../../componentGeneral/input/text.jsx";
import TextNumber from "../../componentGeneral/input/textNumber.jsx";
import WithSupport from "../../componentGeneral/withSupport.jsx";
import SvgDesktop1 from "../../componentGeneral/svg2/svg1.jsx";
import Password2 from "../../componentGeneral/input/password2.jsx";
import "../../index.css";
import { useSelector } from "react-redux";
function FirstStage1({ setDataAll, setStyleLeft, styleLeft }) {
  const [dataName, setDataName] = useState("");
  const [dataNationalCode, setDataNationalCode] = useState("");
  const [dataPhone, setDataPhone] = useState("");
  const [error, setError] = useState("");
  const [styleError1, setStyleError1] = useState(false);
  const [styleError2, setStyleError2] = useState(false);
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const numberPhone = getCookie("numberLogin");
  const maskedPassword = "*".repeat(11 - 4) + numberPhone?.slice(0, 4);
  const send = (e) => {
    e.preventDefault();
    setStyleError1(false);
    setStyleError2(false);
    if (dataName == "") {
      setError("لطفا نام را وارد کنید !");
      setStyleError1(true);
    } else if (dataPhone == "") {
      setError("لطفا شماره تلفن ثابت محل کسب را وارد کنید !");
      setStyleError2(true);
    } else if (dataPhone.length < 10) {
      setError("لطفا شماره تلفن ثابت محل کسب را صحیح کنید !");
      setStyleError2(true);
    } else {
      setStyleLeft(100);
      setDataAll((prev) => ({
        ...prev,
        name: dataName,
        phone: dataPhone,
        mobile: numberPhone,
        nationCode: dataNationalCode,
      }));
    }
  };

  return (
    <>
      <div
        style={{ display: styleLeft == 0 ? "flex" : "none" }}
        className="w-[100%] h-[100vh] flex xl:h-[75vh] justify-center overflow-y-auto xl:overflow-y-hidden px-3"
      >
        <div className="w-[100%] lg:w-[70%] flex flex-wrap justify-center content-between gap-1 py-16 xl:py-5 sm:py-5 px-3">
          <article className="w-[100%] flex flex-wrap justify-center items-center mt-0 md:mt-14 xl:mt-0">
            <SvgDesktop1 />
            <p className="w-[100%] flex justify-center text-white text-[1rem] lg:text-[1.5rem]">
              اطلاعات هویتی
            </p>
          </article>
          <article className="w-[90%] flex flex-wrap justify-between gap-2 content-between">
            <p className="w-[100%] text-white text-[1.2rem] lg:text-[1.2rem] pb-3">
              توضیحات ثبت نام
              <br />
              <span className="text-custom-green">
                * توجه داشته باشید اطلاعات وارد شده صرفا با تایید شما و فقط برای
                افرادی که قصد خرید کالا بصورت اعتباری (چکی و...) دارید نمایش
                داده خواهد شد
              </span>
            </p>
            <Text
              placeholder={"نام خود را وارد کنید"}
              label={"* نام و نام خانوادگی : "}
              svg={true}
              width={"w-[100%] xl:w-[32%]"}
              setData={setDataName}
              styleLabel={"text-[1.2rem] xl:text-[1rem] text-white"}
              styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[30px]"}
              styleError={styleError1}
              styleBox={"shadow-inner-custom bg-white"}
            />
            <Password2
              valuePassword={""}
              setValuePassword={""}
              placeholder={maskedPassword}
              label={"تلفن همراه :"}
              width={"w-[100%] xl:w-[32%]"}
              styleBox={"text-custom-green"}
              styleLabel={"text-[1.2rem] xl:text-[1rem]"}
              styleInput={
                "text-[1rem] xl:text-[1rem] h-[40px] xl:h-[40px] placeholder-zinc-600"
              }
              disabled={true}
            />
            <TextNumber
              placeholder={"شماره تماس را وارد کنید"}
              label={"* تلفن ثابت محل کسب :"}
              svg={true}
              width={"w-[100%] xl:w-[32%]"}
              max={11}
              data={dataPhone}
              setData={setDataPhone}
              styleLabel={"text-[1.2rem] xl:text-[1rem] text-white"}
              styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[40px]"}
              styleError={styleError2}
              styleBox={"shadow-inner-custom bg-white"}
            />
            <TextNumber
              placeholder={"اختیاری"}
              label={" کدملی :"}
              svg={false}
              width={"w-[100%] xl:w-[32%]"}
              max={10}
              data={dataNationalCode}
              setData={setDataNationalCode}
              styleLabel={"text-[1.2rem] xl:text-[1rem] text-white"}
              styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[40px]"}
              styleBox={"shadow-inner-custom bg-white"}
            />
            <p className="w-full text-red-600 flex justify-center mt-4 text-[1.2rem]">
              {error}
            </p>
          </article>
          <article className="w-[90%] sm:w-[50%] lg:w-[90%] flex flex-wrap gap-4 content-center justify-center mb-0 sm:mb-5">
            <div className="lg:w-[100%] w-[90%] flex justify-center">
              <Button
                value={"مرحله بعد"}
                click={() => send(event)}
                styleButton={4}
              />
            </div>
            <div className="w-full flex justify-center items-center mb-2 lg:mb-0">
              <WithSupport />
            </div>
          </article>
        </div>
      </div>
    </>
  );
}

export default FirstStage1;
