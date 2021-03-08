import { combineReducers } from 'redux';

import { mainReducer } from './main.reducer';
import { commonReducer } from './common.reducer';

export const rootReducer = combineReducers({
  common: commonReducer,
  main: mainReducer,
});
