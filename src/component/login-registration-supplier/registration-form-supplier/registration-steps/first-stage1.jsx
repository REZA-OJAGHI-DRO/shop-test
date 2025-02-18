import { from } from "jalali-moment";
import {
  React,
  useState,
  Button,
  TextFull,
  Text,
  WithSupport,
  SvgDesktop1,
  Password2,
  TextNumber,
} from '@/component/login-registration-supplier/import-login-registration-supplier'

function FirstStage1({ setDataAll, styleLeft, setStyleLeft }) {
  const [legalButton1, setLegalButton1] = useState(2);
  const [trueButton2, setTrueButton2] = useState(3);
  const [form, setForm] = useState(true);
  const [isPerson, setIsPerson] = useState(true);
  const [dataName, setDataName] = useState("");
  const [dataLastName, setDataLastName] = useState("");
  const [dataNationalCod, setDataNationalCod] = useState("");
  const [dataPhone, setDataPhone] = useState("");
  const [dataMobile1, setDataMobile1] = useState("");
  const [dataMobile2, setDataMobile2] = useState("");
  const [error, setError] = useState("");
  const [styleError1, setStyleError1] = useState(false);
  const [styleError2, setStyleError2] = useState(false);
  const [styleError3, setStyleError3] = useState(false);
  const [styleError4, setStyleError4] = useState(false);
  const [styleError5, setStyleError5] = useState(false);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  const numberPhone = getCookie("numberLogin");
  const maskedPassword = "*".repeat(11 - 4) + numberPhone?.slice(0, 4);

  const clickLegal = (e) => {
    setLegalButton1(3);
    setTrueButton2(2);
    setForm(false);
    setIsPerson(false);
  };
  const clickTrue = (e) => {
    setLegalButton1(2);
    setTrueButton2(3);
    setForm(true);
    setIsPerson(true);
  };

  const send = (e) => {
    e.preventDefault();
    setStyleError1(false);
    setStyleError2(false);
    setStyleError3(false);
    setStyleError4(false);
    setStyleError5(false);
    if (dataName == "") {
      setError("لطفا نام را وارد کنید !");
      setStyleError1(true);
    } else if (from === true && dataLastName === "") {
      setError("لطفا نام و نام خانوادگی را وارد کنید !");
      setStyleError1(true);
    } else if (dataNationalCod == "") {
      setError("لطفا کد ملی را وارد کنید !");
      setStyleError2(true);
    } else if (
      isPerson == true
        ? dataNationalCod.length < 10
        : dataNationalCod.length < 11
    ) {
      setError("لطفا کد ملی را صحیح کنید !");
      setStyleError2(true);
    } else if (dataPhone == "") {
      setError("لطفا شماره تلفن ثابت را وارد کنید !");
      setStyleError3(true);
    } else if (dataPhone.length < 10) {
      setError("لطفا شماره تلفن ثابت را صحیح کنید !");
      setStyleError3(true);
    } else if (dataMobile2 == "") {
      setError("لطفا شماره تلفن همراه حسابدار را وارد کنید !");
      setStyleError5(true);
    } else if (dataMobile2.length < 10) {
      setError("لطفا شماره تلفن همراه حسابدار را صحیح کنید !");
      setStyleError5(true);
    } else {
      setStyleLeft(100);
      setDataAll((prev) => ({
        ...prev,
        name: dataName,
        lastName: dataLastName,
        nationalId: String(dataNationalCod),
        phone: dataPhone,
        mobile: numberPhone,
        mobile2: dataMobile2,
        isPerson: isPerson,
      }));
    }
  };

  return (
    <>
      <div
        style={{ display: styleLeft == 0 ? "flex" : "none" }}
        className="w-[100%] h-[100vh] flex xl:h-[75vh] justify-center overflow-y-auto xl:overflow-y-hidden px-3"
      >
        <div className="w-[90%] flex flex-wrap justify-center content-between gap-1 py-10 xl:py-5 sm:py-5 px-3">
          <article className="w-[90%] flex flex-wrap gap-5 justify-center items-center">
            <SvgDesktop1 />
            <div className="w-[100%] xl:w-[80%] justify-center flex gap-1">
              <Button
                value={"حقوقی"}
                click={() => clickLegal(event)}
                styleButton={legalButton1}
              />
              <Button
                value={"حقیقی"}
                click={() => clickTrue(event)}
                styleButton={trueButton2}
              />
            </div>
          </article>
          <article className="w-[90%] flex flex-wrap justify-center gap-3 content-between xl:my-10">
            {isPerson == true ? (
              <Text
                placeholder={"نام خود را وارد کنید"}
                label={"نام :"}
                svg={true}
                width={"w-[100%] xl:w-[30%]"}
                setData={setDataName}
                styleLabel={"text-[1rem] xl:text-[1rem] text-white"}
                styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
                styleError={styleError1}
                styleBox={"bg-[#d9d9d9]"}
              />
            ) : (
              <TextFull
                pattern={/^[a-zA-Z\u0600-\u06FF\s0-9\u0660-\u0669]+$/}
                placeholder={"نام شرکت را وارد کنید"}
                label={"نام شرکت :"}
                svg={false}
                width={"w-[100%] xl:w-[30%] mb-2"}
                // data={dateName}
                setData={setDataName}
                styleLabel={"text-[1rem] xl:text-[1rem] text-white"}
                styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
                styleError={styleError1}
                styleBox={"bg-[#d9d9d9]"}
              />
            )}
            <Text
              placeholder={"نام خانوادگی خود را وارد کنید"}
              label={"نام خانوادگی :"}
              svg={true}
              width={`w-[100%] xl:w-[30%] ${form == true ? "flex" : "hidden"}`}
              setData={setDataName}
              styleLabel={"text-[1rem] xl:text-[1rem] text-white"}
              styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
              styleError={styleError1}
              styleBox={"bg-[#d9d9d9]"}
            />
            <TextNumber
              placeholder={"اختیاری"}
              label={isPerson == true ? "شناسه/ کدملی :" : "شناسه شرکت"}
              svg={false}
              width={"w-[100%] xl:w-[30%]"}
              max={isPerson == true ? 10 : 11}
              data={dataNationalCod}
              setData={setDataNationalCod}
              styleLabel={"text-[1rem] xl:text-[1rem] text-zinc-200"}
              styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
              styleError={styleError2}
              styleBox={"bg-[rgb(217,217,217)]"}
            />
            <TextNumber
              placeholder={"شماره تماس را وارد کنید"}
              label={"تلفن ثابت :"}
              svg={true}
              width={"w-[100%] xl:w-[30%]"}
              max={11}
              data={dataPhone}
              setData={setDataPhone}
              styleLabel={"text-[1rem] xl:text-[1rem] text-zinc-200"}
              styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
              styleError={styleError3}
              styleBox={"bg-[rgb(217,217,217)]"}
            />
            {/* <TextNumber
              placeholder={"شماره تماس را وارد کنید"}
              label={"تلفن همراه مدیر مجموعه :"}
              svg={true}
              width={"w-[100%] xl:w-[30%]"}
              max={11}
              data={dataMobile1}
              setData={setDataMobile1}
              styleLabel={"text-[1rem] xl:text-[1rem] text-zinc-200"}
              styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
              styleError={styleError4}
              styleBox={"bg-[rgb(217,217,217)]"}
            /> */}
            <Password2
              valuePassword={""}
              setValuePassword={""}
              placeholder={maskedPassword}
              label={"تلفن همراه مدیر مجموعه :"}
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
              label={"تلفن همراه حسابدار یا هماهنگ کننده امور :"}
              svg={true}
              width={"w-[100%] xl:w-[30%]"}
              max={11}
              data={dataMobile2}
              setData={setDataMobile2}
              styleLabel={"text-[1rem] xl:text-[.9rem] text-zinc-200"}
              styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
              styleError={styleError5}
              styleBox={"bg-[rgb(217,217,217)]"}
            />
            <div className="w-[30%] hidden xl:flex"></div>
            <p className="w-full text-red-600 flex justify-center mt-4 text-[1.2rem]">
              {error}
            </p>
          </article>
          <div className="w-[90%] flex flex-wrap gap-4 content-center justify-center mb-0 sm:mb-5">
            <div className="w-full flex justify-center">
              <Button
                value={"مرحله بعد"}
                click={() => send(event)}
                styleButton={4}
              />
            </div>
            <div className="w-full flex justify-center mb-5 xl:mb-0">
              <WithSupport />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FirstStage1;
