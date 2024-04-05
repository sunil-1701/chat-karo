import ChatRoomActionTypes from "./chatroom.types";

const INITIAL_STATE = {
  chatrooms: [],
  error: null,
  activeChatroom: null,
  activeChatroomMessages: [],
};

const chatroomReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ChatRoomActionTypes.FETCH_CHATROOMS_SUCCESS:
      return {
        ...state,
        chatrooms: [...action.payload],
        error: null,
      };

    case ChatRoomActionTypes.CHATROOM_MODIFICATION_FAILURE:
    case ChatRoomActionTypes.FETCH_CHATROOMS_FAILURE:
      return {
        ...state,
        error: null,
      };

    case ChatRoomActionTypes.CHANGE_ACTIVE_CHATROOM:
      return {
        ...state,
        activeChatroomMessages: [],
        activeChatroom: { ...action.payload },
      };

    case ChatRoomActionTypes.SET_ACTIVE_CHATROOM_MESSAGES:
      return {
        ...state,
        activeChatroomMessages: [...action.payload],
      };

    default:
      return state;
  }
};

export default chatroomReducer;
