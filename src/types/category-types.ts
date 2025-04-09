export type CategoryType = {
  key: string;
  value: string;
};

export type GetAllCategoriesRequestType = {
  level: number;
  parentCategoryId?: string;
};
