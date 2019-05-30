import { fork, put, all, call, takeLatest } from 'redux-saga/effects';
import * as Actions from '../actions/githubConstants';
import { getMembers, searchUser } from '../actions/github';
import { getMembersFactory, searchUserFactory } from '../services/github/api';

function* runGetMembers(action: ReturnType<typeof getMembers.start>) {
  const { organizationName } = action.payload.params;
  const api = getMembersFactory();

  try {
    const users = yield call(api, organizationName);
    yield put(getMembers.succeed({ organizationName }, { users }));
  } catch (error) {
    yield put(getMembers.fail({ organizationName }, error));
  }
}

function* runSearchUser(action: ReturnType<typeof searchUser.start>) {
  const { q } = action.payload.params;
  const api = searchUserFactory();

  try {
    const users = yield call(api, q);
    yield put(searchUser.succeed({ q }, { users }));
  } catch (error) {
    yield put(searchUser.fail({ q }, error));
  }
}

function* getMembersStartWatcher() {
  yield takeLatest(Actions.GET_MEMBERS_START, runGetMembers);
}

function* searchUserStartWatcher() {
  yield takeLatest(Actions.SEARCH_USER_START, runSearchUser);
}

export default function* rootSaga() {
  yield all([fork(getMembersStartWatcher), fork(searchUserStartWatcher)]);
}
