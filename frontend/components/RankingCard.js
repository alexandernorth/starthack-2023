import Image from "next/image";

const Rank = ({ rank }) => {
    return (
        <div className="bg-gray-300 text-primary-400 text-2xl flex-none mx-3 my-5 p-2 rounded-lg border">
            {rank < 9 ? <>0{rank + 1}</> : <>{rank + 1}</>}
        </div>
    )
}

const Leader = ({ leader }) => {
    return (
        <div
            key={`${leader.name}-${Math.random()}`}
            className="relative flex grow items-center rounded-lg border bg-gray-300 bg-white mr-3 ml-1 my-3 shadow-sm focus-within:ring-2 focus-within:ring-accent
        -500 focus-within:ring-offset-2 hover:border-gray-400"
        >
            <div className="flex-shrink-0 pl-2">
                <Image
                    src={leader.imageSrc}
                    alt="Profile Picture"
                    width={60}
                    height={60}
                    className="rounded-full border-4 border-white shadow-md"
                />
            </div>
            <div className="min-w-0 flex-1">
                <a href="#" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-lg font-medium color-primary text-gray-900 pl-5">{leader.name}</p>
                    <p className="text-base font-medium text-gray-500 pl-5">{leader.score}</p>
                </a>
            </div>
        </div>
    )
}

const RankingCard = ({ leader, index }) => {
    return (
        <div className="flex flex-row">
            <Rank rank={index} />
            <Leader leader={leader} />
        </div >
    )
};

export default RankingCard;