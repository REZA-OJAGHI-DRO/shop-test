import api from "@/services-v2/api";
import {
  ChequeInquiryRequestType,
  ChequeAddReceivedChequeRequestType,
  ChequeInquiryForAddReceivedChequeResponseType,
  ChequeGetListFiltersType,
  ChequeGetReceivedChequesResponseType,
  ChequeAcceptanceRequestType,
  ChequePayChequeRequestType,
  ChequeGetResponseType,
  ChequeAddIssuedChequeRequestType,
  ChequeInquiryForAddIssuedChequeResponseType,
} from "@/types/cheque-types";

import {
  ApiResponse,
  PaginatedDataRequestType,
  PaginatedResponse,
} from "@/types/common-types";

const chequeService = {
  inquiryForAddReceivedCheque: async (
    params: ChequeInquiryRequestType
  ): Promise<ApiResponse<ChequeInquiryForAddReceivedChequeResponseType>> =>
    api.post("/Financial/Cheque/InquiryForAddReceivedCheque", params),

  inquiryForAddIssuedCheque: async (
    params: ChequeInquiryRequestType
  ): Promise<ApiResponse<ChequeInquiryForAddIssuedChequeResponseType>> =>
    api.post("/Financial/Cheque/InquiryForAddIssuedCheque", params),

  addReceivedCheque: async (
    params: ChequeAddReceivedChequeRequestType
  ): Promise<ApiResponse<undefined>> =>
    api.post("/Financial/Cheque/AddReceivedCheque", params),

  getReceivedCheques: async (
    params: PaginatedDataRequestType<ChequeGetListFiltersType>
  ): Promise<
    ApiResponse<PaginatedResponse<ChequeGetReceivedChequesResponseType[]>>
  > => api.post("/Financial/Cheque/GetReceivedCheques", params),

  addIssuedCheque: async (
    params: ChequeAddIssuedChequeRequestType
  ): Promise<ApiResponse<ChequeInquiryForAddReceivedChequeResponseType>> =>
    api.post("/Financial/Cheque/AddIssuedCheque", params),

  getIssuedCheques: async (
    params: PaginatedDataRequestType<ChequeGetListFiltersType>
  ): Promise<
    ApiResponse<PaginatedResponse<ChequeGetReceivedChequesResponseType[]>>
  > => api.post("/Financial/Cheque/GetIssuedCheques", params),

  acceptance: async (
    params: ChequeAcceptanceRequestType
  ): Promise<ApiResponse<undefined>> =>
    api.post("/Financial/Cheque/Acceptance", params),

  payCheque: async (
    params: ChequePayChequeRequestType
  ): Promise<ApiResponse<undefined>> =>
    api.post("/Financial/Cheque/PayCheque", params),

  get: async (params: {
    id: string;
  }): Promise<ApiResponse<ChequeGetResponseType>> =>
    api.post("/Financial/Cheque/Get", params),
};

export default chequeService;
