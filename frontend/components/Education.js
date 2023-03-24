import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@mui/material';
import { FaCaretRight, FaArrowRight, FaQuestionCircle } from 'react-icons/fa';

const Education = ({ onClick }) => {
  const [data, setData] = useState(null);

  /*   useEffect(() => {
          async function fetchData() {
              const data = await getLeaderboard();
              setData(data);
          }
          fetchData();
      }, []);
   */
  return (
    <>
      {data && <h1>Hi </h1>}
      <>
        <h1 className='mb-6 pt-10 text-4xl font-bold text-primary-700 text-center'>
          Did you know?
        </h1>
        <div className='flex flex-col px-8 items-center pt-12 h-screen bg-gray-200 rounded-t-3xl'>
          <h1 className='text-2xl mb-4 text-gray-700 font-bold text-left'>
            Electricity Consumption at our Factories
          </h1>
          <Card className='bg-primary-600 w-full'>
            <CardContent>
              <h1 className='text-lg text-primary-100 font-bold text-center'>
                Average Electricity Consumption
              </h1>
              <div className='flex flex-row mt-4 items-center justify-between'>
                <div className='flex flex-col items-center justify-center basis-1/3'>
                  <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gray-200'>
                    <FaArrowRight className='text-5xl text-orange-500 -rotate-12' />
                  </div>
                </div>
                <div className='flex flex-col items-center justify-center basis-1/3'>
                  <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gray-200'>
                    <FaArrowRight className='text-5xl text-red-500 -rotate-45' />
                  </div>
                </div>
                <div className='flex flex-col items-center justify-center basis-1/3'>
                  <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gray-200'>
                    <FaArrowRight className='text-5xl text-green-400 rotate-12' />
                  </div>
                </div>
              </div>
              <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-col items-center justify-center basis-1/3'>
                  <h1 className='text-sm text-primary-100 font-bold text-center mt-2'>
                    Shift
                  </h1>
                </div>
                <div className='flex flex-col items-center justify-center basis-1/3'>
                  <h1 className='text-sm text-primary-100 font-bold text-center mt-2'>
                    Zell
                  </h1>
                </div>
                <div className='flex flex-col items-center justify-center basis-1/3'>
                  <h1 className='text-sm text-primary-100 font-bold text-center mt-2'>
                    Bell Food Group
                  </h1>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className='mt-4 text-base'>
            Energy consumption during your shift is climbing slowly compared to
            the global Bell Food Group Average. However, your shift is doing
            great in contrast to the weekly Zell average. Keep this up! If you
            want some suggestions on how to reduce your consumption even further
            check out our tips.
          </div>
          <div className='flex flex-row w-full mt-6 items-center justify-left gap-8'>
            <div className='flex text-2xl font-bold'>Take Quiz</div>
            <div className='flex items-center justify-center h-12 w-12 rounded-full bg-gray-400'>
              <FaCaretRight className='text-3xl text-white' />
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Education;
