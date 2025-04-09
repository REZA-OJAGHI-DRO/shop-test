import api from "@/services-v2/api";
import { ApiResponse, PaginatedResponse } from "@/types/common-types";
import {
  RelationshipAnswerRequestType,
  RelationshipCreateRequestType,
  RelationshipGetListRequestType,
  RelationshipSearchMembersRequestType,
  RelationshipSearchMembersResponseType,
  RelationshipType,
} from "@/types/relationship-types";

const relationshipService = {
  create: async (
    params: Partial<RelationshipCreateRequestType>
  ): Promise<ApiResponse<string>> =>
    api.post("/Communication/Relationship/Create", params),
  answer: async (
    params: RelationshipAnswerRequestType
  ): Promise<ApiResponse<string>> =>
    api.post("/Communication/Relationship/Answer", params),
  getList: async (
    params: RelationshipGetListRequestType
  ): Promise<ApiResponse<PaginatedResponse<RelationshipType[]>>> =>
    api.post("/Communication/Relationship/GetList", params),
  searchMembers: async (
    params: RelationshipSearchMembersRequestType
  ): Promise<ApiResponse<RelationshipSearchMembersResponseType[]>> =>
    api.post("/Communication/Relationship/SearchMembers", params),
};

export default relationshipService;
