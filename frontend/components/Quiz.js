import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import planet from "../public/images/planet-earth.png";
import sad from "../public/images/sad.png";


const Quiz = () => {
    // TODO: get score from user
    // TODO: save new score to backend
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(null);
    const [displayResult, setDisplayResult] = useState(false);

    const randomQuestion = [
        {
            questionText: 'What is the capital of France?',
            answerOptions: [
                { answerText: 'New York', isCorrect: false },
                { answerText: 'London', isCorrect: false },
                { answerText: 'Paris', isCorrect: true },
                { answerText: 'Dublin', isCorrect: false },
            ],
        }
    ];

    const handleAnswerClick = (isCorrect) => {
        // TODO: decide on score for correct answer
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
                <><div className="flex flex-col items-center py-6 h-screen bg-primary-100">
                    <div className="text-xl font-bold text-primary">
                        {randomQuestion[0].questionText}
                    </div>
                    <div className="flex flex-col pt-5">
                        {randomQuestion[0].answerOptions.map((answer) => (
                            <button
                                key={answer.answerText}
                                className="bg-secondary-500 w-full hover:bg-secondary-400 text-white font-bold py-2 px-4 border-b-4 border-secondary-700 hover:border-accent-500 rounded m-2"
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
            <div className="text-center">
                <h1 className="text-xl font-bold mb-2 text-secondary-400">CONGRATULATIONS!</h1>
                <p className="text-gray-600 text-md mb-4">You selected the correct answer!</p>
            </div>
            <div className="flex flex-col items-center">
                <Image
                    src={planet}
                    alt="Profile Picture"
                    width={60}
                    height={60}
                />
                <h1 className="text-xl font-bold pt-1 mb-2 text-green-300">+1 Point</h1>
            </div>
            <Link href="/" passHref legacyBehavior>
                <button class="bg-primary-300 text-white font-bold py-2 px-4 ml-10 mr-10 rounded opacity-50">
                    Back To Home
                </button>
            </Link>
        </>
    );
}

const FailedQuiz = () => {
    return (
        <>
            <div className="text-center">
                <h1 className="text-xl font-bold mb-2 text-red-400">Ouppss...</h1>
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
            </div>
            <Link href="/" passHref legacyBehavior>
                <button class="bg-accent-300 text-grey-700 font-bold py-2 px-4 ml-10 mr-10 rounded opacity-50">
                    Back To Home
                </button>
            </Link>
        </>
    )
}



export default Quiz; 