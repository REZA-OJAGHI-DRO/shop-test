export type bankAccountCreateRequestType = {
  accountNumber: string;
  type: bankAccountTypeEnum;
  bankId: string;
};

export type bankAccountGetListFiltersType = {
  keyword: string;
};

export enum bankAccountTypeEnum {
  CurrentAccount = 0, // حساب جاری
  SavingAccount = 1, // حساب قرض الحسنه
}

export type BankAccountGetListResponseType = {
  id: string;
  accountNumber: string;
  type: bankAccountTypeEnum;
  bankId: string;
};
