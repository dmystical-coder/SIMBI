'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7A5FFF',
      light: '#9385FF',
      dark: '#5E30F7',
      contrastText: '#FDFDFF',
    },
    secondary: {
      main: '#4976F4',
      contrastText: '#FDFDFF',
    },
    text: {
      primary: '#1E1E2F',
      secondary: '#6B7280',
      disabled: 'rgba(30, 30, 47, 0.46)',
    },
    background: {
      default: '#FDFDFF',
      paper: '#E4DFFF',
    },
    grey: {
      50: '#FDFDFF',
      100: '#F3F2FF',
      200: '#E9E8FF',
      300: '#D2D0DE',
      400: '#C9C0D4',
      500: '#666666',
    },
    divider: 'rgba(102, 102, 102, 0.25)',
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;