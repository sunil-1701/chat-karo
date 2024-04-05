import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentChatroomMessages } from "../../redux/messages/messages.selectors";
import Message from "../message/message.component";
import "./message-box.styles.scss";

const MessageBox = ({ messages }) => {
  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="message-box">
      {messages.map((message, index) => (
        <Message message={message} key={index} />
      ))}
      <div ref={dummy}></div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  messages: selectCurrentChatroomMessages,
});

export default connect(mapStateToProps)(MessageBox);
