import cn from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { makeBoard, updateActiveTile } from './boardData';
import { DailyDice } from './DailyDice';
import { UserContext } from '@/app/context/UserContext';
import { FaDice, FaPlus, FaChalkboardTeacher } from 'react-icons/fa';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { FaRegLightbulb } from 'react-icons/fa';

const Board = () => {
  const { user, addScore } = useContext(UserContext);
  const [board, setBoard] = useState(makeBoard(user.score));
  const [showDailyDice, setShowDailyDice] = useState(true);

  const updateScore = (score) => {
    addScore(score);
  };

  const collectDailyDice = () => {
    updateScore(3);
    setShowDailyDice(false);
  };

  useEffect(() => {
    let newBoard = updateActiveTile(board, user.score);
    setBoard(newBoard);
  }, [user.score]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  return (
    <div className=''>
      <div className='z-0 flex flex-col-reverse gap-4 p-2 pb-20'>
        {board.map((row, i) => (
          <TileRow tiles={row.tiles} key={i} userScore={user.score} />
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
        {showDailyDice && <DailyDice onCollect={collectDailyDice} />}
      </div>
    </div>
  );
};

const TileRow = ({ tiles, userScore }) => {
  return (
    <div className='w-full grid grid-cols-4 gap-4 h-20'>
      {tiles.map((tile, i) =>
        tile ? (
          <Tile tile={tile} key={i} userScore={userScore} />
        ) : (
          <PlaceholderTile key={i} />
        )
      )}
    </div>
  );
};

const Tile = ({ tile, userScore }) => {
  const pastTile = tile.score < userScore;
  return (
    <div
      className={cn(
        'flex items-center justify-center h-20 rounded-xl border-2 drop-shadow-md',
        {
          'bg-primary-200 border-primary-400 text-primary-300':
            tile.type == 'quiz' && !pastTile,
        },
        {
          'bg-accent-200 border-accent-400 text-accent-300':
            tile.type == 'education' && !pastTile,
        },
        {
          'bg-secondary-200 border-secondary-400 text-secondary-300':
            tile.type == 'fact' && !pastTile,
        },
        {
          'bg-sky-200 border-sky-400 text-sky-300':
            tile.type == 'chance' && !pastTile,
        },
        {
          'bg-gray-200 border-gray-400 text-gray-300':
            tile.type == 'empty' || pastTile,
        },
        { 'ring-offset-1 ring-4 ring-gray-700 shadow-2xl': tile.active },
        { 'opacity-90': !tile.active }
      )}
    >
      <div
        className={cn(
          'text-4xl text-center font-bold',
          { 'text-primary-500': tile.type == 'quiz' && !pastTile },
          { ' text-accent-500': tile.type == 'education' && !pastTile },
          { ' text-secondary-500': tile.type == 'fact' && !pastTile },
          { ' text-sky-500': tile.type == 'chance' && !pastTile },
          { 'text-gray-500': tile.type == 'empty' || pastTile }
        )}
      >
        {tile.type == 'quiz' && <FaRegQuestionCircle />}
        {tile.type == 'education' && <FaRegLightbulb />}
        {tile.type == 'fact' && <FaChalkboardTeacher />}
        {tile.type == 'chance' && <FaDice className='text-4xl' />}
      </div>
      <div
        className={cn(
          'fixed mr-0.5 bottom-0 right-1 text-xl text-center font-bold'
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
