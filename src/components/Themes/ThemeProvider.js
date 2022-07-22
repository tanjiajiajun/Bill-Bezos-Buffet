import React from 'react';
import {colors} from '../Colors';

export const ThemeContext = React.createContext();

const ThemeProvider = ({children}) => {
  const isLightTheme = true; // this is temporary, we will get back to it later

  const theme = {
    colors: isLightTheme ? colors.light : colors.dark,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;