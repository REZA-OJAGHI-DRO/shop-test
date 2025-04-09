import { useEffect, useState } from "react";
import WithSupport from "../../componentGeneral/withSupport.jsx";
import SvgDesktop4 from "../../componentGeneral/svg2/svg4.jsx";
import Button from "../../componentGeneral/button.jsx";
import "../../index.css";
import "../../App.css";
import TextNumber from "../../componentGeneral/input/textNumber.jsx";
import CheckBoxAccordion2 from "../../componentGeneral/input/checkBoxAccordion2.jsx";
import { Icon } from "@iconify/react";

function FirstStage4({ setDataAll, styleLeft, setStyleLeft }) {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [b1, setb1] = useState(48);
  const [b2, setb2] = useState(49);
  const [b3, setb3] = useState(50);
  const [b4, setb4] = useState(51);
  const [b5, setb5] = useState(52);
  const [b6, setb6] = useState(98);
  const [b7, setb7] = useState(99);
  const [b8, setb8] = useState(100);
  const [b9, setb9] = useState(101);
  const [b10, setb10] = useState(102);
  const [activeCheckbox1, setActiveCheckbox1] = useState(0);
  const [activeCheckbox2, setActiveCheckbox2] = useState(0);
  const [activeCheckbox3, setActiveCheckbox3] = useState(0);
  const [error, setError] = useState("");
  const [styleError1, setStyleError1] = useState(false);
  const [styleError2, setStyleError2] = useState(false);
  const [styleError3, setStyleError3] = useState(false);
  const [styleError4, setStyleError4] = useState(false);
  const [cursor, setCursor] = useState("cursor-grab");
  const [propertyPlace, setPropertyPlace] = useState(true);
  const [typeOfLicense, setTypeOfLicense] = useState(true);
  const [typeOfBusiness, setTypeOfBusiness] = useState(true);
  const [laid, setLaid] = useState("");

  const [isSm, setIsSm] = useState(
    window.matchMedia("(max-width: 600px)").matches
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSm(window.matchMedia("(max-width: 600px)").matches);
    };

    window.addEventListener("resize", handleResize);
    const totalInMeters = b8 + b3 / 100;
    if (isSm) {
      setLaid(totalInMeters.toFixed(2));
    } else {
      setLaid("");
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [b8, b3, isSm]);

  const send = (e) => {
    e.preventDefault();
    setStyleError1(false);
    setStyleError2(false);
    setStyleError3(false);
    setStyleLeft(400);
    setDataAll((prev) => ({
      ...prev,
      isRent: propertyPlace,
      hasLicense: typeOfLicense,
      shoppingType: typeOfBusiness,
      shopArea: isNaN(parseInt(laid)) ? 0 : parseInt(laid),
    }));
  };

  const handleCheck1 = (index) => {
    if (index === activeCheckbox1 && checked1) {
      return;
    }
    setActiveCheckbox1(index);
    setChecked1(true);
    setStyleError1(false);

    if (index === 0) {
      setPropertyPlace(true);
    } else {
      setPropertyPlace(false);
    }
  };
  const handleCheck2 = (index) => {
    if (index === activeCheckbox2 && checked2) {
      return;
    }
    setActiveCheckbox2(index);
    setChecked2(true);
    setStyleError2(false);

    if (index === 0) {
      setTypeOfLicense(false);
    } else {
      setTypeOfLicense(true);
    }
  };
  const handleCheck3 = (index) => {
    if (index === activeCheckbox3 && checked3) {
      return;
    }
    setActiveCheckbox3(index);
    setChecked3(true);
    setStyleError3(false);

    if (index === 0) {
      setTypeOfBusiness("پخش عمده");
    } else {
      setTypeOfBusiness("خرده فروشی");
    }
  };

  const [position, setPosition] = useState({ y: 0 });
  const [position2, setPosition2] = useState({ y: 0 });
  const [isTracking, setIsTracking] = useState(false);
  const [lastY, setLastY] = useState(0);
  const convertToPersianNumber = (number) => {
    if (number === null || number === undefined) {
      return "";
    }
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return number
      .toString()
      .split("")
      .map((digit) => persianDigits[digit] || digit)
      .join("");
  };
  const handleMouseDown = (event) => {
    const y = event.clientY || event.touches[0].clientY;
    const box = event.target.getBoundingClientRect();
    const positionY = Math.floor(y - box.top) / 3;
    setPosition({ y: positionY });
    setLastY(positionY);
    setIsTracking(true);
    setCursor("cursor-grabbing");
  };
  const adjustValues = (change) => {
    const newB3 = Math.min(Math.max(b3 + change, 0), 100);
    const newB1 = newB3 - 3;
    const newB2 = newB3 - 2;
    const newB4 = newB3 + 1;
    const newB5 = newB3 + 2;
    setb1(newB1 >= 0 && newB1 <= 100 ? newB1 : null);
    setb2(newB2 >= 0 && newB2 <= 100 ? newB2 : null);
    setb3(newB3);
    setb4(newB4 >= 0 && newB4 <= 100 ? newB4 : null);
    setb5(newB5 >= 0 && newB5 <= 100 ? newB5 : null);
  };
  const handleMouseMove = (event) => {
    if (isTracking) {
      const y = event.clientY || event.touches[0].clientY;
      const box = event.target.getBoundingClientRect();
      const positionY = Math.floor(y - box.top);
      setPosition({ y: positionY });
      if (positionY > lastY) {
        adjustValues(1);
      } else if (positionY < lastY) {
        adjustValues(-1);
      }

      setLastY(positionY);
    }
  };

  const handleMouseUp = () => {
    setIsTracking(false);
    setCursor("cursor-grab");
  };

  const handleMouseDown2 = (event) => {
    const y = event.clientY || event.touches[0].clientY;
    const box = event.target.getBoundingClientRect();
    const positionY = Math.floor(y - box.top) / 3;
    setPosition2({ y: positionY });
    setLastY(positionY);
    setIsTracking(true);
    setCursor("cursor-grabbing");
  };
  const adjustValues2 = (change) => {
    const newB3 = Math.min(Math.max(b8 + change, 0));
    const newB1 = newB3 - 3;
    const newB2 = newB3 - 2;
    const newB4 = newB3 + 1;
    const newB5 = newB3 + 2;
    setb6(newB1 >= 0 ? newB1 : null);
    setb7(newB2 >= 0 ? newB2 : null);
    setb8(newB3);
    setb9(newB4 >= 0 ? newB4 : null);
    setb10(newB5 >= 0 ? newB5 : null);
  };
  const handleMouseMove2 = (event) => {
    if (isTracking) {
      const y = event.clientY || event.touches[0].clientY;
      const box = event.target.getBoundingClientRect();
      const positionY = Math.floor(y - box.top);
      setPosition2({ y: positionY });
      if (positionY > lastY) {
        adjustValues2(1);
      } else if (positionY < lastY) {
        adjustValues2(-1);
      }

      setLastY(positionY);
    }
  };

  const handleMouseUp2 = () => {
    setIsTracking(false);
    setCursor("cursor-grab");
  };

  return (
    <>
      <div
        style={{ display: styleLeft == 300 ? "flex" : "none" }}
        className="w-[100%]  h-[100vh] flex xl:h-[75vh] justify-center overflow-y-auto xl:overflow-y-hidden px-3"
      >
        <div className="w-[100%] lg:w-[90%] flex flex-wrap justify-center content-between gap-10 py-16 xl:py-5 sm:py-5 px-3 ">
          <article className="w-[100%] flex flex-wrap justify-center items-center gap-3 sm:gap-0 mt-0 md:mt-10 xl:mt-0">
            <SvgDesktop4 />
            <p className="w-[100%] flex justify-center text-white text-[1.1rem] lg:text-[1.5rem]">
              اطلاعات محل کسب
            </p>
          </article>

          <article className="w-[90%] lg:w-[80%]  flex flex-wrap justify-between gap-10 sm:gap-5 my-3">
            <div className="w-[100%] md:w-[48%] xl:w-[31%] flex justify-around flex-wrap gap-1">
              <p className="w-[100%] flex justify-start px-3 text-white text-[1rem] lg:text-[.9rem] mb-2">
                وضعیت ملک محل کسب :
              </p>
              <div className="w-[40%]">
                <CheckBoxAccordion2
                  label={"مالک"}
                  isChecked={activeCheckbox1 === 0}
                  onCheck={() => handleCheck1(0)}
                />
              </div>
              <div className="w-[40%]">
                <CheckBoxAccordion2
                  label={"سایر"}
                  isChecked={activeCheckbox1 === 1}
                  onCheck={() => handleCheck1(1)}
                />
              </div>
            </div>
            <div className="w-[100%] md:w-[48%] xl:w-[31%] grid sm:hidden">
              <div className=" w-full flex justify-center items-center flex-wrap h-[200px] gridArea">
                <div className="w-full h-[20%] bg-custom-gradient-3 rounded-full shadow-custom-6"></div>
              </div>
              <div className=" w-full flex flex-wrap h-[200px] gridArea select-none">
                <div className="w-[15%] h-full"></div>
                <div
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleMouseDown}
                  onTouchMove={handleMouseMove}
                  onTouchEnd={handleMouseUp}
                  className={`w-[35%] h-full ${cursor}`}
                >
                  <div
                    dir="ltr"
                    className="w-full h-[20%] flex px-2 justify-between text-white items-center opacity-20"
                  >
                    {convertToPersianNumber(b1)}
                  </div>
                  <div
                    dir="ltr"
                    className="w-full h-[20%] flex px-2 justify-between text-white items-center opacity-60"
                  >
                    {convertToPersianNumber(b2)}
                  </div>
                  <div
                    dir="ltr"
                    className="w-full h-[20%] flex px-2 justify-start gap-1 text-white items-center"
                  >
                    {convertToPersianNumber(b3)} <span>cm</span>
                  </div>
                  <div
                    dir="ltr"
                    className="w-full h-[20%] flex px-2 justify-between text-white items-center opacity-60"
                  >
                    {convertToPersianNumber(b4)}
                  </div>
                  <div
                    dir="ltr"
                    className="w-full h-[20%] flex px-2 justify-between text-white items-center opacity-20"
                  >
                    {convertToPersianNumber(b5)}
                  </div>
                </div>
                <div
                  onMouseDown={handleMouseDown2}
                  onMouseMove={handleMouseMove2}
                  onMouseUp={handleMouseUp2}
                  onTouchStart={handleMouseDown2}
                  onTouchMove={handleMouseMove2}
                  onTouchEnd={handleMouseUp2}
                  className={`w-[35%] h-full ${cursor}`}
                >
                  <div
                    dir="ltr"
                    className="w-full h-[20%] flex px-2 justify-between text-white items-center opacity-20"
                  >
                    {convertToPersianNumber(b6)}
                  </div>
                  <div
                    dir="ltr"
                    className="w-full h-[20%] flex px-2 justify-between text-white items-center opacity-60"
                  >
                    {convertToPersianNumber(b7)}
                  </div>
                  <div
                    dir="ltr"
                    className="w-full h-[20%] flex px-2 justify-start gap-1 text-white items-center"
                  >
                    {convertToPersianNumber(b8)} <span>m</span>
                  </div>
                  <div
                    dir="ltr"
                    className="w-full h-[20%] flex px-2 justify-between text-white items-center opacity-60"
                  >
                    {convertToPersianNumber(b9)}
                  </div>
                  <div
                    dir="ltr"
                    className="w-full h-[20%] flex px-2 justify-between text-white items-center opacity-20"
                  >
                    {convertToPersianNumber(b10)}
                  </div>
                </div>
                <div className="w-[15%] h-full flex justify-center items-center text-white">
                  <Icon icon="uil:arrow" className="rotate-90"></Icon>
                </div>
              </div>
            </div>
            <div className="w-[100%] md:w-[48%] xl:w-[31%] flex justify-around flex-wrap gap-1">
              <p className="w-[100%] flex justify-start px-3 text-white text-[1rem] lg:text-[.9rem] mb-2">
                نوع جواز :
              </p>
              <div className="w-[40%]">
                <CheckBoxAccordion2
                  label={"فاقد جواز"}
                  isChecked={activeCheckbox2 === 0}
                  onCheck={() => handleCheck2(0)}
                />
              </div>
              <div className="w-[40%]">
                <CheckBoxAccordion2
                  label={"جواز رسمی"}
                  isChecked={activeCheckbox2 === 1}
                  onCheck={() => handleCheck2(1)}
                />
              </div>
            </div>
            <div className="w-[100%] md:w-[48%] xl:w-[31%] flex justify-around flex-wrap gap-1">
              <p className="w-[100%] flex justify-start px-3 text-white text-[1rem] lg:text-[.9rem] mb-2">
                نوع کسب و کار :
              </p>
              <div className="w-[40%]">
                <CheckBoxAccordion2
                  label={"پخش عمده"}
                  isChecked={activeCheckbox3 === 0}
                  onCheck={() => handleCheck3(0)}
                />
              </div>
              <div className="w-[40%]">
                <CheckBoxAccordion2
                  label={"خرده فروشی"}
                  isChecked={activeCheckbox3 === 1}
                  onCheck={() => handleCheck3(1)}
                />
              </div>
            </div>

            <div className="w-[100%] md:w-[48%] hidden xl:w-[31%] px-3 sm:flex justify-around flex-wrap gap-1">
              <TextNumber
                placeholder={"اختیاری"}
                label={"متراژ محل کسب :"}
                svg={false}
                width={"w-[100%]"}
                max={11}
                data={laid}
                setData={setLaid}
                styleLabel={"text-[1.2rem] xl:text-[1rem] text-white"}
                styleInput={"text-[1rem] xl:text-[1rem] h-[40px] xl:h-[35px]"}
                styleError={setStyleError4}
                styleBox={"shadow-inner-custom bg-white"}
              />
            </div>
            <p className="w-full text-red-600 flex justify-center mt-4 text-[1.2rem]">
              {error}
            </p>
          </article>
          <article className="w-full flex justify-center flex-wrap gap-5">
            <div className="w-[90%] sm:w-[50%] lg:w-[90%]  flex flex-wrap justify-center ">
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
      </div>
    </>
  );
}

export default FirstStage4;
