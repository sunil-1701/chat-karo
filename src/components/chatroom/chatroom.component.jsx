import "./chatroom.styles.scss";

const Chatroom = ({ chatRoomName, onClick }) => {
  return (
    <div onClick={onClick} className="chatroom">
      <div className="chatroom-name">{chatRoomName}</div>
      <div className="line" />
    </div>
  );
};

export default Chatroom;
