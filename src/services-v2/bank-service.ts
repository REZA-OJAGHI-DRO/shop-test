import api from "@/services-v2/api";
import {
  BankGetAllResponseType,
  BankGetListFiltersType,
  BankGetListResponseType,
} from "@/types/bank-types";
import {
  ApiResponse,
  PaginatedDataRequestType,
  PaginatedResponse,
} from "@/types/common-types";

const bankService = {
  getList: async (
    params: PaginatedDataRequestType<BankGetListFiltersType>
  ): Promise<ApiResponse<PaginatedResponse<BankGetListResponseType[]>>> =>
    api.post("/Financial/Bank/GetList", params),

  getAll: async (): Promise<ApiResponse<BankGetAllResponseType[]>> =>
    api.post("/Financial/Bank/GetAll", {}),
};

export default bankService;
