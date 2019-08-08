import { reduceReducers } from './reduxUtils';
import initialState from './intialState';
import simple from './reducers/simple';

const reducers = reduceReducers(initialState, simple);

export default reducers;
