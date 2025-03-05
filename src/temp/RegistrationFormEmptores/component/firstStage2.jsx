import { useCallback, useEffect, useState } from "react";
import WithSupport from "../../componentGeneral/withSupport.jsx";
import SvgDesktop2 from "../../componentGeneral/svg2/svg2.jsx";
import CheckBoxAccordion2 from "../../componentGeneral/input/checkBoxAccordion2.jsx";
import Button from "../../componentGeneral/button.jsx";
import { fetchGetAllBrand } from "../../data.js";
import { useSelector } from "react-redux";
import { categoryGetAll } from "../../context-data/basicDefinitions/ClassificationOfGoods.js";
import SelectAllInput from "../../adminPanel/componentGeneral/selectAll.jsx";
import SelectInput from "../../adminPanel/componentGeneral/select.jsx";
function FirstStage2({ setDataAll, setStyleLeft, styleLeft }) {
  const [select, setSelect] = useState([]);
  const [brandSelection, setBrandSelection] = useState(false);
  const [brand, setBrand] = useState();
  const [checked, setChecked] = useState(true);
  const [options, setOptions] = useState([{ key: "0", value: "" }]);
  const [options2, setOptions2] = useState([{ key: "0", value: "" }]);
  const [error, setError] = useState("");
  const [activeCheckbox, setActiveCheckbox] = useState(0);
  const chabk = useSelector((state) => state.product.chabk);
  const token = useSelector((state) => state.product.token);
  const loadMainCategory = useCallback(async () => {
    if (styleLeft == 100) {
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

  const loadMainCategory2 = useCallback(async () => {
    if (styleLeft == 100) {
      try {
        const provinces = await categoryGetAll(1, "", token, chabk);
        setOptions2(provinces.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    }
  }, [styleLeft]);

  useEffect(() => {
    loadMainCategory2();
  }, [loadMainCategory2]);

  const send = (e) => {
    e.preventDefault();
    setDataAll((prev) => ({
      ...prev,
      categoryIds: select,
      brandId: brand,
    }));
    setStyleLeft(200);
  };
  const handleCheck = (index) => {
    setActiveCheckbox(index === activeCheckbox ? null : index);
    index === activeCheckbox ? setChecked(false) : setChecked(true);
    if (activeCheckbox == 0) {
      setBrandSelection(true);
      //   setOptions('')
    } else if (activeCheckbox == 1) {
      setBrandSelection(false);
      setBrand("");
    }
  };

  return (
    <>
      <div
        style={{ display: styleLeft == 100 ? "flex" : "none" }}
        className="w-[100%] h-[100vh] flex xl:h-[75vh] justify-center overflow-y-auto xl:overflow-y-hidden px-3"
      >
        <div className="w-[100%]  flex flex-wrap justify-center content-between gap-10 py-16 xl:py-5 sm:py-5 px-3 ">
          <article className="w-[100%]  flex flex-wrap justify-center items-center gap-10 sm:gap-0 mt-0 md:mt-14 xl:mt-0">
            <SvgDesktop2 />
            <p className="w-[100%] flex justify-center text-white text-[1.1rem] lg:text-[1.2rem]">
              دوست دارید تامین کنندگان دست اول چه نوع کالاهایی را به شما معرفی
              کنیم:
            </p>
          </article>
          <article className="w-[100%] lg:w-[70%] xl:w-[50%] flex flex-wrap justify-center gap-10 lg:gap-0 xl:my-5">
          <div className="w-[90%] sm:w-[48%] flex-wrap flex justify-center content-center gap-2">
                          <p className="w-full text-white"> تعیین رسته کالایی :</p>
                             <SelectAllInput options={options2} setData={setSelect} hasError={false}/>
                          </div>
            <article className="w-[100%] sm:w-[48%] flex content-start justify-center flex-wrap gap-1 sm:gap-0 xl:gap-2">
              <div className="w-full flex justify-around flex-wrap gap-1">
                <p className="w-[100%] flex justify-center text-white text-[1rem] lg:text-[1rem] mb-2">
                  آیا تمایل دارید نمایندگی برند خاصی رو داشته باشد؟
                </p>
                <div className="w-[40%]">
                  <CheckBoxAccordion2
                    label={"خیر"}
                    isChecked={activeCheckbox === 0}
                    onCheck={() => handleCheck(0)}
                  />
                </div>
                <div className="w-[40%]">
                  <CheckBoxAccordion2
                    label={"بله"}
                    isChecked={activeCheckbox === 1}
                    onCheck={() => handleCheck(1)}
                  />
                </div>
                {brandSelection == true ? (
                  <p className="text-[1rem] text-red-600">
                    نوع برند را انتخاب کنید
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="w-[90%] flex-wrap flex justify-center content-center gap-2">
                          <p className="w-full text-white"> برند ها :</p>
                             <SelectInput options={options} setData={setBrand} hasError={false} isDisabled={!brandSelection}/>
                          </div>
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

export default FirstStage2;
