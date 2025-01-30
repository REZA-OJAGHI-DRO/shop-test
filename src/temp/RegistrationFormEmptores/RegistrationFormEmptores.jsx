import React from "react";
import { useState } from "react";
import img1 from "/img/bg-2.webp";
import img2 from "/img/Android Large-3.webp";
import img3 from "/img/head-1.webp";
import FirstStage1 from "./component/firstStage1.js";
import FirstStage2 from "./component/firstStage2.js";
import FirstStage3 from "./component/firstStage3.js";
import FirstStage4 from "./component/firstStage4.js";
import FirstStage5 from "./component/firstStage5.js";
import FirstStage6 from "./component/firstStage6.js";
import FinalRegistration from "./component/finalRegistration.js";
import { Icon } from "@iconify/react";
import "../index.css";
function RegistrationFormEmptores() {
  const [stage1, setStage1] = useState(true);
  const [stage2, setStage2] = useState(true);
  const [stage3, setStage3] = useState(true);
  const [stage4, setStage4] = useState(true);
  const [stage5, setStage5] = useState(true);
  const [stage6, setStage6] = useState(true);
  const [stage7, setStage7] = useState(true);
  const [styleLeft, setStyleLeft] = useState(0);
  const [dataAll, setDataAll] = useState({
    name: "",
    mobile: "",
    phone: "",
    nationCode: "",
    categoryIds: [],
    brandId: 1,
    cityId: 1,
    postalCode: "",
    address: "",
    isRent: true,
    hasLicense: true,
    shoppingType: "",
    shopArea: "",
    licenseImage: "",
    bannerImage: "",
    docOrRentImage: "",
    friends: [],
  });

  function clickBack(e) {
    if (styleLeft == 100) {
      setStyleLeft(0);
    } else if (styleLeft == 200) {
      setStyleLeft(100);
    } else if (styleLeft == 300) {
      setStyleLeft(200);
    } else if (styleLeft == 400) {
      setStyleLeft(300);
    } else if (styleLeft == 500) {
      setStyleLeft(400);
    } else if (styleLeft == 600) {
      setStyleLeft(500);
    }
  }
  console.log(dataAll);

  return (
    <main
      className="w-[100%] h-[100vh] relative flex justify-center overflow-hidden"
      style={{ fontFamily: "MyCustomFont" }}
    >
      <section className="w-full h-full absolute top-0 ">
        <figure className="w-full h-full hidden md:flex">
          <img src={img1} alt="" className="w-[100%] h-full" />
        </figure>
        <figure className="w-full h-full flex md:hidden">
          <img src={img2} alt="" className="w-[100%] h-full " />
        </figure>
      </section>
      <section className="w-full h-full absolute top-0  2xl:container flex justify-center items-center">
        <figure
          className={`${
            stage7 == false ? "hidden h-0" : "flex lg:h-[25%]"
          } w-full  absolute top-[0%]  justify-center items-center rounded-3xl `}
        >
          <div className="w-full absolute top-0 h-full hidden xl:flex items-center justify-center">
            <img src={img3} alt="" className="rounded-3xl w-[55%] h-[130px]" />
          </div>
          <div className="w-full absolute top-0 flex justify-end  md:px-16 py-4">
            <button
              onClick={() => clickBack(event)}
              className="px-5 py-1 lg:py-4 flex z-50 text-white text-[1rem] lg:text-[1.5rem] gap-3 justify-center items-center group"
            >
              بازگشت
              <Icon
                icon="akar-icons:arrow-back"
                className="flex xl:hidden group-hover:-translate-x-1 transition-all duration-300"
              ></Icon>
              <i className="bi bi-chevron-left hidden xl:flex group-hover:-translate-x-3 transition-all duration-300"></i>
            </button>
          </div>
        </figure>
        <article
          className={`${
            stage7 == true ? "hidden" : "flex"
          } w-full h-full  absolute top-0 `}
        >
          <FinalRegistration stage7={stage7} />
        </article>
        <article
          // style={{ left: -styleLeft + "%" }}
          className={`${
            stage7 == true ? "flex" : "hidden"
          } w-[100%] h-[100%] xl:h-[75%] xl:top-[25%] flex justify-end absolute top-0  transition-all duration-300`}
        >
          <FirstStage6
            dataAll={dataAll}
            setDataAll={setDataAll}
            stage6={stage6}
            setStage6={setStage6}
            stage7={stage7}
            setStage7={setStage7}
            setStyleLeft={setStyleLeft}
            styleLeft={styleLeft}
          />
          <FirstStage5
            setDataAll={setDataAll}
            stage5={stage5}
            setStage5={setStage5}
            stage6={stage6}
            setStage6={setStage6}
            setStyleLeft={setStyleLeft}
            styleLeft={styleLeft}
          />
          <FirstStage4
            setDataAll={setDataAll}
            stage4={stage4}
            setStage4={setStage4}
            stage5={stage5}
            setStage5={setStage5}
            setStyleLeft={setStyleLeft}
            styleLeft={styleLeft}
          />
          <FirstStage3
            setDataAll={setDataAll}
            stage3={stage3}
            setStage3={setStage3}
            setStage4={setStage4}
            setStyleLeft={setStyleLeft}
            styleLeft={styleLeft}
          />
          <FirstStage2
            setDataAll={setDataAll}
            stage2={stage2}
            setStage2={setStage2}
            setStage3={setStage3}
            setStyleLeft={setStyleLeft}
            styleLeft={styleLeft}
          />
          <FirstStage1
            dataAll={dataAll}
            setDataAll={setDataAll}
            stage1={stage1}
            setStage1={setStage1}
            setStage2={setStage2}
            setStyleLeft={setStyleLeft}
            styleLeft={styleLeft}
          />
        </article>
      </section>
    </main>
  );
}

export default RegistrationFormEmptores;
