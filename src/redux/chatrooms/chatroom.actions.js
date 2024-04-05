import ChatRoomActionTypes from "./chatroom.types";

// defining actions for chatrooms

export const fetchChatroomsStart = () => ({
  type: ChatRoomActionTypes.FETCH_CHATROOMS_START,
});

export const fetchChatroomsSuccess = (chatrooms) => ({
  type: ChatRoomActionTypes.FETCH_CHATROOMS_SUCCESS,
  payload: chatrooms,
});

export const fetchChatroomsFailure = (error) => ({
  type: ChatRoomActionTypes.FETCH_CHATROOMS_FAILURE,
  payload: error,
});

export const addChatroom = (chatroom) => ({
  type: ChatRoomActionTypes.ADD_CHATROOM,
  payload: chatroom,
});

export const removeChatroom = (chatroom) => ({
  type: ChatRoomActionTypes.REMOVE_CHATROOM,
  payload: chatroom,
});

export const chatroomModificationSuccess = () => ({
  type: ChatRoomActionTypes.CHATROOM_MODIFICATION_SUCCESS,
});

export const chatroomModificationFailure = (error) => ({
  type: ChatRoomActionTypes.CHATROOM_MODIFICATION_FAILURE,
  payload: error,
});

export const changeActiveChatroom = (chatroom) => ({
  type: ChatRoomActionTypes.CHANGE_ACTIVE_CHATROOM,
  payload: chatroom,
});

export const setActiveChatroomMessages = (messages) => ({
  type: ChatRoomActionTypes.SET_ACTIVE_CHATROOM_MESSAGES,
  payload: messages,
});
