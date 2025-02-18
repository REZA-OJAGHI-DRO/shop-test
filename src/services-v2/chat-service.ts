import api from "@/services-v2/api";
import {
  ChatGetChatMessagesFiltersType,
  // ChatGetChatReferencesRequestType,
  // ChatGetChatReferencesResponseType,
  // ChatGetListFiltersType,
  // ChatGetNewMessagesSummaryRequestType,
  // ChatGetNewMessagesSummaryResponseType,
  ChatGetChatMessagesResponseType,
  ChatSendMessageRequestType,
  // ChatGetListResponseType,
} from "@/types/chat-types";
import {
  ApiResponse,
  PaginatedDataRequestType,
  PaginatedResponse,
} from "@/types/common-types";

const chatService = {
  sendMessage: async (
    params: ChatSendMessageRequestType,
  ): Promise<ApiResponse<undefined>> =>
    api.post("/Communication/Chat/SendMessage", params),

  // getList: async (
  //   params: PaginatedDataRequestType<ChatGetListFiltersType>,
  // ): Promise<ApiResponse<PaginatedResponse<ChatGetListResponseType[]>>> =>
  //   api.post("/Communication/Chat/GetList", params),

  getChatMessages: async (
    params: PaginatedDataRequestType<ChatGetChatMessagesFiltersType>,
  ): Promise<
    ApiResponse<PaginatedResponse<ChatGetChatMessagesResponseType[]>>
  > => api.post("/Communication/Chat/GetChatMessages", params),

  // getNewMessagesSummary: async (
  //   params: ChatGetNewMessagesSummaryRequestType,
  // ): Promise<ApiResponse<ChatGetNewMessagesSummaryResponseType>> =>
  //   api.post("/Communication/Chat/GetNewMessagesSummary", params),

  // getChatReferences: async (
  //   params: ChatGetChatReferencesRequestType,
  // ): Promise<ApiResponse<ChatGetChatReferencesResponseType[]>> =>
  //   api.post("/Communication/Chat/GetChatReferences", params),
};

export default chatService;
