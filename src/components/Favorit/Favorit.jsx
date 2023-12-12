import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
import './Favorit.css';

export default function Favorit({ isFavorite, text }) {
  return (
    <>
      { isFavorite && <MdFavorite className="favorit__MdFavorite" /> }
      { !isFavorite && <MdOutlineFavoriteBorder className="favorit__MdOutlineFavoriteBorder" /> }
      {
      text
      && (
      <p className="favorits__text">
        {isFavorite && 'Удалить из избранного' }
        {!isFavorite && 'Добавить в избранное'}
      </p>
      )
      }
    </>
  );
}
