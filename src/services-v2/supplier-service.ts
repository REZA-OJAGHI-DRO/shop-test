import api from "@/services-v2/api";
import { ApiResponse, KeyValuePairType } from "@/types/common-types";
import {
  SupplierGetAllFilterType,
  SupplierType,
  SupplierUpdateProfilePhotoRequestType,
} from "@/types/supplier-types";

const supplierService = {
  get: async (params: { id: string }): Promise<ApiResponse<SupplierType>> =>
    api.post("/Profile/Supplier/Get", params),

  getAll: async (
    params: SupplierGetAllFilterType
  ): Promise<ApiResponse<KeyValuePairType[]>> =>
    api.post("/Profile/Supplier/GetAll", params),

  updateProfilePhoto: async (
    params: SupplierUpdateProfilePhotoRequestType
  ): Promise<ApiResponse<undefined>> =>
    api.post("/Profile/Supplier/UpdateProfilePhoto", params),
};

export default supplierService;
