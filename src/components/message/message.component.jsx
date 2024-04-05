import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUserId } from "../../redux/user/user.selectors";
import { firestore } from "../../firebase/firebase.utils";
import { ReactComponent as WhiteMeeting } from "../../assets/whiteMeeting.svg";
import "./message.styles.scss";

const Message = ({ message, currentUserId }) => {
  const { content, sentByUser, type } = message;

  const [user, setUser] = useState({});
  const { photoURL } = user;

  useEffect(() => {
    const fetchUser = async () => {
      setUser((await firestore.doc(`users/${sentByUser}`).get()).data());
    };
    fetchUser();
  }, [sentByUser]);

  const textMessage =
    currentUserId === sentByUser ? (
      <div className="right-box box">
        <div className="message-content">{content}</div>
        <div className="profile-image-container">
          <img className="profile-image" src={photoURL} alt="profile" />
        </div>
      </div>
    ) : (
      <div className="left-box box">
        <div className="profile-image-container">
          <img className="profile-image" src={photoURL} alt="profile" />
        </div>
        <div className="message-content">{content}</div>
      </div>
    );

  const meetingMessage =
    currentUserId === sentByUser ? (
      <div className="right-box box">
        <div className="message-content meeting-box">
          <div className="meeting-heading">Meeting</div>
          <div className="meeting-container">
            <div className="date-container">
              <div className="date-title">Date</div>
              <div className="value">{content[0]}</div>
            </div>

            <div className="date-container">
              <div className="date-title">Date</div>
              <div className="value">{content[1]}</div>
            </div>
            <div className="meeting-icon">
              <WhiteMeeting />
            </div>
          </div>
        </div>
        <div className="profile-image-container">
          <img className="profile-image" src={photoURL} alt="profile" />
        </div>
      </div>
    ) : (
      <div className="left-box box">
        <div className="profile-image-container">
          <img className="profile-image" src={photoURL} alt="profile" />
        </div>
        <div className="message-content meeting-box">
          <div className="meeting-heading">Meeting</div>
          <div className="meeting-container">
            <div className="date-container">
              <div className="date-title">Date</div>
              <div className="value">{content[0]}</div>
            </div>

            <div className="date-container">
              <div className="date-title">Date</div>
              <div className="value">{content[1]}</div>
            </div>
            <div className="meeting-icon">
              <WhiteMeeting />
            </div>
          </div>
        </div>
      </div>
    );

  if (type === "text") {
    return textMessage;
  } else {
    return meetingMessage;
  }
};

const mapStateToProps = createStructuredSelector({
  currentUserId: selectCurrentUserId,
});

export default connect(mapStateToProps)(Message);
