import css from './NanniesList.module.css';
import NannyCard from '../NannyCard/NannyCard';
import type { Nanny } from '../../types/types';

interface NanniesListProps {
  nannies: Nanny[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isAuth: boolean;
}
export default function NanniesList({
  nannies,
  favorites,
  toggleFavorite,
  isAuth,
}: NanniesListProps) {
  return (
    <div className={css.nannies_list}>
      {nannies.map(nanny => (
        <NannyCard
          key={nanny.id}
          nanny={nanny}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          isAuth={isAuth}
        />
      ))}
    </div>
  );
}
