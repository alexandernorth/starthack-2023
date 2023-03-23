import cn from 'classnames';
import { boardData } from './boardData';

const Board = () => {
  const rows = boardData.rows;

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
      {tiles.map((tile) => (tile.active ? <Tile /> : <PlaceholderTile />))}
    </div>
  );
};

const Tile = ({}) => {
  return <div className={cn('bg-primary-200 h-20 rounded-xl')}></div>;
};

const PlaceholderTile = ({}) => {
  return <div className='invisible h-20'></div>;
};

export default Board;
