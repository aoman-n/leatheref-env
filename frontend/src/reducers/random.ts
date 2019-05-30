import { Reducer } from 'redux';
// import { User } from 'services/github/models';
import * as ActionType from 'actions/randomConstants';
import { RandomAction } from 'actions/random';
import { User } from './github';

export interface RandomState {
  users: User[];
  isActive: boolean;
  apointUser: User | null;
}

const initialState: RandomState = {
  users: [],
  isActive: false,
  apointUser: null,
};

const randomReducer: Reducer<RandomState, RandomAction> = (
  state: RandomState = initialState,
  action: RandomAction,
) => {
  switch (action.type) {
    case ActionType.ADD_MEMBERS: {
      /* 重複をチェックしユーザーを追加 */
      const { users } = action.payload.params;
      const checkedUsers: User[] = users.filter(
        u => !state.users.some(uu => uu.id === u.id),
      );

      return {
        ...state,
        users: [...state.users, ...checkedUsers],
      };
    }
    case ActionType.ADD_MEMBER: {
      /* 重複をチェックしユーザーを追加 */
      const { user } = action.payload.params;
      const exists: boolean = state.users.some(u => u.id === user.id);
      const newUsers: User[] = exists ? state.users : [...state.users, user];

      return {
        ...state,
        users: newUsers,
      };
    }
    case ActionType.REMOVE_MEMBER:
      return {
        ...state,
        users: state.users.filter(
          user => user.login !== action.payload.params.userLogin,
        ),
      };
    case ActionType.START:
      return {
        ...state,
        isActive: true,
        apointUser: null,
      };
    case ActionType.STOP:
      return {
        ...state,
        isActive: false,
        apointUser: action.payload.params.user,
      };
    case ActionType.APOINT_USER:
      return {
        ...state,
        apointUser: action.payload.user,
      };
    case ActionType.CLEAR_APOINT_USER:
      return {
        ...state,
        apointUser: null,
      };
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action;

      return state;
    }
  }
};

export default randomReducer;
