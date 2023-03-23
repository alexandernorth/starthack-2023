import BottomNav from '@/components/BottomNav';

export default function Layout({ children }) {
  return (
    <>
      <div className='h-screen w-screen bg-white '>
        <main>{children}</main>
        <BottomNav />
      </div>
    </>
  );
}
