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
      <div className="bg-primary-600 text-secondary-200 py-10 w-full max-w-md">
        <Header title="Leader Board" />
        <div className="bg-primary-200 rounded-t-3xl overflow-hidden">
          <div className="pt-3 p-1">
            <ButtonGroup title1="Team" title2="Overall" />
          </div>
          <div className="bg-primary-200 flex flex-col w-full pb-7">
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