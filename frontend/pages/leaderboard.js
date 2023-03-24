import { useState, useEffect } from 'react';
import RankingCard from '@/components/RankingCard';
import Header from '@/components/Header';
import ButtonGroup from '@/components/ButtonGroup';
import getLeaderboard from './api/leaderboard';


function Leaderboard() {
  const [leaders, setLeaders] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const data = await getLeaderboard();
      setLeaders(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className='bg-landscape bg-no-repeat bg-cover bg-center bg-fixed pt-40 max-w-md'>
        <Header title="LEADERBOARD" />
        <div className="bg-gray-100 rounded-t-3xl overflow-hidden pb-6">
          <div className="pt-3 p-1">
            <ButtonGroup title1="Team" title2="Overall" />
          </div>
          <div className="bg-gray-100 flex flex-col w-full mb-10">
            {leaders.map((leader, index) => (
              <RankingCard leader={leader} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;