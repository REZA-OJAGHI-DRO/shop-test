import api from "@/services-v2/api";
import {
  CategoryType,
  GetAllCategoriesRequestType,
} from "@/types/category-types";
import { ApiResponse } from "@/types/common-types";

const categoryService = {
  getAll: async (
    params: GetAllCategoriesRequestType
  ): Promise<ApiResponse<CategoryType[]>> =>
    api.post("/Category/Category/GetAll", params),
};

export default categoryService;
