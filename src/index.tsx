import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.scss';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from './store';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <MantineProvider theme={{ fontFamily: 'Verdana' }} withNormalizeCSS>
    <Provider store={store}>
      <App />
    </Provider>
  </MantineProvider>
);
