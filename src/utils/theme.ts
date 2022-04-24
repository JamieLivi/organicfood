import {DefaultTheme, DarkTheme, configureFonts} from 'react-native-paper';

export const semiBoldFont = 'Montserrat-SemiBold';
export const mediumFont = 'Montserrat-Medium';
export const regularFont = 'Montserrat-Regular';
export const lightFont = 'Montserrat-Light';
export const thinFont = 'Montserrat-Thin';

const fontConfig = {
  web: {
    regular: {
      fontFamily: regularFont,
    },
    medium: {
      fontFamily: mediumFont,
    },
    light: {
      fontFamily: lightFont,
    },
    thin: {
      fontFamily: thinFont,
    },
  },
  ios: {
    regular: {
      fontFamily: regularFont,
    },
    medium: {
      fontFamily: mediumFont,
    },
    light: {
      fontFamily: lightFont,
    },
    thin: {
      fontFamily: thinFont,
    },
  },
  android: {
    regular: {
      fontFamily: regularFont,
    },
    medium: {
      fontFamily: mediumFont,
    },
    light: {
      fontFamily: lightFont,
    },
    thin: {
      fontFamily: thinFont,
    },
  },
};

const fonts = configureFonts(fontConfig);

const baseColors = {
  primary: '#FDC501',
  accent: '#6A0F59',
};

export const lightBackground = '#f6f6f6';
export const lightBackgroundTransparent = 'rgba(246, 246, 246, 0.2)';
export const darkBackground = '#121212';
export const darkBackgroundTransparent = 'rgba(18,18,18,0.2)';
export const lightSurface = '#ffffff';
export const darkSurface = '#121212';

export const lightTheme = {
  ...DefaultTheme,

  roundness: 10,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    ...baseColors,
    backgrounddarker: '#dedede',
    onSurface: '#2b2b2b',
    backdrop: 'rgba(0, 0, 0, 0.2)',
  },
  fonts,
};

export const darkTheme = {
  ...DarkTheme,
  roundness: 10,
  colors: {
    ...DarkTheme.colors,
    ...baseColors,
  },
  fonts,
  dark: true,
};
