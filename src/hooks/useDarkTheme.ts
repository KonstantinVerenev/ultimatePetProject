import { useSelector } from 'react-redux';

import { selectDarkTheme } from '../store/selectors';

export const useDarkTheme = () => {
  const darkTheme = useSelector(selectDarkTheme);

  return darkTheme;
};
