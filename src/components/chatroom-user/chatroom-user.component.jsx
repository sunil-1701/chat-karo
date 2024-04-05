import "./chatroom-user.styles.scss";
import { ReactComponent as DeleteIcon } from "../../assets/deleteIcon.svg";
import { useEffect, useState } from "react";
import firebase, { firestore } from "../../firebase/firebase.utils";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectSetActiveChatRoom } from "../../redux/chatrooms/chatroom.selectors";

const ChatroomUser = ({
  userId,
  admin,
  currentUserId,
  activeChatroom: { chatroomId },
}) => {
  const [user, setUser] = useState({});

  const { photoURL, displayName, uid } = user;

  useEffect(() => {
    const fetchUser = async () => {
      setUser((await firestore.doc(`users/${userId}`).get()).data());
    };
    fetchUser();
  }, [userId]);

  const removeUserFromChatroom = async () => {
    const batch = firestore.batch();

    const chatroomRef = firestore.doc(`chatrooms/${chatroomId}`);
    const userRef = firestore.doc(`users/${userId}`);

    try {
      batch.update(chatroomRef, {
        authorisedUsers: firebase.firestore.FieldValue.arrayRemove(userId),
      });

      batch.update(userRef, {
        authorisedChatRooms: firebase.firestore.FieldValue.arrayRemove(
          chatroomId
        ),
      });

      batch.commit();
    } catch (error) {}
  };

  return (
    <>
      <div className="chatroom-user">
        <div className="profile-image-container">
          <img className="profile-image" src={photoURL} alt="profile" />
        </div>
        <div className="display-name">{displayName}</div>
        {uid === admin ? (
          <div className="admin-tag">admin</div>
        ) : (
          currentUserId === admin && (
            <div className="delete-icon" onClick={removeUserFromChatroom}>
              <DeleteIcon />
            </div>
          )
        )}
      </div>
      <div className="line"></div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUserId: selectCurrentUserId,
  activeChatroom: selectSetActiveChatRoom,
});

export default connect(mapStateToProps)(ChatroomUser);
