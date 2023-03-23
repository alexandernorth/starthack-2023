import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaHome, FaSearch, FaPlus, FaUser } from 'react-icons/fa';

const BottomNav = () => {
  const router = useRouter();

  const isActive = (path) => {
    return router.pathname === path ? 'text-blue-600' : 'text-gray-600';
  };

  return (
    <nav className='fixed bottom-0 left-0 w-full h-16 bg-white justify-around items-center'>
      <Link href='/'>
        <div className={`block text-center ${isActive('/')}`}>
          <FaHome />
          <div className='text-xs'>Home</div>
        </div>
      </Link>
      <Link href='/search'>
        <div className={`block text-center ${isActive('/search')}`}>
          <FaSearch />
          <div className='text-xs'>Search</div>
        </div>
      </Link>
      <Link href='/add'>
        <div className={`block text-center ${isActive('/add')}`}>
          <FaPlus />
          <div className='text-xs'>Add</div>
        </div>
      </Link>
      <Link href='/profile'>
        <div className={`block text-center ${isActive('/profile')}`}>
          <FaUser />
          <div className='text-xs'>Profile</div>
        </div>
      </Link>
    </nav>
  );
};

export default BottomNav;
