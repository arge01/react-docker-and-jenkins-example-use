import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

const configureStore = () => {
  const middleware = [thunk];

  let enhancer = applyMiddleware(...middleware);

  if (process.env.NODE_ENV !== 'production') {
    enhancer = composeWithDevTools(applyMiddleware(...middleware));
  } else {
    enhancer = applyMiddleware(...middleware);
  }

  return createStore(reducers, enhancer);
};

export default configureStore;
