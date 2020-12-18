import { createStore, combineReducers } from 'redux';
import reducer from './Reducer';

const combinedReducers = combineReducers({
    task1 : reducer
})
const store = createStore(combinedReducers);

export default store;
