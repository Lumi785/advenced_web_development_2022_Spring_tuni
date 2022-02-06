/** @format STORE */

import { createStore, combineReducers } from 'redux';
import { playersReducer } from './reducers/playersReducer';

//TODO: store and reducers
const store = createStore(playersReducer);
export default store;



