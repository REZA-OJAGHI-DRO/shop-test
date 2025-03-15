import api from "@/services-v2/api";
import {
  BrandFiltersType,
  BrandGetAllResponseType,
  BrandGetListResponseType,
  BrandGetResponseType,
} from "@/types/brand-types";
import {
  ApiResponse,
  PaginatedDataRequestType,
  PaginatedResponse,
} from "@/types/common-types";

const brandService = {
  getAll: async (): Promise<ApiResponse<BrandGetAllResponseType[]>> =>
    api.post("/Product/Brand/GetAll", {}),

  getList: async (
    params: PaginatedDataRequestType<BrandFiltersType>
  ): Promise<ApiResponse<PaginatedResponse<BrandGetListResponseType[]>>> =>
    api.post("/Product/Brand/GetList", params),

  get: async (params: {
    id: string;
  }): Promise<ApiResponse<BrandGetResponseType>> =>
    api.post("/Product/Brand/Get", params),

};

export default brandService;
