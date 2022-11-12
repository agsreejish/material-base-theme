import PropTypes from 'prop-types';
import { useMemo } from 'react';
// material
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';

// ----------------------------------------------------------------------
import palette from './palette';
import shadows, { customShadows } from './shadows';
import typography from './typography';
// ----------------------------------------------------------------------

ThemeConfig.propTypes = {
  children: PropTypes.node
};

export default function ThemeConfig({ children }) {
  const isLight = true; 
  const themeOptions = useMemo(
    () => ({ 
      palette: isLight ? { ...palette.light, mode: 'light' } : { ...palette.dark, mode: 'dark' }, 
      typography,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark
    }),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  ); 

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
