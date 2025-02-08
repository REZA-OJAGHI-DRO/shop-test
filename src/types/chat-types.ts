import { RelationshipMemberTypeEnum } from "./relationship-types";
import { MediaType } from "./shopper-types";

export type ChatSendMessageRequestType = {
  currentUserType: RelationshipMemberTypeEnum;
  receiverUserId: string;
  receiverType: RelationshipMemberTypeEnum;
  messageContent: string;
  attachments: string[];
  referenceType?: ChatReferenceTypeEnum;
  reference?: string;
};

export type ChatGetChatMessagesFiltersType = {
  currentUserType?: RelationshipMemberTypeEnum;
  contactUserId?: string;
  contactUserType?: RelationshipMemberTypeEnum;
  after?: string;
  before?: string;
  referenceType?: ChatReferenceTypeEnum;
  reference?: string;
};

export type ChatGetListResponseType = {
  id: 0;
  contact: {
    userId: string;
    memberType: RelationshipMemberTypeEnum;
    name: string;
    image: MediaType;
  };
  lastMessage: ChatGetChatMessagesResponseType;
  lastMessageSeen: string;
};

export type ChatGetChatMessagesResponseType = {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  seen: boolean;
  referenceType: ChatReferenceTypeEnum;
  reference: string;
  attachments: string[];
  createdAt: string;
};

export type ChatGetListFiltersType = {
  currentUserType: RelationshipMemberTypeEnum;
};

export type ChatGetNewMessagesSummaryRequestType = {
  currentUserType: RelationshipMemberTypeEnum;
};

export type ChatGetNewMessagesSummaryResponseType = {
  senderId: string;
  senderType: RelationshipMemberTypeEnum;
  count: number;
};

export type ChatGetChatReferencesRequestType = {
  chatId: string;
};

export type ChatGetChatReferencesResponseType = {
  referenceType: ChatReferenceTypeEnum;
  reference: string;
  messageCount: number;
};

export enum ChatReferenceTypeEnum {
  Factor = 1, //  فاکتور
  Cheque = 2, //  چک
}
