import api from "@/services-v2/api";
import { CityType, GetCityByProvinceIdRequestType } from "@/types/city-types";
import { ApiResponse } from "@/types/common-types";

const cityService = {
  getByProvinceId: async (
    params: GetCityByProvinceIdRequestType
  ): Promise<ApiResponse<CityType[]>> =>
    api.post("/Place/City/GetByProvinceId", params),
};

export default cityService;
