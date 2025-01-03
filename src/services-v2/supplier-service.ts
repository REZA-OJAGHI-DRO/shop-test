import api from "@/services-v2/api";
import { ApiResponse } from "@/types/common-types";
import { SupplierType } from "@/types/supplier-types";

const supplierService = {
  get: async (params: { id: string }): Promise<ApiResponse<SupplierType>> =>
    api.post("/Profile/Supplier/Get", params),
};

export default supplierService;
