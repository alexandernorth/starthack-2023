import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ name, score, role, workplace, children }) => {
  const [user, setUser] = useState({ name, score, role, workplace });

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
