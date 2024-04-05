import { all, call } from "redux-saga/effects";
import { chatroomsSagas } from "./chatrooms/chatroom.sagas";
import { userSagas } from "./user/user.sagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(chatroomsSagas)]);
}
