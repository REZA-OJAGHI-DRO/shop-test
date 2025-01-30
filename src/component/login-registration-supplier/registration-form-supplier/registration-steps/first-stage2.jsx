import {
  React,
  useCallback,
  useEffect,
  useState,
  Button,
  TextArea,
  City,
  WithSupport,
  SvgDesktop2,
  useSelector,
  fetchProvinces,
  cityData
} from '@/component/login-registration-supplier/import-login-registration-supplier'

function FirstStage2({ setDataAll, styleLeft, setStyleLeft }) {
  const [checked, setChecked] = useState(true);
  const [options, setOptions] = useState([{ key: "0", value: "استان" }]);
  const [options2, setOptions2] = useState([{ key: "0", value: "شهر" }]);
  const [dataCityId, setDataCityId] = useState(null);
  const [dataCityId2, setDataCityId2] = useState(null);
  const [dataAddress, setDataAddress] = useState("");
  const [error, setError] = useState("");
  const [styleError1, setStyleError1] = useState(false);
  const [styleError2, setStyleError2] = useState(false);
  const [styleError3, setStyleError3] = useState(false);
  const chabk = useSelector((state) => state.product.chabk);
  const token = useSelector((state) => state.product.token);
  const loadProvinces = useCallback(async () => {
    if (styleLeft == 100) {
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

    if (dataCityId == null || dataCityId == "") {
      setError("لطفا استان را انتخاب کنید !");
      setStyleError1(true);
      return;
    }

    if (dataCityId2 == null || dataCityId2 == "") {
      setError("لطفا شهر را انتخاب کنید !");
      setStyleError2(true);
      return;
    }

    if (dataAddress == "") {
      setError("لطفا آدرس را وارد کنید !");
      setStyleError3(true);
      return;
    }

    setStyleLeft(200);
    setDataAll((prev) => ({
      ...prev,
      cityId: dataCityId2,
      address: dataAddress,
    }));
  };

  return (
    <>
      <div
        style={{ display: styleLeft == 100 ? "flex" : "none" }}
        className="w-[100vw] xl:w-[100vw] h-[100vh] xl:h-[75vh] overflow-hidden flex flex-wrap justify-center overflow-y-auto xl:overflow-y-hidden px-3"
      >
        <div className="w-[90%] flex flex-wrap justify-center content-between  gap-1 py-10 xl:py-5 sm:py-3 px-3 ">
          <article className="w-[90%] gap-4 flex flex-wrap justify-center items-center">
            <SvgDesktop2 />
            <p className="w-[100%] flex justify-center text-white text-[1.5rem] lg:text-[2.5rem]">
              آدرس
            </p>
          </article>
          <article className="w-[90%] sm:w-[60%] flex flex-wrap justify-between">
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
            <p className="w-full text-red-600 flex justify-center text-[1.2rem]">
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
            <div className="w-full flex justify-center">
              <WithSupport />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FirstStage2;
