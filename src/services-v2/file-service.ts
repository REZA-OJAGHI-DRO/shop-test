import api from "@/services-v2/api";
import { ApiResponse } from "@/types/common-types";

const fileService = {
  uploadFile: async (params: FormData): Promise<ApiResponse<string>> =>
    api.post("/File/File/Upload", params),
};

export default fileService;
