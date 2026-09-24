export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
} as const;

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];

export const SORT_BY_KEYS = ["name", "rating", "price_per_hour"] as const;
export type SortByKey = (typeof SORT_BY_KEYS)[number];

export const FILTERS = {
  All: null,
  "Less than 10$": { field: "price_per_hour", operator: "lt", value: 10 },
  "Greater than 10$": { field: "price_per_hour", operator: "gt", value: 10 },
} as const;

export type FilterKey = keyof typeof FILTERS;