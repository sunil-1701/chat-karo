import "./chatroom-settings.styles.scss";

import { ReactComponent as CrossIcon } from "../../assets/cross.svg";
// import { ReactComponent as DeleteIcon } from "../../assets/deleteIcon.svg";
import { ReactComponent as EditIcon } from "../../assets/editIcon.svg";
import { ReactComponent as AddUser } from "../../assets/addUser.svg";
import { useEffect, useState } from "react";
import firebase, { firestore } from "../../firebase/firebase.utils";
import ChatroomUser from "../chatroom-user/chatroom-user.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUserId } from "../../redux/user/user.selectors";

const ChatroomSettings = ({ setHidden, activeChatroom, currentUserId }) => {
  const [liveChatroom, setLiveChatroom] = useState({});

  let unsubscribe;

  useEffect(() => {
    unsubscribe = firestore
      .doc(`chatrooms/${activeChatroom.chatroomId}`)
      .onSnapshot((snapshot) => {
        setLiveChatroom(snapshot.data());
      });

    return () => {
      console.log("unsubscibed");
      unsubscribe();
    };
  }, [activeChatroom]);

  const editDescription = async () => {
    const newDescription = prompt("Give this chat a name");

    if (newDescription?.length) {
      await firestore.doc(`chatrooms/${activeChatroom?.chatroomId}`).update({
        description: newDescription,
      });
    }
  };

  const addNewUser = async () => {
    const newUserId = prompt("Enter UserId of the new user.");

    if (newUserId.length === 0) return;

    const batch = firestore.batch();

    const chatroomRef = firestore.doc(`chatrooms/${activeChatroom.chatroomId}`);
    const userRef = firestore.doc(`users/${newUserId}`);

    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      alert("User Not Found");
      return;
    }

    try {
      batch.update(chatroomRef, {
        authorisedUsers: firebase.firestore.FieldValue.arrayUnion(newUserId),
      });

      batch.update(userRef, {
        authorisedChatRooms: firebase.firestore.FieldValue.arrayUnion(
          activeChatroom.chatroomId
        ),
      });

      await batch.commit();
    } catch (error) {
      console.log(error, "can't add users");
    }
  };

  return (
    <div className="chatroom-settings">
      <div className="settings-heading">
        <div className="cross" onClick={() => setHidden(true)}>
          <CrossIcon />
        </div>
        <div className="settings-heading-title">Group Info</div>
      </div>

      <div className="chatroom-description">
        <div className="controlls">
          <div className="title">Description</div>
          {currentUserId === activeChatroom.admin && (
            <div className="edit" onClick={editDescription}>
              <EditIcon />
            </div>
          )}
        </div>

        <div className="description-content">{liveChatroom?.description}</div>
      </div>

      <div className="chatroom-users">
        <div className="controlls">
          <div className="title">Users</div>
          {currentUserId === activeChatroom.admin && (
            <div className="edit" onClick={addNewUser}>
              <AddUser />
            </div>
          )}
        </div>

        <div className="user-content">
          {liveChatroom?.authorisedUsers?.map((userId, idx) => (
            <ChatroomUser
              key={idx}
              userId={userId}
              admin={liveChatroom?.admin}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUserId: selectCurrentUserId,
});

export default connect(mapStateToProps)(ChatroomSettings);
