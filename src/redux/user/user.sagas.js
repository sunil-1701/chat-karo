import { takeLatest, put, all, call, select } from "redux-saga/effects";
import {
  auth,
  createUserProfileDocument,
  firestore,
  getCurrentUser,
  signInWithGoogle,
} from "../../firebase/firebase.utils";
import { fetchChatroomsStart } from "../chatrooms/chatroom.actions";
import {
  setUserToNull,
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
  updateLocalUser,
} from "./user.actions";
import { selectCurrentUser } from "./user.selectors";
import UserActionTypes from "./user.types";

// Handling signIn with google

// setting local state and making data consistent with firestore
export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();

    // invoking success call
    yield put(signInSuccess());
    yield put(updateLocalUser({ ...userSnapshot.data() }));

    // starting fetching chatrooms for the user as the user signs in
    yield put(fetchChatroomsStart());
  } catch (error) {
    // invoking failure call
    yield put(signInFailure(error));
  }
}

export function* signInStart() {
  try {
    // getting the userAuth object
    const userAuth = yield signInWithGoogle();
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    // invoking failure call
    yield put(signInFailure(error));
  }
}

export function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signInStart);
}

// checking current user for session persistence

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) {
      yield put(setUserToNull());
    } else {
      yield getSnapshotFromUserAuth(userAuth);
    }
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

// handling signout
export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* onSignOutStart() {
  yield console.log("hello");
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

// Handling modifying data for the user

// handling addition of adminchatrooms
export function* updateUserAdminChats({ payload: { id } }) {
  const currentUser = yield select(selectCurrentUser);
  const { uid, adminOfChatRooms, authorisedChatRooms } = currentUser;
  const userRef = firestore.collection("users").doc(uid);
  const userSnapshot = yield userRef.get();
  if (userSnapshot.exists) {
    try {
      yield userRef.update({
        adminOfChatRooms: [...adminOfChatRooms, id],
        authorisedChatRooms: [...authorisedChatRooms, id],
      });
      const newUserRef = firestore.collection("users").doc(uid);
      const newSnapShot = yield newUserRef.get();
      yield put(updateLocalUser({ ...newSnapShot.data() }));
      yield put(fetchChatroomsStart());
    } catch (error) {
      console.log(error);
    }
  }
}

export function* onUpdateUserAdminChats() {
  yield takeLatest(
    UserActionTypes.UPDATE_USER_ADMINCHATS,
    updateUserAdminChats
  );
}

// creating a local saga from all the different sagas and exporting

export function* userSagas() {
  yield all([
    call(onSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onUpdateUserAdminChats),
  ]);
}
