import React, { useCallback, useEffect, useState } from "react";
import { fetchProvinces, cityData } from "@/data.js";
import { useSelector } from "react-redux";
import SelectInput from "@/component/component-general/select.jsx";
function City({
  dataCityId,
  setDataCityId,
  dataCityId2,
  setDataCityId2,
  selectedProvinceData,
  selectedCityData,
  styleError,
  isDisabled,
  styleLabel,
}) {
  const token = useSelector((state) => state.product.token);
  const chabk = useSelector((state) => state.product.chabk);
  
  const [options, setOptions] = useState([{ key: "0", value: "استان" }]);
  const [options2, setOptions2] = useState([{ key: "0", value: "ابتدا استان را انتخاب کنید" }]);

  const loadProvinces = useCallback(async () => {
    try {
      const provinces = await fetchProvinces(token, chabk);
      if (Array.isArray(provinces)) {
        setOptions(provinces);
      }
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  }, [chabk, token]);

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
          console.error("Error fetching cities:", error);
        }
      }
      fetchData();
    }
  }, [dataCityId, chabk, token]);

  return (
    <div className="w-full flex flex-wrap justify-between content-center">

      <div className="w-[100%] sm:w-[48%] flex-wrap h-[100px] flex justify-center content-center gap-2">
        <p className={`${styleLabel} w-full`}><span className="text-red-500">*</span> استان :</p>
        <SelectInput options={options} data={selectedProvinceData} setData={setDataCityId} hasError={styleError} isDisabled={isDisabled}/>
      </div>

      <div className="w-[100%] sm:w-[48%] flex-wrap h-[100px] flex justify-center content-center gap-2">
        <p className={`${styleLabel} w-full`}><span className="text-red-500">*</span> شهر :</p>
        <SelectInput options={options2} data={selectedCityData}  setData={setDataCityId2} hasError={styleError} isDisabled={isDisabled}/>
      </div>

    </div>
  );
}

export default City;
