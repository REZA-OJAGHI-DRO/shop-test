import api from "@/services-v2/api";
import { ApiResponse } from "@/types/common-types";
import {
  ShoppingCartCreateRequestType,
  TempShoppingCartGetAllResponseType,
} from "@/types/shopping-cart-types";

const tempShoppingCartService = {
  add: async (
    params: ShoppingCartCreateRequestType[]
  ): Promise<ApiResponse<undefined>> =>
    api.post("/Financial/TempShoppingCartItem/Add", params),

  getAll: async (): Promise<
    ApiResponse<TempShoppingCartGetAllResponseType[]>
  > => api.post("/Financial/TempShoppingCartItem/GetAll", {}),
};

export default tempShoppingCartService;
