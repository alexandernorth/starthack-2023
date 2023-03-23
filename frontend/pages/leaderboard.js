import { useState, useEffect } from 'react';
// import { getLeaders } from '../api/leaders'; // an API function that fetches the leaders data
import RankingCard from '@/components/RankingCard';
import salad from "../public/images/salad.png";
import saladSmall from "../public/images/saladSmall.png";
import saladPurple from "../public/images/saladPurple.png";
import Header from '@/components/Header';
import ButtonGroup from '@/components/ButtonGroup';


const leadersList = [
  {
    id: 1,
    name: 'Jane Cooper',
    score: 100,
    imageSrc: salad,
  },
  {
    id: 2,
    name: 'John Doe',
    score: 88,
    imageSrc: saladSmall,
  },
  {
    id: 3,
    name: "Jonny North",
    score: 75,
    imageSrc: saladPurple,
  },
  {
    id: 2,
    name: 'John Doe',
    score: 88,
    imageSrc: saladSmall,
  },
  {
    id: 3,
    name: "Jonny North",
    score: 75,
    imageSrc: saladPurple,
  },
  {
    id: 2,
    name: 'John Doe',
    score: 88,
    imageSrc: saladSmall,
  },
  {
    id: 3,
    name: "Jonny North",
    score: 75,
    imageSrc: saladPurple,
  },
  {
    id: 2,
    name: 'John Doe',
    score: 88,
    imageSrc: saladSmall,
  },
  {
    id: 3,
    name: "Jonny North",
    score: 75,
    imageSrc: saladPurple,
  }
]

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);


  useEffect(() => {
    /* async function fetchData() {
      const data = await getLeaders();
      setLeaders(data);
    }
    fetchData(); */
    setLeaders(leadersList);
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