import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ name, score, role, workplace, children }) => {
  const [user, setUser] = useState({ name, score, role, workplace });

  const addScore = (score) => {
    setUser({ ...user, score: user.score + score });
  };

  return (
    <UserContext.Provider value={{ user, addScore }}>
      {children}
    </UserContext.Provider>
  );
};
