import React, { createContext, useState } from 'react';
import {patchDefaultUserScore} from "@/pages/api/user";

export const UserContext = createContext(null);

export const UserProvider = ({ name, score, role, workplace, children }) => {
  const [user, setUser] = useState({ name, score, role, workplace });

  const addScore = (score) => {
    patchDefaultUserScore(user.score+score).then(function (updatedUser) {
      setUser({...user, score: updatedUser.score});
    })
  };

  return (
    <UserContext.Provider value={{ user, addScore }}>
      {children}
    </UserContext.Provider>
  );
};
