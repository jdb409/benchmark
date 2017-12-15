import { createStore, applyMiddleWare, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware } from 'redux';

import { percentile } from './percentile';

const reducer = combineReducers({ percentile });

const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))

const store = createStore(reducer, middleware);

export default store;