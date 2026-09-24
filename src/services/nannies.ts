import type { Nanny } from '../types/types';
import axios from 'axios';
import {
  SORT_ORDER,
  type SortOrder,
  type SortByKey,
  FILTERS,
  type FilterKey,
} from '../constants/index';

const API_URL =
  'https://nannies-services-app-59082-default-rtdb.europe-west1.firebasedatabase.app/nannies.json';

export async function getNannies(
  sortBy: SortByKey = 'name',
  sortOrder: SortOrder = SORT_ORDER.ASC,
  filterKey: FilterKey = 'All'
): Promise<Nanny[]> {
  const res = await axios.get(API_URL);

  const raw = res.data;
  const data: Nanny[] = raw ? Object.values(raw) : [];

  const filtered = FILTERS[filterKey]
    ? data.filter(nanny => {
        const fieldValue = nanny[FILTERS[filterKey]!.field] as number;
        const { operator, value } = FILTERS[filterKey]!;
        return operator === 'lt' ? fieldValue < value : fieldValue > value;
      })
    : data;

  return [...filtered].sort((a, b) => {
    const valA = a[sortBy] as string | number;
    const valB = b[sortBy] as string | number;

    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortOrder === SORT_ORDER.ASC ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }

    return sortOrder === SORT_ORDER.ASC ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
  });
}
