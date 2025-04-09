import api from "@/services-v2/api";
import { ApiResponse } from "@/types/common-types";
import { GoodType } from "@/types/good-types";
import {
  SearchGoodsRequestType,
  SearchSupplierRequestType,
  SearchSupplierResponseType,
} from "@/types/landings-search-types";

const landingSearchService = {
  searchGoods: async (
    params: SearchGoodsRequestType
  ): Promise<ApiResponse<GoodType[]>> =>
    api.post("/LandingSearch/LandingSearch/SearchGoods", params),

  searchSuppliers: async (
    params: SearchSupplierRequestType
  ): Promise<ApiResponse<SearchSupplierResponseType[]>> =>
    api.post("/LandingSearch/LandingSearch/SearchSuppliers", params),
};

export default landingSearchService;
