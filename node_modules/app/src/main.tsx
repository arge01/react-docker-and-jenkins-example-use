import ReactDOM from 'react-dom/client';

import createStore from '@/redux/store';
import { Provider } from 'react-redux';
export const store = createStore();

import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
