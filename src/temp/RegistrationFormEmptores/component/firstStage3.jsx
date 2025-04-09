import { useCallback, useEffect, useState } from "react";
import WithSupport from "../../componentGeneral/withSupport.jsx";
import SvgDesktop3 from "../../componentGeneral/svg2/svg3.jsx";
import TextNumber from "../../componentGeneral/input/textNumber.jsx";
import TextArea from "../../componentGeneral/input/textArea.jsx";
import Button from "../../componentGeneral/button.jsx";
import { fetchProvinces, cityData } from "../../data.js";
import { useSelector } from "react-redux";
import City from "../../componentGeneral/city/city.jsx";
function FirstStage3({ setDataAll, setStyleLeft, styleLeft }) {
  const [checked, setChecked] = useState(true);
  const [options, setOptions] = useState([{ key: "0", value: "استان" }]);
  const [options2, setOptions2] = useState([{ key: "0", value: "شهر" }]);
  const [dataCityId, setDataCityId] = useState("");
  const [dataCityId2, setDataCityId2] = useState("");
  const [dataAddress, setDataAddress] = useState("");
  const [dataCode, setDataCode] = useState("");
  const [error, setError] = useState("");
  const [styleError1, setStyleError1] = useState(false);
  const [styleError2, setStyleError2] = useState(false);
  const [styleError3, setStyleError3] = useState(false);
  const [styleError4, setStyleError4] = useState(false);
  const chabk = useSelector((state) => state.product.chabk);
  const token = useSelector((state) => state.product.token);

  const loadProvinces = useCallback(async () => {
    if (styleLeft == 200) {
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

  const send = (e) => {
    e.preventDefault();
    setStyleError1(false);
    setStyleError2(false);
    setStyleError3(false);
    setStyleError4(false);

    let hasError = false;

    if (dataCityId == null || dataCityId == "") {
      setError("لطفا استان را انتخاب کنید !");
      setStyleError1(true);
      hasError = true;
    }
    if (dataCityId2 == null || dataCityId2 == "") {
      setError("لطفا شهر را انتخاب کنید !");
      setStyleError2(true);
      hasError = true;
    }
    if (dataAddress == "") {
      setError("لطفا ادرس را وارد کنید !");
      setStyleError3(true);
      hasError = true;
    }
    if (dataCode == "") {
      setError("لطفا کد پستی را وارد کنید !");
      setStyleError4(true);
      hasError = true;
    }
    if (!hasError) {
      setStyleLeft(300);
      setDataAll((prev) => ({
        ...prev,
        cityId: dataCityId2,
        address: dataAddress,
        postalCode: dataCode,
      }));
    }
  };

  return (
    <>
      <div
        style={{ display: styleLeft == 200 ? "flex" : "none" }}
        className="w-[100%] h-[100vh] flex xl:h-[75vh] justify-center overflow-y-auto xl:overflow-y-hidden px-3"
      >
        <div className="w-[90%] flex flex-wrap justify-center content-between gap-10 py-16 xl:py-5 sm:py-5 px-3">
          <article className="w-[100%] h-[50px]  flex flex-wrap justify-center items-center gap-10 sm:gap-0 mt-0 md:mt-10 xl:mt-0">
            <SvgDesktop3 />
            <p className="w-[100%]  flex justify-center text-white text-[1.5rem] lg:text-[1.5rem]">
              آدرس
            </p>
          </article>
          <article className="w-[100%] lg:w-[60%] flex flex-wrap justify-center gap-3">
            <article className="w-[100%] sm:w-[65%] flex content-between justify-between flex-wrap gap-1 sm:gap-0 xl:gap-0">
            <City
              dataCityId={dataCityId}
              setDataCityId={setDataCityId}
              dataCityId2={dataCityId2}
              setDataCityId2={setDataCityId2}
              selectedProvinceData={''}
              selectedCityData={''}
              styleError={styleError1}
              isDisabled={false}
              styleLabel={"text-[1.2rem] xl:text-[1rem] text-white"}     
            />
              <TextArea
                label={""}
                width={"w-[100%] flex h-[100px]"}
                placeholder={"جزئیات آدرس را وارد کنید"}
                checked={checked}
                data={dataAddress}
                setData={setDataAddress}
                styleError={styleError3}
              />
            </article>
            <article className="w-[100%] sm:w-[30%] flex content-between justify-between flex-wrap gap-1 sm:gap-0 xl:gap-0">
              <TextNumber
                placeholder={"کد پستی را وارد کنید"}
                label={"* کد پستی :"}
                svg={false}
                width={"w-[100%] mt-7"}
                max={10}
                data={dataCode}
                setData={setDataCode}
                styleLabel={"text-[1.2rem] xl:text-[1rem] text-white"}
                styleInput={"text-[1rem] xl:text-[1rem] h-[35px] xl:h-[35px]"}
                styleError={styleError4}
                styleBox={"shadow-inner-custom bg-white"}
              />
            </article>
            <p className="w-full text-red-600 flex justify-center mt-4 text-[1.2rem]">
              {error}
            </p>
          </article>
          <article className="w-[90%] sm:w-[50%] lg:w-[90%] flex flex-wrap gap-4 content-center justify-center mb-0 sm:mb-5">
            <div className="lg:w-[100%] w-[90%] flex flex-wrap justify-center mb-1">
              <Button
                value={"مرحله بعد"}
                click={() => send(event)}
                styleButton={4}
              />
            </div>
            <div className="w-full flex justify-center items-center mb-3 lg:mb-0">
              <WithSupport />
            </div>
          </article>
        </div>
      </div>
    </>
  );
}

export default FirstStage3;
