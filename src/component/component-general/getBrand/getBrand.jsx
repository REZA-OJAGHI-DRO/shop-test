import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { GetAllBrand } from "../../../function/getAllBrand/getAllBrand.js";
import Select from "../input/select.js";

function GetBrandAll({
  data,
  setData,
  styleError,
  setMessageData,
  setCheckData,
  setCheckDataAll,
}) {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const [options, setOptions] = useState([{ key: "", value: "" }]);

  const GetBrand = useCallback(() => {
    GetAllBrand(token, chabk, setMessageData, setCheckData, (data) => {
      setOptions(data);
      setCheckDataAll((r) => ({ ...r, check3: true }));
    });
  }, [token, chabk]);
  const isFirstRender2 = useRef(true);
  useEffect(() => {
    if (isFirstRender2.current) {
      GetBrand();
      isFirstRender2.current = false;
    }
  }, [GetBrand]);
  return (
    <>
      <Select
        label={"برند کالا :"}
        svg={true}
        width={"w-[100%]"}
        options={options}
        data={data}
        setData={setData}
        styleLabel={"text-[1.2rem] xl:text-[1rem] text-black"}
        styleInput={"h-[35px] xl:h-[35px] text-[1rem] xl:text-[1rem] "}
        styleError={styleError}
        styleBox={"bg-[#ffffff]"}
      />
    </>
  );
}

export default GetBrandAll;
