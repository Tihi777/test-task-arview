import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

const middleware = [thunk];

const getUserEventsFromStorage = JSON.parse(localStorage.getItem('userEvents')) || {};

const preloadedState = { events: { eventList: getUserEventsFromStorage } };

const composeMiddleware = () => {
  const appliedMiddleware = applyMiddleware(...middleware);

  if (BUILD_TYPE === 'DEVELOPMENT') {
    return composeWithDevTools(appliedMiddleware);
  } else {
    return appliedMiddleware;
  }
};

export default createStore(rootReducer, preloadedState, composeMiddleware());
