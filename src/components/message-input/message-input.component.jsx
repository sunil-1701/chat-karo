import "./message-input.styles.scss";
import { ReactComponent as SendButton } from "../../assets/send-button.svg";
import { ReactComponent as BlackMeeting } from "../../assets/blackMeeting.svg";
import { useState } from "react";
import firebase, { firestore } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUserId } from "../../redux/user/user.selectors";

const MessageInput = ({ chatroomId, currentUserId }) => {
  const [message, setMessage] = useState("");

  const [isMeetingVisible, setIsMeetingVisible] = useState(false);

  const [meeting, setMeeting] = useState({});

  const onDateChange = (event) => {
    setMeeting({ ...meeting, date: event.target.value });
  };
  const onTimeChange = (event) => {
    setMeeting({ ...meeting, time: event.target.value });
  };

  const onSetMeetingClick = async () => {
    const messagesRef = firestore.doc(`messages/${chatroomId}`);
    const snapShot = await messagesRef.get();

    if (!snapShot.exists) {
      console.log("messages Ref doesn't exists");
      return;
    }

    try {
      const createdAt = firebase.firestore.Timestamp.now();

      const messageBody = {
        createdAt,
        sentByUser: currentUserId,
        sentInChatroom: chatroomId,
        content: [meeting.date, meeting.time],
        type: "meeting",
      };

      await messagesRef.update({
        messages: firebase.firestore.FieldValue.arrayUnion(messageBody),
      });

      setMeeting({});
      setIsMeetingVisible(false);
    } catch (error) {
      console.log("Error sending messages", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.length === 0) return;

    const messagesRef = firestore.doc(`messages/${chatroomId}`);
    const snapShot = await messagesRef.get();

    if (!snapShot.exists) {
      console.log("messages Ref doesn't exists");
      return;
    }

    try {
      const createdAt = firebase.firestore.Timestamp.now();

      const messageBody = {
        createdAt,
        sentByUser: currentUserId,
        sentInChatroom: chatroomId,
        content: message,
        type: "text",
      };

      await messagesRef.update({
        messages: firebase.firestore.FieldValue.arrayUnion(messageBody),
      });

      setMessage("");
    } catch (error) {
      console.log("Error sending messages", error);
    }
  };

  return (
    <div className="message-input">
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />

        <button type="submit">
          <SendButton />
        </button>
        <div className="set-meeting" onClick={() => setIsMeetingVisible(true)}>
          <BlackMeeting />
        </div>
      </form>
      {isMeetingVisible && (
        <div className="meeting-maker">
          <div className="add-date">
            <div className="date">Date</div>
            <input
              className="date-input"
              type="text"
              placeholder="DD/MM/YY"
              onChange={onDateChange}
            />
          </div>
          <div className="add-time">
            <div className="time">Time</div>
            <input
              className="time-input"
              type="text"
              placeholder="HH:MM (24 Hr)"
              onChange={onTimeChange}
            />
          </div>

          <div className="set-meeting-button" onClick={onSetMeetingClick}>
            Set Meeting
          </div>
          <div
            className="set-meeting-button"
            onClick={() => setIsMeetingVisible(false)}
          >
            close
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUserId: selectCurrentUserId,
});

export default connect(mapStateToProps)(MessageInput);
