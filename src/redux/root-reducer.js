import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import chatroomReducer from "./chatrooms/chatroom.reducer";
import messagesReducer from "./messages/messages.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  chatrooms: chatroomReducer,
  messages: messagesReducer,
});

export default rootReducer;
