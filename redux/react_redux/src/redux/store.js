/** @format STORE */

import { createStore, combineReducers } from 'redux';
import { playersReducer } from './reducers/playersReducer';

//TODO: store and reducers
const store = createStore(playersReducer);

store.subscribe(()=>{
    console.log("store changed ", store.getState())
})


console.log("store.getState()= ", store.getState());
export default store;



