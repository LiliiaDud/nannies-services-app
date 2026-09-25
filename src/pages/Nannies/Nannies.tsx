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
  const [allNannies, setAllNannies] = useState<Nanny[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterKey, setFilterKey] = useState<FilterKey>('Show all');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getNannies(filterKey);
        setAllNannies(data);
        setVisibleCount(3);
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

  const currentNannies = allNannies.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

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
          <>
            <NanniesList
              nannies={currentNannies}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              isAuth={isAuth}
            />

            {visibleCount < allNannies.length && (
              <div className={css.btn_box}>
                <button type="button" className={css.load_more_btn} onClick={handleLoadMore}>
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
