import { createSelector } from "reselect";

const selectMessages = (state) => state.messages;

export const selectCurrentChatroomMessages = createSelector(
  [selectMessages],
  (messages) => messages.messages
);
