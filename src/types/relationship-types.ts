export enum RelationshipMemberTypeEnum {
  Supplier,
  Shopper,
  Repairman,
}

export enum RelationshipTypeEnum {
  Colleague,
  Representation,
  AftersSalesService,
}

export enum RelationshipStatusTypeEnum {
  NotAccepted,
  Accepted,
  Invited,
  Cancelled,
}

export type RelationshipType = {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterType: RelationshipMemberTypeEnum;
  requesterCityName: string;
  requesterProvinceName: string;
  requesterPhoneNumber: string;
  requesterNationalId: string;
  acceptorId: string | null;
  acceptorName: string;
  acceptorType: RelationshipMemberTypeEnum;
  acceptorCityName: string;
  acceptorProvinceName: string;
  acceptorPhoneNumber: string;
  acceptorNationalId: null;
  relationshipType: RelationshipTypeEnum;
  status: RelationshipStatusTypeEnum;
  description: string;
  requestDate: string;
  isNew: boolean;
};

export type RelationshipCreateRequestType = {
  requesterId: string;
  requesterType: RelationshipMemberTypeEnum;
  acceptorId: string | null;
  acceptorType: RelationshipMemberTypeEnum;
  acceptorExists: boolean;
  acceptorName: string | null;
  acceptorCityId: string | null;
  acceptorPhoneNumber: string | null;
  acceptorNationalId: string | null;
  relationshipType: number;
  description: string | null;
};

export type RelationshipAnswerRequestType = {
  id: string;
  acceptorId: string;
  acceptorType: RelationshipMemberTypeEnum;
  isAccepted: boolean;
  hasKnown: boolean | null;
  hasKnownFromYear: string | null;
  hasTrade: boolean | null;
  hasTradeFromYear: string | null;
  suggests: boolean | null;
};

export type RelationshipGetListRequestType = {
  filter: {
    MemberUserId?: string;
    MemberType?: RelationshipMemberTypeEnum;
    MemberSupplierId?: string;
    MemberShopperId?: string;
  };
  pageSize: number;
  pageIndex: number;
  orderType: number;
  orderPropertyName?: string | null;
};

export type RelationshipSearchMembersRequestType = {
  mobile: string | null;
  nationalId: string | null;
  name: string | null;
};

export type RelationshipSearchMembersResponseType = {
  id: string;
  type: RelationshipMemberTypeEnum;
  typeString: string;
  name: string;
  mobile: string;
  nationalId: string;
  cityName: string;
  provinceName: string;
  phone: string;
  description: string;
};
