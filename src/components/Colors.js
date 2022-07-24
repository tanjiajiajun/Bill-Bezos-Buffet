// move common values used in styling across your application to a single place in the project. This allows you to change a single line
//of code to immediately impact on  the appearance of the entire application and will prevent any mismatch that arises as a result of simply forgetting about some files

//In the styles directory, in a colors.js file you can declare a palette for the whole application and then assign these colors to their 
//own function. The naming is crucial and should rather reflect the overall purpose of the  color. You don’t want to be too specific here
//and declare color names like “HomeScreenTitle” or “SettingsSecondRowText”. Choose names like “Title” or “SecondaryText” that will
//work for all components and not only a specific one. I’m going to move colors from HomeScreen here and declare their names according to
//this principle. You can create only a single theme, but I’m going to create a light and a dark theme that we can switch between later.
//There is also an object for the common  colors that both themes use.

import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

const White = '#fff';
const Black = '#000000'
const Yahoo_Purple = '#f1c40f';
const Yahoo_Purple_Intense = '#5000ca';
const LongYesGreen = '#32CD32';
const ShortNoRed = '#DC143C';
const GreyHolder = '#F2F2F2';
const WineRed = '#840B55';
const HotPink = '#ec296d';
const MustardYellow = "#D3F33D";

const lightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: White,
    },
  };

const darkTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: Black,
    },
  };

export const colors = {lightTheme, darkTheme};