import type { Nanny } from '../types/types';
import axios from 'axios';
import { FILTERS, type FilterKey } from '../constants/index';

const API_URL =
  'https://nannies-services-app-59082-default-rtdb.europe-west1.firebasedatabase.app/nannies.json';

export async function getNannies(filterKey: FilterKey = 'Show all'): Promise<Nanny[]> {
  const res = await axios.get(API_URL);
  const raw = res.data;
  const data: Nanny[] = raw ? Object.values(raw) : [];

  const selectedFilter = FILTERS[filterKey];

  let result = [...data];

  if (selectedFilter.type === 'filter') {
    result = result.filter(nanny => {
      const fieldValue = nanny[selectedFilter.field as keyof Nanny] as number;
      return selectedFilter.operator === 'lt'
        ? fieldValue < selectedFilter.value
        : fieldValue > selectedFilter.value;
    });
  } else if (selectedFilter.type === 'sort') {
    const { sortBy, order } = selectedFilter;
    result.sort((a, b) => {
      const valA = a[sortBy as keyof Nanny] as string | number;
      const valB = b[sortBy as keyof Nanny] as string | number;

      if (typeof valA === 'string' && typeof valB === 'string') {
        return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      return order === 'asc' ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
    });
  }

  return result;
}
