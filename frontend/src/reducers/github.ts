import { AxiosError } from 'axios';
import { Reducer } from 'redux';
// import { User } from '../services/github/models';
import * as ActionType from '../actions/githubConstants';
import { GithubActoion } from '../actions/github';

export interface User {
  id: number;
  login: string;
  avatarUrl: string;
}

export interface GithubState {
  organizationName: string;
  users: User[];
  isLoading: boolean;
  error?: AxiosError | null;
}

const initialState: GithubState = {
  organizationName: '',
  users: [],
  isLoading: false,
};

const githubReducer: Reducer<GithubState, GithubActoion> = (
  state: GithubState = initialState,
  action: GithubActoion,
) => {
  switch (action.type) {
    case ActionType.GET_MEMBERS_START:
      return {
        ...state,
        users: [],
        isLoading: true,
      };
    case ActionType.GET_MEMBERS_SUCCEED:
      return {
        ...state,
        organizationName: action.payload.params.organizationName,
        users: action.payload.result.users,
        isLoading: false,
      };
    case ActionType.GET_MEMBERS_FAIL:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case ActionType.SEARCH_USER_START:
      return {
        ...state,
        users: [],
        isLoading: true,
      };
    case ActionType.SEARCH_USER_SUCCEED:
      return {
        ...state,
        users: action.payload.result.users,
        isLoading: false,
      };
    case ActionType.SEARCH_USER_FAIL:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case ActionType.CLEAR:
      return initialState;
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action;

      return state;
    }
  }
};

export default githubReducer;
