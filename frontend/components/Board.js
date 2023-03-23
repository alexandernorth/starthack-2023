import cn from 'classnames';
import { useState } from 'react';
import { boardData, makeBoard } from './boardData';

const Board = () => {
  const [activeTile, setActiveTile] = useState(0);

  const rows = makeBoard();

  console.log(rows);

  return (
    <div className='flex flex-col-reverse bg-gray-100 gap-4 p-2'>
      <div className='h-16' />
      {rows.map((row) => (
        <TileRow tiles={row.tiles} />
      ))}
    </div>
  );
};

const TileRow = ({ tiles }) => {
  return (
    <div className='w-full grid grid-cols-4 gap-4 h-20'>
      {tiles.map((tile) => (tile ? <Tile tile={tile} /> : <PlaceholderTile />))}
    </div>
  );
};

const Tile = ({ tile }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center bg-primary-200 h-20 rounded-xl'
      )}
    >
      <div className='text-3xl text-center font-bold text-primary-300/60'>
        {tile.score}
      </div>
    </div>
  );
};

const PlaceholderTile = ({}) => {
  return <div className='invisible h-20'></div>;
};

export default Board;
