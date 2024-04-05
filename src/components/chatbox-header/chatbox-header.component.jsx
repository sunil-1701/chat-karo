import "./chatbox-header.styles.scss";

import { ReactComponent as InfoIcon } from "../../assets/info-icon.svg";

const ChatboxHeader = ({ chatRoomName, setHidden }) => {
  return (
    <div className="chatbox-header">
      <div className="chatbox-title">{chatRoomName}</div>
      <InfoIcon onClick={() => setHidden(false)} />
    </div>
  );
};

export default ChatboxHeader;
