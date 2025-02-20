import api from "@/services-v2/api";
import { ApiResponse } from "@/types/common-types";
import {
  ShopperAddFileRequestType,
  ShopperGetFilesRequestType,
  ShopperGetListRequestType,
  ShopperGetRequestType,
  ShopperRemoveFileRequestType,
  ShopperToggleActiveRequestType,
  ShopperType,
  ShopperUpdateRequestType,
  ShopperUpdateMainFileRequestType,
  MediaType,
  ShopperCreateRequestType,
} from "@/types/shopper-types";

const shopperService = {
  create: async (
    params: ShopperCreateRequestType
  ): Promise<ApiResponse<ShopperType>> =>
    api.post("/Profile/Shopper/Create", params),

  update: async (
    params: ShopperUpdateRequestType
  ): Promise<ApiResponse<ShopperType>> =>
    api.post("/Profile/Shopper/Update", params),

  getList: async (
    params: ShopperGetListRequestType
  ): Promise<ApiResponse<ShopperType[]>> =>
    api.post("/Profile/Shopper/GetList", params),

  toggleActive: async (
    params: ShopperToggleActiveRequestType
  ): Promise<ApiResponse<boolean>> =>
    api.post("/Profile/Shopper/ToggleActive", params),

  get: async (
    params: ShopperGetRequestType
  ): Promise<ApiResponse<ShopperType>> =>
    api.post("/Profile/Shopper/Get", params),

  addFile: async (
    params: ShopperAddFileRequestType
  ): Promise<ApiResponse<boolean>> =>
    api.post("/Profile/Shopper/AddFile", params),

  removeFile: async (
    params: ShopperRemoveFileRequestType
  ): Promise<ApiResponse<boolean>> =>
    api.post("/Profile/Shopper/RemoveFile", params),

  updateMainFile: async (
    params: ShopperUpdateMainFileRequestType
  ): Promise<ApiResponse<boolean>> =>
    api.post("/Profile/Shopper/UpdateMainFile", params),

  getFiles: async (
    params: ShopperGetFilesRequestType
  ): Promise<ApiResponse<MediaType[]>> =>
    api.post("/Profile/Shopper/GetFiles", params),
};

export default shopperService;
