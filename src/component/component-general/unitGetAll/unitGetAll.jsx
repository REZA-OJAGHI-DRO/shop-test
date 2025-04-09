import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { GetAllUnit } from "@/function/getUnit/getUnit";
import Select from "@/component/component-general/input/select";
function UnitGetAll({
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

  const GetUnit = useCallback(() => {
    GetAllUnit(token, chabk, setMessageData, setCheckData, (data) => {
      setOptions(data);
      setCheckDataAll((r) => ({ ...r, check5: true }));
    });
  }, [token, chabk]);
  const isFirstRender3 = useRef(true);
  useEffect(() => {
    if (isFirstRender3.current) {
      GetUnit();
      isFirstRender3.current = false;
    }
  }, [GetUnit]);
  return (
    <>
      <Select
        label={"* واحد کالا :"}
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

export default UnitGetAll;
