import api from "@/services-v2/api";
import {
  bankAccountCreateRequestType,
  bankAccountGetListFiltersType,
  BankAccountGetListResponseType,
} from "@/types/bank-account-types";
import { BankGetAllResponseType } from "@/types/bank-types";
import {
  ApiResponse,
  PaginatedDataRequestType,
  PaginatedResponse,
} from "@/types/common-types";

const bankAccountService = {
  create: async (
    params: bankAccountCreateRequestType
  ): Promise<ApiResponse<undefined>> =>
    api.post("/Financial/BankAccount/Create", params),

  getList: async (
    params: PaginatedDataRequestType<bankAccountGetListFiltersType>
  ): Promise<
    ApiResponse<PaginatedResponse<BankAccountGetListResponseType[]>>
  > => api.post("/Financial/BankAccount/GetList", params),
};

export default bankAccountService;
