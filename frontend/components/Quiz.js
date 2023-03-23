import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import planet from "../public/images/planet-earth.png";
import sad from "../public/images/sad.png";


const Quiz = ({ question }) => {
    // TODO: get score from user
    // TODO: save new score to backend
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(null);
    const [displayResult, setDisplayResult] = useState(false);

    const handleAnswerClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
            setResult(true);
        } else {
            setScore(score - 1);
            setResult(false);
        }
        setDisplayResult(true);
    };



    return (
        <>
            {displayResult ? <>{result ? <SuccessQuiz /> : <FailedQuiz />}</>
                :
                <><div className="flex flex-col items-center py-20 h-screen bg-primary-100">
                    <div className="text-xl font-bold text-primary text-center">
                        {question.questionText}
                    </div>
                    <div className="flex flex-col pt-5">
                        {question.answerOptions.map((answer) => (
                            <button
                                key={answer.answerText}
                                className="bg-secondary-500 hover:bg-secondary-400 text-white font-bold py-2 px-4 border-b-4 border-secondary-700 hover:border-accent-500 rounded m-2"
                                onClick={() => handleAnswerClick(answer.isCorrect)}>
                                {answer.answerText}
                            </button>
                        ))}
                    </div>
                </div>
                </>
            }
        </>
    );
}

const SuccessQuiz = () => {
    return (
        <>
            <div className="bg-primary-100 pb-10">
                <div className="text-center">
                    <h1 className="text-xl font-bold pt-20 mb-2 text-secondary-400">CONGRATULATIONS!</h1>
                    <p className="text-gray-600 text-md mb-4">You selected the correct answer!</p>
                </div>
                <div className="flex flex-col items-center">
                    <Image
                        src={planet}
                        alt="Profile Picture"
                        width={60}
                        height={60}
                    />
                    <h1 className="text-xl font-bold mt-2 mb-2 text-green-700">+1 Point</h1>
                    <Link href="/" passHref legacyBehavior>
                        <button class="mt-4 bg-primary-300 text-white font-bold py-2 px-4 ml-10 mr-10 rounded opacity-50">
                            Back To Home
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

const FailedQuiz = () => {
    return (
        <div className="bg-primary-100 pb-10">
            <div className="text-center">
                <h1 className="text-xl font-bold pt-20 mb-2 text-red-400">Ouppss...</h1>
                <p className="text-gray-600 text-md mb-4">You selected an incorrect answer!</p>
            </div>
            <div className="flex flex-col items-center">
                <Image
                    src={sad}
                    alt="Profile Picture"
                    width={60}
                    height={60}
                />
                <h1 className="text-xl font-bold pt-1 mb-2 text-red-300">-1 Point</h1>
                <Link href="/" passHref legacyBehavior>
                    <button class="mt-4 bg-accent-300 text-grey-700 font-bold py-2 px-4 ml-10 mr-10 rounded opacity-50">
                        Back To Home
                    </button>
                </Link>
            </div>
        </div>
    )
}



export default Quiz; 