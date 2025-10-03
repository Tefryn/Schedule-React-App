import { createContext, useContext } from 'react';

interface TitleContextType {
  title: string;
}

export const TitleContext = createContext<TitleContextType>(null!);

export const useTitle = () => {
  return useContext(TitleContext);
};