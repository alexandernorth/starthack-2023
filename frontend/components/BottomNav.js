import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaHome, FaPlus, FaTrophy, FaUser } from 'react-icons/fa';

const BottomNav = () => {
  return (
    <nav className='fixed bottom-0 left-0 w-full h-16 bg-gray-200 rounded-t-3xl pt-2'>
      <div className='flex flex-row justify-around items-center w-full'>
        <NavItem href='/' icon={<FaHome />} />
        <NavItem href='/task' icon={<FaPlus />} />
        <NavItem href='/leaderboard' icon={<FaTrophy />} />
        <NavItem href='/profile' icon={<FaUser />} />
      </div>
    </nav>
  );
};

const NavItem = ({ href, icon }) => {
  const router = useRouter();

  const isActive = (path) => {
    return router.pathname === path
      ? 'bg-primary text-primary-50'
      : 'text-gray-400';
  };

  return (
    <div className=''>
      <Link href={href}>
        <div
          className={`block text-center text-2xl ${isActive(
            href
          )} rounded-full p-3`}
        >
          {icon}
        </div>
      </Link>
    </div>
  );
};

export default BottomNav;
