import { useSelector } from 'react-redux';

import { RootState } from '../store';

export const useDarkTheme = () => {
  const darkTheme = useSelector((state: RootState) => state.app.darkTheme);

  return darkTheme;
};
