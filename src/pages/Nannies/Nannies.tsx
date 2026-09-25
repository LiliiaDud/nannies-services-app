import { useEffect, useState } from 'react';
import { getNannies } from '../../services/nannies';
import type { Nanny } from '../../types/types';
import { FILTERS, type FilterKey } from '../../constants/index';
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
  const [filterKey, setFilterKey] = useState<FilterKey>('Show all');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getNannies(filterKey);
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
  }, [filterKey]);

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <div className={css.filter_group}>
          <label className={css.label}>Filters</label>
          <select
            className={css.select}
            value={filterKey}
            onChange={e => setFilterKey(e.target.value as FilterKey)}
          >
            {Object.keys(FILTERS).map(key => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>

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
