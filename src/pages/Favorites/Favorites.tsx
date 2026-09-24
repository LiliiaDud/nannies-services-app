import { useEffect, useState } from 'react';
import { getNannies } from '../../services/nannies';
import type { Nanny } from '../../types/types';
import NanniesList from '../../components/NanniesList/NanniesList';
import css from './Favorites.module.css';
interface FavoritesProps {
  favorites: string[];
  toggleFavorite: (nannyName: string) => void;
  isAuth: boolean;
}

export default function Favorites({ favorites, toggleFavorite, isAuth }: FavoritesProps) {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoritesData = async () => {
      try {
        setLoading(true);
        setError(null);

        const allNannies = await getNannies();

        const favoriteNannies = allNannies.filter(nanny => favorites.includes(nanny.name));

        setNannies(favoriteNannies);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch favorite nannies');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritesData();
  }, [favorites]); // Залежність від favorites, щоб список оновлювався при видаленні/додаванні

  if (loading) return <p className={css.loader}>Loading favorites...</p>;
  if (error) return <p className={css.error}>Error: {error}</p>;

  return (
    <div className={css.favorites}>
      <div className={css.wrapper}>
        {nannies.length === 0 ? (
          <div className={css.empty}>
            <h2>You don&apos;t have any favorite nannies yet.</h2>
            <p>Browse our nannies list and add your favorites here!</p>
          </div>
        ) : (
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
