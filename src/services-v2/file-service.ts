import api from "@/services-v2/api";
import { ApiResponse } from "@/types/common-types";
import { getLinksRequestType } from "@/types/file-types";

const fileService = {
  uploadFile: async (params: FormData): Promise<ApiResponse<string>> =>
    api.post("/File/File/Upload", params),

  getLinks: async (params: getLinksRequestType): Promise<ApiResponse<string>> =>
    api.post("/File/File/GetLinks", params),
};

export default fileService;
