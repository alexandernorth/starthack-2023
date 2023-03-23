import Image from 'next/image';
import Board from '@/components/Board';

export default function Home() {
  return (
    <>
      <main className='bg-landscape bg-no-repeat bg-cover bg-center bg-fixed'>
        <div className='bg-primary-50 bg-opacity-50'>
          <Board />
        </div>
      </main>
    </>
  );
}
