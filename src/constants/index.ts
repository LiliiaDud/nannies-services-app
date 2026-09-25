export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];

export const SORT_BY_KEYS = ['name', 'rating', 'price_per_hour'] as const;
export type SortByKey = (typeof SORT_BY_KEYS)[number];

export const FILTERS = {
  'A to Z': { type: 'sort', sortBy: 'name', order: 'asc' },
  'Z to A': { type: 'sort', sortBy: 'name', order: 'desc' },
  'Less than 10$': { type: 'filter', field: 'price_per_hour', operator: 'lt', value: 10 },
  'Greater than 10$': { type: 'filter', field: 'price_per_hour', operator: 'gt', value: 10 },
  Popular: { type: 'sort', sortBy: 'rating', order: 'desc' },
  'Not popular': { type: 'sort', sortBy: 'rating', order: 'asc' },
  'Show all': { type: 'all' },
} as const;

export type FilterKey = keyof typeof FILTERS;
