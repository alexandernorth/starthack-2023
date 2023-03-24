import React from "react";
import Image from "next/image";
import salad from "../public/images/salad.png";
import saladSmall from "../public/images/saladSmall.png";
import saladPurple from "../public/images/saladPurple.png";
import popcorn from "../public/images/popcorn.png";
import { Divider } from "@mui/material";

const team = [
    {
        name: 'Jane Cooper',
        role: 'Truck Driver',
        imageSrc: saladSmall,
    },
    {
        name: 'Gabriella Matts',
        role: 'IT Architect',
        imageSrc: saladPurple,
    },
    {
        name: 'Janusch Kowalski',
        role: 'Processengineer',
        imageSrc: popcorn,
    }
]

const Profile = () => {
    return (
        <div className='bg-landscape bg-no-repeat bg-cover bg-center bg-fixed pt-40 max-w-md'>
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <div className="relative mb-6">
                    <div className="absolute top-0 left-0 -mt-14">
                        <Image
                            src={salad}
                            alt="Profile Picture"
                            width={100}
                            height={100}
                            className="rounded-full border-4 border-white shadow-md"
                        />
                    </div>
                </div>
                <div className="text-center">
                    <h1 className="text-xl font-bold mb-2">Geoff Jeffers</h1>
                    <p className="text-gray-600 text-sm mb-4"><em>Role:</em> Sales Representative</p>

                </div>
                <div className="flex justify-around mt-6">
                    <div className="text-center">
                        <h2 className="text-primary-600 text-sm font-bold">Current</h2>
                        <p className="text-primary-500 text-lg font-bold">1st Place</p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-gray-600 text-sm font-bold">Last Month</h2>
                        <p className="text-gray-700 text-lg font-bold">Finished 4th</p>
                    </div>
                </div>
                <Divider sx={{ mt: 2 }} />
                {/* Team member list */}
                <div className="mx-auto mt-4 max-w-5xl px-2 pb-12 sm:px-6 lg:px-8">
                    <h2 className="text-sm font-medium text-gray-500">Team members</h2>
                    <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {team.map((person) => (
                            <div
                                key={person.name}
                                className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2 hover:border-gray-400"
                            >
                                <div className="flex-shrink-0">
                                    <Image
                                        src={person.imageSrc}
                                        alt="Profile Picture"
                                        width={60}
                                        height={60}
                                        className="rounded-full border-4 border-white shadow-md"
                                    />
                                </div>
                                <div className="min-w-0 flex-1 pl-5">
                                    <a href="#" className="focus:outline-none">
                                        <span className="absolute inset-0" aria-hidden="true" />
                                        <p className="text-sm font-medium text-gray-900">{person.name}</p>
                                        <p className="truncate text-sm text-gray-500">{person.role}</p>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
