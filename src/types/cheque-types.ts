import { RelationshipMemberTypeEnum } from "./relationship-types";
import { MediaType } from "./shopper-types";

export enum ChequeSayadStatusEnum {
  NotIssued, // صادر نشده
  IssuedNotRegistered, // ثبت نشده
  IssuedWatingForNationalId, // در انتظار تایید
  IssuedRegistered, // ثبت شده
  NotInquired, // استعلام نشده
  NonExistentInSayad, // ناموجود در سامانه صیادی
  ChequeInquiry, // استعلام شده
}

export enum ChequeReceivedChequeStatusEnum {
  InCoffer, // در صندوق خزانه
  Paid, // وصول شده
  TransferedToBank, // واگذار شده به بانک
  GivenBack, // برگشت خورده
  PaidGivenBack, // خرج شده ی عودت داده شده
  Guarantee, // تضمین
  GuaranteeGivenBack, // عودت تضمین
}

export enum ChequeIssuedChequeStatusEnum {
  Issued, // صادر شده
  GivenBack, // برگشت خورده
  Guarantee, // تضمین
  GivenBackGuarantee, // عودت تضمین
}

export enum ChequeGroupEnum {
  Received,
  Paid,
  Issued,
}

export enum ChequeSayadMismatchStatusEnum {
  PriceMismatch = 0,
  DueDateMismatch = 1,
  UnreportedMismatch = 2,
  ContainsStrikethrough = 3,
  InformationNotFound = 4,
}

export enum ChequeOwner3MonthsStatusEnum {
  WithoutReturnedCheque = 0,
  HaveReturnedCheque = 1,
  NotInquired = 2,
}

export enum ChequeReceiverAcceptanceStatusEnum {
  Accepted = 0,
  rejected = 1,
  NotPaid = 2,
  AcceptanceWaiting = 3,
  AutoAccepted = 4,
}

export type ChequeInquiryRequestType = {
  sayadId: string;
  ownerNationalId: string;
  isGuarantee: boolean;
  userType: RelationshipMemberTypeEnum;
};

export type ChequeInquiryForAddReceivedChequeResponseType = {
  inquiryStatus: string;
  cheque: ChequeAddReceivedChequeRequestType;
};

export type ChequeInquiryForAddIssuedChequeResponseType = {
  inquiryStatus: string;
  cheque: ChequeAddIssuedChequeRequestType;
};

export type ChequeGetListFiltersType = {
  keyword: string;
};

export type ChequeAddReceivedChequeRequestType = {
  id: string;
  amount: number;
  dueDate: string;
  serialNo: string;
  seriesNo: string;
  bankId: string;
  branchCode: string;
  isDigital: boolean;
  ownerName: string;
  ownerIban: string;
  issuedDate: string;
  description: string;
  senderUserId: string;
  senderType: RelationshipMemberTypeEnum;
  chequeImage: string;
};

export type ChequeGetReceivedChequesResponseType = {
  id: string;
  sayadId: string;
  ownerNationalId: string;
  ownerName: string;
  ownerIban: string;
  amount: number;
  dueDate: null | string;
  description: string;
  bankName: string;
  senderUserId: null | string;
  receiverUserId: string;
  isGuarantee: boolean;
  group: ChequeGroupEnum;
  receivedChequeStatus: null | ChequeReceivedChequeStatusEnum;
  sayadStatus: ChequeSayadStatusEnum;
  sayadMismatchStatus: ChequeSayadMismatchStatusEnum;
  owner3MonthsStatus: ChequeOwner3MonthsStatusEnum;
  receiverAcceptanceStatus: ChequeReceiverAcceptanceStatusEnum;
  enabled: boolean;
  serialNo: string;
  seriesNo: string;
  senderName: string;
  receiverName: string;
  issuedChequeStatus: ChequeIssuedChequeStatusEnum | null;
  cashedStatus: ChequeCashedStatusEnum;
  image: null | MediaType;
};

export enum ChequeCashedStatusEnum {
  Cashed = 0, // نقد شده
  Returned = 1, // برگشت خورده
  PartiallyReturned = 2, //  بخشی برگشت خورده
  Cancelled = 3, //  باطل شده
  NotInquired = 4, //  استعلام نشده
  NotDue = 5, //  سررسید نشده
  DueButNotPresented = 6, //  سررسید شده ی بانک برده نشده
}

export type ChequeAcceptanceRequestType = {
  id: string;
  isAccepted: boolean;
};

export type ChequePayChequeRequestType = {
  id: string;
  receiverUserId: string;
  receivertype: RelationshipMemberTypeEnum;
};

export type ChequeGetResponseType = {
  id: string;
  sayadId: string;
  ownerNationalId: string;
  ownerName: string;
  ownerIban: string;
  amount: number;
  dueDate: string;
  description: string;
  serialNo: string;
  seriesNo: string;
  bankName: string;
  branchCode: string;
  issuedDate: string;
  expirationDate: string;
  sayadInitializedTime: string;
  returnDate: string;
  cashedDate: string;
  senderUserId: number;
  senderName: string;
  receiverUserId: number;
  receiverName: string;
  isGuarantee: true;
  group: number;
  receivedChequeStatus: ChequeReceivedChequeStatusEnum | null;
  issuedChequeStatus: ChequeIssuedChequeStatusEnum | null;
  sayadStatus: ChequeSayadStatusEnum;
  blockStatus: number;
  sayadMismatchStatus: ChequeSayadMismatchStatusEnum;
  cashedStatus: ChequeCashedStatusEnum;
  colorStatus: number;
  owner3MonthsStatus: ChequeOwner3MonthsStatusEnum;
  receiverAcceptanceStatus: number;
  image: null | MediaType;
  enabled: boolean;
};

export type ChequeAddIssuedChequeRequestType = {
  id: string;
  amount: number;
  dueDate: string;
  serialNo: string;
  seriesNo: string;
  bankId: string;
  branchCode: string;
  isDigital: boolean;
  ownerName: string;
  ownerIban: string;
  issuedDate: string;
  description: string;
  chequeImage: string;
  ownerBankAccountId: string;
  receiverUserId: string;
  receiverType: RelationshipMemberTypeEnum;
};
