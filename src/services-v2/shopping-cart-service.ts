import api from "@/services-v2/api";
import { ApiResponse } from "@/types/common-types";
import {
  ShoppingCartCreateRequestType,
  ShoppingCartGetAllResponseType,
  ShoppingCartEditRequestType,
  ShoppingCartChangeStatusRequestType,
} from "@/types/shopping-cart-types";

const shoppingCartService = {
  create: async (params: {
    ids: string[];
  }): Promise<ApiResponse<ShoppingCartCreateRequestType[]>> =>
    api.post("/Financial/ShoppingCart/Create", params),

  getAll: async (): Promise<ApiResponse<ShoppingCartGetAllResponseType[]>> =>
    api.post("/Financial/ShoppingCart/GetAll", {}),

  getShoppingCartItems: async (params: {
    id: string;
  }): Promise<ApiResponse<ShoppingCartCreateRequestType[]>> =>
    api.post("/Financial/ShoppingCart/GetShoppingCartItems", params),

  getAllForSupplier: async (params: {
    id?: string;
  }): Promise<ApiResponse<ShoppingCartGetAllResponseType[]>> =>
    api.post("/Financial/ShoppingCart/GetAllForSupplier", params),

  getEditCart: async (params: {
    ids: string[];
  }): Promise<ApiResponse<ShoppingCartEditRequestType[]>> =>
    api.post("/Financial/ShoppingCart/Edit", params),

  changeStatusBySupplier: async (
    params: ShoppingCartChangeStatusRequestType
  ): Promise<ApiResponse<undefined>> =>
    api.post("/Financial/ShoppingCart/ChangeStatusBySupplier", params),

  changeStatusByShopper: async (
    params: ShoppingCartChangeStatusRequestType
  ): Promise<ApiResponse<undefined>> =>
    api.post("/Financial/ShoppingCart/ChangeStatusByShopper", params),
};

export default shoppingCartService;
