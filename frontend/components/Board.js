import cn from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { makeBoard } from './boardData';
import { UserContext } from '@/app/context/UserContext';
import { FaPlus } from 'react-icons/fa';

const Board = () => {
  const { user, addScore } = useContext(UserContext);
  const [board, setBoard] = useState(makeBoard(user.score));

  console.log(user.score);

  const updateScore = (score) => {
    addScore(score);
    setBoard(makeBoard(user.score));
  };

  return (
    <div className=''>
      <div className='flex flex-col-reverse gap-4 p-2 pb-20'>
        {board.map((row, i) => (
          <TileRow tiles={row.tiles} key={i} />
        ))}
      </div>
      <div className=''>
        <button
          type='button'
          onClick={() => updateScore(1)}
          className='fixed z-90 bottom-20 right-4 rounded-full bg-secondary-600 p-2 text-white shadow-sm hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600'
        >
          <FaPlus className='text-3xl m-2' />
        </button>
      </div>
    </div>
  );
};

const TileRow = ({ tiles }) => {
  return (
    <div className='w-full grid grid-cols-4 gap-4 h-20'>
      {tiles.map((tile, i) =>
        tile ? <Tile tile={tile} key={i} /> : <PlaceholderTile key={i} />
      )}
    </div>
  );
};

const Tile = ({ tile }) => {
  if (tile.active) console.log('tile', tile);

  return (
    <div
      className={cn(
        'flex items-center justify-center h-20 rounded-xl border drop-shadow-md',
        { 'bg-accent-200 border-accent-300/60': tile.active },
        { 'bg-primary-200 border-primary-300/60': !tile.active }
      )}
    >
      <div
        className={cn(
          'text-3xl text-center font-bold',
          { 'text-accent-300': tile.active },
          { 'text-primary-300': !tile.active }
        )}
      >
        {tile.score}
      </div>
    </div>
  );
};

const PlaceholderTile = ({}) => {
  return <div className='invisible h-20'></div>;
};

export default Board;
