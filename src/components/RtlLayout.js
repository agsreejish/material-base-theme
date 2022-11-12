import PropTypes from 'prop-types';
import { useEffect } from 'react';
// emotion
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
// material
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

RtlLayout.propTypes = {
  children: PropTypes.node
};

export default function RtlLayout({ children }) {
  const theme = useTheme();

  useEffect(() => {
    document.dir = theme.direction;
  }, [theme.direction]);

  const cache = createCache({
    key: theme.direction === 'rtl' ? 'rtl' : 'css',
    prepend: true,
  });

  cache.compat = true;

  return (
    <CacheProvider value={cache}>
      {children}
    </CacheProvider>
  );
}
