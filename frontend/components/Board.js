import cn from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { DailyDice } from './DailyDice';
import { UserContext } from '@/app/context/UserContext';
import { BoardContext } from '@/app/context/BoardContext';
import QuizModal from './QuizModal';
import {
  FaPlus,
  FaQuestionCircle,
  FaRegLightbulb,
  FaChalkboardTeacher,
  FaDice,
} from 'react-icons/fa';
import EducationModal from './EducationModal';

const Board = () => {
  const { user, addScore } = useContext(UserContext);
  const { board, updateActive } = useContext(BoardContext);
  const [showDailyDice, setShowDailyDice] = useState(true);

  const updateScore = (score) => {
    addScore(score);
  };

  const collectDailyDice = () => {
    updateScore(3);
    setShowDailyDice(false);
  };

  useEffect(() => {
    updateActive(user.score);
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
          className='invisible fixed z-90 bottom-20 right-4 rounded-full bg-secondary-600 p-2 text-white shadow-sm hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600'
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
          <TileModalWrapper tile={tile} key={i} userScore={userScore} />
        ) : (
          <PlaceholderTile key={i} />
        )
      )}
    </div>
  );
};

const TileModalWrapper = ({ tile, userScore }) => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <div onClick={openModal} className=''>
        <Tile tile={tile} userScore={userScore} />
      </div>
      <QuizModal open={open} onClose={closeModal} />
    </>
  );
};

const Tile = ({ tile, userScore }) => {
  const pastTile = tile.score < userScore;

  return (
    <div
      className={cn(
        'flex items-center justify-center h-20 rounded-xl border-2 drop-shadow-md',
        {
          ' bg-primary-200 border-primary-400 text-primary-300':
            tile.type == 'quiz' && !pastTile,
        },
        {
          ' bg-accent-200 border-accent-400 text-accent-300':
            tile.type == 'education' && !pastTile,
        },
        {
          ' bg-secondary-200 border-secondary-400 text-secondary-300':
            tile.type == 'fact' && !pastTile,
        },
        {
          ' bg-sky-200 border-sky-400 text-sky-300':
            tile.type == 'chance' && !pastTile,
        },
        {
          ' bg-brown-200 border-brown-400 text-brown-300':
            tile.type == 'empty' && !pastTile,
        },
        {
          ' bg-gray-200 border-gray-400 text-gray-300': pastTile,
        },
        { ' ring-offset-1 ring-4 ring-gray-700 shadow-2xl': tile.active },
        { ' opacity-90': !tile.active }
      )}
    >
      <div
        className={cn(
          'text-4xl text-center font-bold',
          { ' text-primary-400': tile.type == 'quiz' && !pastTile },
          { ' text-accent-400': tile.type == 'education' && !pastTile },
          { ' text-secondary-400': tile.type == 'fact' && !pastTile },
          { ' text-sky-400': tile.type == 'chance' && !pastTile },
          { ' text-black/0': tile.type == 'empty' },
          { ' text-gray-900/10': pastTile }
        )}
      >
        {tile.type === 'quiz' && <FaQuestionCircle />}
        {tile.type === 'education' && <FaChalkboardTeacher />}
        {tile.type === 'fact' && <FaRegLightbulb />}
        {tile.type === 'chance' && <FaDice />}
        {tile.type === 'empty' && <FaPlus />}
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
