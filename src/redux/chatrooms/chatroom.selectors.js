import { createSelector } from "reselect";

export const selectChatrooms = (state) => state.chatrooms;

export const selectAuthorisedChatrooms = createSelector(
  [selectChatrooms],
  (chatrooms) => chatrooms.chatrooms
);

export const selectActiveChatRoom = (chatroomIdUrlParam) =>
  createSelector([selectAuthorisedChatrooms], (array) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].chatroomId === chatroomIdUrlParam) return array[i];
    }
  });

export const selectSetActiveChatRoom = createSelector(
  [selectChatrooms],
  (chatrooms) => chatrooms.activeChatroom
);
