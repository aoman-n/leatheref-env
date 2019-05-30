// import { User } from 'services/github/models';
import { User } from '../reducers/github';
import * as ActionType from './randomConstants';

export interface AddMembersParams {
  users: User[];
}

export interface AddMemberParams {
  user: User;
}

export interface RemoveMemberParams {
  userLogin: string;
}

interface ApointUserParams {
  user: User;
}

export const addMembers = (params: AddMembersParams) => ({
  type: ActionType.ADD_MEMBERS as typeof ActionType.ADD_MEMBERS,
  payload: { params },
});

export const addMember = (params: AddMemberParams) => ({
  type: ActionType.ADD_MEMBER as typeof ActionType.ADD_MEMBER,
  payload: { params },
});

export const removeMember = (params: RemoveMemberParams) => ({
  type: ActionType.REMOVE_MEMBER as typeof ActionType.REMOVE_MEMBER,
  payload: { params },
});

export const start = () => ({
  type: ActionType.START as typeof ActionType.START,
});

export const stop = (params: ApointUserParams) => ({
  type: ActionType.STOP as typeof ActionType.STOP,
  payload: { params },
});

export const apointUser = (params: ApointUserParams) => ({
  type: ActionType.APOINT_USER as typeof ActionType.APOINT_USER,
  payload: params,
});

export const clearApointUser = () => ({
  type: ActionType.CLEAR_APOINT_USER as typeof ActionType.CLEAR_APOINT_USER,
});

export type RandomAction =
  | ReturnType<typeof addMembers>
  | ReturnType<typeof addMember>
  | ReturnType<typeof removeMember>
  | ReturnType<typeof start>
  | ReturnType<typeof stop>
  | ReturnType<typeof apointUser>
  | ReturnType<typeof clearApointUser>;
