import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { PackageTypeGetAllData } from "@/function/packageTypeGetAll/packageTypeGetAll";
import Select from "@/component/component-general/input/select";
function PackageTypeGetAll({
  data,
  setData,
  styleError,
  setMessageData,
  setCheckData,
  setCheckDataAll
}) {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);

  const [options, setOptions] = useState([{ key: "", value: "" }]);

  const PackageTypeGet = useCallback(() => {
    PackageTypeGetAllData(
      token,
      chabk,
      setMessageData,
      setCheckData,
      (data) => {
        setOptions(data);
        setCheckDataAll((r) => ({ ...r, check4: true }));
      }
    );
  }, [token, chabk]);
  const isFirstRender4 = useRef(true);
  useEffect(() => {
    if (isFirstRender4.current) {
      PackageTypeGet();
      isFirstRender4.current = false;
    }
  }, [PackageTypeGet]);
  return (
    <>
      <Select
        label={"* نوع بسته بندی کالا :"}
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

export default PackageTypeGetAll;
