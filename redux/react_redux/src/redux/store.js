/** @format STORE */

import { createStore, combineReducers } from 'redux';
import { playersReducer } from './reducers/playersReducer';

//TODO: store and reducers
const reducers = combineReducers({
    players: playersReducer
})
const store = createStore(reducers);
       
//for debugging, because every time the stored change, subscribe will be called automatically
store.subscribe(()=>{
    console.log("store changed ", store.getState());
})
console.log("store.getState()= ", store.getState());

export default store;


