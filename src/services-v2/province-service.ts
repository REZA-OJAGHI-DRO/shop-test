import api from "@/services-v2/api";
import { ApiResponse } from "@/types/common-types";
import {
  ProvinceType,
  GetAllProvincesRequestType,
} from "@/types/province-types";

const provinceService = {
  getAll: async (
    params: GetAllProvincesRequestType
  ): Promise<ApiResponse<ProvinceType[]>> =>
    api.post("/Place/Province/GetAll", params),
};

export default provinceService;
