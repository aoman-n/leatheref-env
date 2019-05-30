import { combineReducers } from 'redux';
import github, { GithubState } from './github';
import random, { RandomState } from './random';

export interface RootStateType {
  github: GithubState;
  random: RandomState;
}

export default combineReducers({
  github,
  random,
});
