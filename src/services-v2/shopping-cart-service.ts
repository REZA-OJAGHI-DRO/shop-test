import api from "@/services-v2/api";
import { ApiResponse } from "@/types/common-types";
import {
  ShoppingCartCreateRequestType,
  ShoppingCartGetAllResponseType,
  ShoppingCartEditRequestType,
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
      
      getAllForSupplier: async (): Promise<
      ApiResponse<ShoppingCartGetAllResponseType[]>
      > => api.post("/Financial/ShoppingCart/GetAllForSupplier", {}),
      
      getEditCart: async (params: {
        ids: string[];
      }): Promise<ApiResponse<ShoppingCartEditRequestType[]>> =>
        api.post("/Financial/ShoppingCart/Edit", params),

};

export default shoppingCartService;
