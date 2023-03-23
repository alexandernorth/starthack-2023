import { BsDice3 } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';

export const DailyDice = ({ onCollect }) => {
  return (
    <div className='fixed z-90 top-4 w-full p-4'>
      <div className='z-90 flex gap-2 p-4 justify-center items-center h-20 w-full rounded-2xl bg-white border-primary-300/60 drop-shadow-lg'>
        <BsDice3 className='h-12 w-12' />
        <div className='grow text-xl font-bold text-gray-900 ml-4'>
          Collect your daily dice
        </div>
        <div onClick={onCollect} className='rounded-full bg-green-100 p-1'>
          <FaCheck className='text-2xl m-2 text-green-600' />
        </div>
      </div>
    </div>
  );
};
