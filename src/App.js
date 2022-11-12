// redux
import { store, persistor } from './redux/store';
import { Provider } from 'react-redux';

// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import RtlLayout from './components/RtlLayout';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingScreen from './components/LoadingScreen';

// fakeAPIs
import './fakeApi';

// ----------------------------------------------------------------------

export default function App() {

  return (
    <Provider store={store}>
      <PersistGate
        loading={<LoadingScreen
          sx={{
            top: 0,
            left: 0,
            width: 1,
            zIndex: 9999,
            position: 'fixed'
          }}
        />}
        persistor={persistor}>
        <ThemeConfig>
          <RtlLayout>
            <Router />
          </RtlLayout>
        </ThemeConfig>
      </PersistGate>
    </Provider>
  );
}
