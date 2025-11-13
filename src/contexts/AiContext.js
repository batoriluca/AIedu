import { createContext, useContext, useState } from 'react';

const AiContext = createContext();

export const useAi = () => useContext(AiContext);

export const AiProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  const addToHistory = (item) => {
    setHistory(prev => [...prev, item]);
  };

  return (
    <AiContext.Provider value={{ history, addToHistory }}>
      {children}
    </AiContext.Provider>
  );
};