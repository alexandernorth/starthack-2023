import React, { createContext, useState } from 'react';
import { updateActiveTile } from '@/app/utils/BoardUtils';

export const BoardContext = createContext();

export const BoardProvider = ({ initialBoard, children }) => {
  const [board, setBoard] = useState(initialBoard);

  const updateActive = (score) => {
    let newBoard = updateActiveTile(board, score);
    setBoard(newBoard);
  };

  return (
    <BoardContext.Provider value={{ board, updateActive }}>
      {children}
    </BoardContext.Provider>
  );
};
