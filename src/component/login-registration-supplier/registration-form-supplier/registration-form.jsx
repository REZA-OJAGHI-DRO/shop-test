import img1 from "/img/bg-2.webp";
import img2 from "/img/Android Large-3.webp";
import img3 from "/img/head-1.webp";
import FirstStage2 from "./registration-steps/first-stage2.jsx";
import FirstStage3 from "./registration-steps/first-stage3.jsx";
import FirstStage4 from "./registration-steps/first-stage4.jsx";
import FirstStage1 from "./registration-steps/first-stage1.jsx";
import FinalRegistration from "./registration-steps/final-registration.jsx";
import "@/index.css";
import {
  React,
  useState,
} from '@/component/login-registration-supplier/import-login-registration-supplier'

function RegistrationForm() {
  const [stage5, setStage5] = useState(true);
  const [styleLeft, setStyleLeft] = useState(0);
  const [dataAll, setDataAll] = useState({
    name: "",
    dataLastName: "",
    phone: "",
    mobile: "",
    mobile2: "",
    mobile3: "",
    description: "",
    cityId: "",
    address: "",
    categoryIds: [],
    import: [],
    produce: [],
    spreader: [],
    isPerson: true,
    importDescription: "",
    produceDescription: "",
    spreaderDescription: "",
    hasImport: true,
    hasProduce: true,
    hasSpread: true,
    installments: true,
    installmentsDays: 0,
    cash: true,
    cashDays: 0,
    preOrder: true,
    nationalId: "",
    attachments: [],
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
    }
  }

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
            stage5 == false ? "hidden h-0" : "hidden xl:flex h-[25%]"
          } w-full  absolute top-[0%]  justify-center items-center rounded-3xl `}
        >
          <div className="w-full absolute top-0 h-full flex items-center justify-center">
            <img src={img3} alt="" className="rounded-3xl w-[50%] h-[130px]" />
          </div>
          <div className="w-full absolute top-0 flex justify-end px-16 py-4">
            <button
              onClick={() => clickBack(event)}
              className={`px-5 py-4 ${
                styleLeft == 0 ? "hidden" : "flex"
              } text-white text-[1.5rem] gap-3 justify-center items-center group`}
            >
              بازگشت
              <i className="bi bi-chevron-left group-hover:-translate-x-3 transition-all duration-300"></i>
            </button>
          </div>
        </figure>
        <article
          className={`${
            stage5 == true ? "hidden" : "flex"
          } w-full h-full  absolute top-0 `}
        >
          <FinalRegistration stage5={stage5} />
        </article>
        <article
          // style={{left:-styleLeft+'vw'}}
          className={`${
            stage5 == true ? "flex" : "hidden"
          } w-[100%] h-[100%] xl:h-[75%] xl:top-[25%]  absolute top-0 transition-all duration-300`}
        >
          <FirstStage4
            setDataAll={setDataAll}
            stage5={stage5}
            setStage5={setStage5}
            dataAll={dataAll}
            styleLeft={styleLeft}
            setStyleLeft={setStyleLeft}
          />
          <FirstStage3
            setDataAll={setDataAll}
            setStyleLeft={setStyleLeft}
            styleLeft={styleLeft}
          />
          <FirstStage2
            setDataAll={setDataAll}
            styleLeft={styleLeft}
            setStyleLeft={setStyleLeft}
          />
          <FirstStage1
            setDataAll={setDataAll}
            styleLeft={styleLeft}
            setStyleLeft={setStyleLeft}
          />
        </article>
      </section>
    </main>
  );
}

export default RegistrationForm;
