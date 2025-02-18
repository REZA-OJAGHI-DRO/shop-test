import "@/App.css";
import "@/index.css";
import {
  React,
  useCallback,
  useEffect,
  useState,
  Button,
  SelectAllInput,
  TextArea,
  CheckBox,
  WithSupport,
  SvgDesktop3,
  fetchGetAllBrand,
  useSelector,
} from '@/component/login-registration-supplier/import-login-registration-supplier'

function FirstStage3({ setDataAll, styleLeft, setStyleLeft }) {
  const [data1, setData1] = useState(false);
  const [data2, setData2] = useState(false);
  const [data3, setData3] = useState(false);
  const [checkedOpen1, setCheckedOpen1] = useState(true);
  const [checkedOpen2, setCheckedOpen2] = useState(true);
  const [checkedOpen3, setCheckedOpen3] = useState(true);

  const [produce, setProduce] = useState([]);
  const [importData, setImportData] = useState([]);
  const [spreader, setSpreader] = useState([]);
  const [importDescription, setImportDescription] = useState("");
  const [produceDescription, setProduceDescription] = useState("");
  const [spreaderDescription, setSpreaderDescription] = useState("");
  const [options, setOptions] = useState([{ key: "0", value: "" }]);
  const [error, setError] = useState("");
  const chabk = useSelector((state) => state.product.chabk);
  const token = useSelector((state) => state.product.token);
  const loadMainCategory = useCallback(async () => {
    if (styleLeft == 200) {
      try {
        const provinces = await fetchGetAllBrand({ token, chabk });
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
    loadMainCategory();
  }, [loadMainCategory]);

  useEffect(() => {
    if (data1 == false) {
      setProduce([]);
      setProduceDescription("");
    }
  }, [data1]);

  useEffect(() => {
    if (data2 == false) {
      setImportData([]);
      setImportDescription("");
    }
  }, [data2]);

  useEffect(() => {
    if (data3 == false) {
      setSpreader([]);
      setSpreaderDescription("");
    }
  }, [data3]);

  const send = (e) => {
    e.preventDefault();
    if (data1 == true || data2 == true || data3 == true) {
      setStyleLeft(300);

      setDataAll((prev) => ({
        ...prev,
        import: data2 == true ? importData : [],
        produce: data1 == true ? produce : [],
        spreader: data3 == true ? spreader : [],
        hasImport: data2,
        hasProduce: data1,
        hasSpread: data3,
        importDescription: data2 == true ? importDescription : "",
        produceDescription: data1 == true ? produceDescription : "",
        spreaderDescription: data3 == true ? spreaderDescription : "",
      }));
    } else {
      setError("لطفا یک مورد را انتخاب کنید");
    }
  };

  return (
    <>
      <style>
        {`
      .boxFilter{
      background:rgba(218, 218, 218, 0.2);
      backdrop-filter:blur(10px);
      }
      `}
      </style>
      <div
        style={{ display: styleLeft == 200 ? "flex" : "none" }}
        className="w-[100vw] xl:w-[100vw] h-[100vh] xl:h-[75vh] relative flex justify-center overflow-y-auto lg:overflow-y-hidden"
      >
        <div className="w-[90%] flex flex-wrap justify-center content-between  gap-1 py-10 xl:py-5 sm:py-3 px-3 ">
          <div className="w-full flex flex-wrap justify-center gap-5 xl:gap-1">
            <article className="w-[90%] gap-4 flex flex-wrap justify-center items-center">
              <SvgDesktop3 />
              <p className="w-[100%] flex justify-center text-white text-[1.1rem] lg:text-[2rem]">
                نوع فعالیت
              </p>
            </article>
            <article
              className={`w-full lg:w-[80%] flex flex-wrap lg:flex-nowrap  justify-between gap-5 px-2 overflow-hidden rounded-2xl `}
            >
              <div className="w-full lg:w-[33%] overflow-hidden rounded-2xl">
                <div
                  dir="ltr"
                  className={`w-[100%] px-2 py-1 flex flex-wrap gap-1 overflow-y-auto myElement ${
                    data1 == true ? "boxFilter border-2" : ""
                  } rounded-2xl`}
                >
                  <div dir="rtl" className="w-full">
                    <CheckBox
                      setDate={setData1}
                      label={"تولید کننده ابزار"}
                      setCheckedOpen={setCheckedOpen1}
                    />
                  </div>
                  <div
                    style={{ display: data1 == true ? "flex" : "none" }}
                    dir="rtl"
                    className="w-full flex h-full flex-wrap justify-center gap-3 content-between"
                  >
                       <div className="w-[100%] flex-wrap flex justify-center content-center gap-2">
                          <p className="w-full text-white"> انتخاب برند تولیدی :</p>
                             <SelectAllInput options={options} setData={setProduce} hasError={false}/>
                          </div>
                    <TextArea
                      label={""}
                      width={"w-[100%] h-[70px]"}
                      placeholder={"توضیحات خورد را وارد کنید"}
                      checked={true}
                      data={produceDescription}
                      setData={setProduceDescription}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[33%] overflow-hidden rounded-2xl">
                <div
                  dir="ltr"
                  className={`w-[100%] px-2 py-1 flex flex-wrap gap-1 overflow-y-auto myElement ${
                    data2 == true ? "boxFilter border-2" : ""
                  } rounded-2xl`}
                >
                  <div dir="rtl" className="w-full">
                    <CheckBox
                      setDate={setData2}
                      label={"وارد کننده ابزار"}
                      setCheckedOpen={setCheckedOpen2}
                    />
                  </div>
                  <div
                    style={{ display: data2 == true ? "flex" : "none" }}
                    dir="rtl"
                    className="w-full h-full flex gap-3 flex-wrap justify-center content-around"
                  >
                      <div className="w-[100%] flex-wrap flex justify-center content-center gap-2">
                          <p className="w-full text-white"> برند وارداتی :</p>
                             <SelectAllInput options={options} setData={setImportData} hasError={false}/>
                          </div>
                    <TextArea
                      label={""}
                      width={"w-[100%]  h-[70px]"}
                      placeholder={
                        "اگر برندی را انحصاری پخش میکنید و یا هر توضیح دیگر را اینجا وارد کنید"
                      }
                      checked={true}
                      data={importDescription}
                      setData={setImportDescription}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[33%] overflow-hidden rounded-2xl">
                <div
                  dir="ltr"
                  className={`w-[100%] px-2 py-1 flex flex-wrap gap-1 overflow-y-auto myElement ${
                    data3 == true ? "boxFilter border-2" : ""
                  } rounded-2xl`}
                >
                  <div dir="rtl" className="w-full">
                    <CheckBox
                      setDate={setData3}
                      label={"پخش کننده ابزار"}
                      setCheckedOpen={setCheckedOpen3}
                    />
                  </div>
                  <div
                    style={{ display: data3 == true ? "flex" : "none" }}
                    dir="rtl"
                    className="w-full h-full flex gap-3 flex-wrap justify-center content-around"
                  >
                      <div className="w-[100%] flex-wrap flex justify-center content-center gap-2">
                          <p className="w-full text-white"> انتخاب برند تولیدی :</p>
                             <SelectAllInput options={options} setData={setSpreader} hasError={false}/>
                          </div>
                    <div className="w-[100%]  flex flex-wrap content-between justify-center gap-2">
                      <TextArea
                        label={""}
                        width={"w-[100%] h-[70px]"}
                        placeholder={
                          "اگر برندی را انحصاری پخش میکنید و یا هر توضیح دیگر را اینجا وارد کنید"
                        }
                        checked={true}
                        data={spreaderDescription}
                        setData={setSpreaderDescription}
                        styleTextarea={"text-[.8rem]"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div className="w-[90%] flex flex-wrap justify-center gap-4 xl:gap-2">
            <div className="w-full  flex flex-wrap justify-center">
              <p className="w-full py-4 flex justify-center text-[1.1rem] text-red-600">
                {error}
              </p>
              <Button
                value={"مرحله بعد"}
                click={() => send(event)}
                styleButton={4}
              />
            </div>
            <div className="w-full  mb-1 flex justify-center items-center">
              <WithSupport />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FirstStage3;
