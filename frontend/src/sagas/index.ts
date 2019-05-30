import { fork } from 'redux-saga/effects';
import github from './github';

export default function* rootSaga() {
  yield fork(github);
}
