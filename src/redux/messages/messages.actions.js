import MessagesActionTypes from "./messages.types";

export const updateMessages = (messages) => ({
  type: MessagesActionTypes.MESSAGES_UPDATED,
  payload: messages,
});
