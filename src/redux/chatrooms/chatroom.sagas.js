import { takeLatest, put, all, call, select } from "redux-saga/effects";
import {
  createChatroomDocument,
  firebaseFetchChatRoom,
  // firestore,
} from "../../firebase/firebase.utils";
import { updateUserAdminChats } from "../user/user.actions";
import { selectCurrentUser } from "../user/user.selectors";
import {
  chatroomModificationFailure,
  fetchChatroomsFailure,
  fetchChatroomsSuccess,
} from "./chatroom.actions";
import ChatRoomActionTypes from "./chatroom.types";

// Handling fetching chatrooms

export function* fetchChatroomsStart() {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
      const chatrooms = [];

      // Fetching chatrooms from user's authorised chatrooms

      for (let i = 0; i < currentUser.authorisedChatRooms.length; i++) {
        const temp = yield firebaseFetchChatRoom(
          currentUser.authorisedChatRooms[i]
        );
        yield chatrooms.push(temp);
      }

      yield put(fetchChatroomsSuccess(chatrooms));
    } catch (error) {
      yield put(fetchChatroomsFailure(error));
    }
  }
}

export function* onFetchChatroomsStart() {
  yield takeLatest(
    ChatRoomActionTypes.FETCH_CHATROOMS_START,
    fetchChatroomsStart
  );
}

// adding chatRooms

export function* addChatroom({ payload }) {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
      const { id } = yield createChatroomDocument(payload);
      yield put(updateUserAdminChats({ id }));
    } catch (error) {
      yield console.log(error);
      yield put(chatroomModificationFailure(error));
    }
  }
}

export function* onAddChatroom() {
  yield takeLatest(ChatRoomActionTypes.ADD_CHATROOM, addChatroom);
}

// createing a local saga from all the above different sagas
export function* chatroomsSagas() {
  yield all([call(onAddChatroom), call(onFetchChatroomsStart)]);
}
