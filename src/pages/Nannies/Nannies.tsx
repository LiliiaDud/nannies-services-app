import { useEffect, useState } from 'react';
import { getNannies } from '../../services/nannies';
import type { Nanny, SortByKey, SortOrder, FilterKey } from '../../types/types';
import { SORT_ORDER } from '../../constants/index';
import NanniesList from '../../components/NanniesList/NanniesList';
import css from './Nannies.module.css';

interface NanniesPageProps {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isAuth: boolean;
}

export default function Nannies({ favorites, toggleFavorite, isAuth }: NanniesPageProps) {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [sortBy] = useState<SortByKey>('name');
  const [sortOrder] = useState<SortOrder>(SORT_ORDER.ASC);
  const [filterKey] = useState<FilterKey>('All');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getNannies(sortBy, sortOrder, filterKey);
        setNannies(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch nannies');
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [sortBy, sortOrder, filterKey]);

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        {loading && <p className={css.loader}>Loading nannies...</p>}
        {error && <p className={css.error}>Error: {error}</p>}

        {!loading && !error && (
          <NanniesList
            nannies={nannies}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            isAuth={isAuth}
          />
        )}
      </div>
    </div>
  );
}
