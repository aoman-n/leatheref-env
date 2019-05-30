import { AxiosError } from 'axios';

import * as ActionType from './githubConstants';
// import { User } from '../services/github/models';
import { User } from '../reducers/github';

interface GetMembersParams {
  organizationName: string;
}

interface GetMembersResult {
  users: User[];
}

export const getMembers = {
  start: (params: GetMembersParams) => ({
    type: ActionType.GET_MEMBERS_START as typeof ActionType.GET_MEMBERS_START,
    payload: { params },
  }),
  succeed: (params: GetMembersParams, result: GetMembersResult) => ({
    type: ActionType.GET_MEMBERS_SUCCEED as typeof ActionType.GET_MEMBERS_SUCCEED,
    payload: { params, result },
  }),
  fail: (params: GetMembersParams, error: AxiosError) => ({
    type: ActionType.GET_MEMBERS_FAIL as typeof ActionType.GET_MEMBERS_FAIL,
    payload: { params, error },
    error: true,
  }),
};

export interface SearchUserParams {
  q: string;
}

interface SearchUserResult {
  users: User[];
}

export const searchUser = {
  start: (params: SearchUserParams) => ({
    type: ActionType.SEARCH_USER_START as typeof ActionType.SEARCH_USER_START,
    payload: { params },
  }),
  succeed: (params: SearchUserParams, result: SearchUserResult) => ({
    type: ActionType.SEARCH_USER_SUCCEED as typeof ActionType.SEARCH_USER_SUCCEED,
    payload: { params, result },
  }),
  fail: (params: SearchUserParams, error: AxiosError) => ({
    type: ActionType.SEARCH_USER_FAIL as typeof ActionType.SEARCH_USER_FAIL,
    payload: { params, error },
    error: true,
  }),
};

export const clear = () => ({
  type: ActionType.CLEAR as typeof ActionType.CLEAR,
});

export type GithubActoion =
  | ReturnType<typeof getMembers.start>
  | ReturnType<typeof getMembers.succeed>
  | ReturnType<typeof getMembers.fail>
  | ReturnType<typeof searchUser.start>
  | ReturnType<typeof searchUser.succeed>
  | ReturnType<typeof searchUser.fail>
  | ReturnType<typeof clear>;
