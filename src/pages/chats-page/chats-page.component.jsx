import Sidebar from "../../components/sidebar/sidebar.component";
import "./chats-page.styles.scss";
import { ReactComponent as ChatsPageImage } from "../../assets/chatspage-image.svg";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import ChatBox from "../../components/chatbox/chatbox.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { Route } from "react-router";

const ChatsPage = ({ currentUser, match }) => {
  return (
    <div className="chats-page">
      {currentUser ? (
        <>
          <Sidebar />
          <div className="main">
            <Route exact path={`${match.path}`}>
              <ChatsPageImage className="chatspage-image" />
            </Route>

            <Route path={`${match.path}/:chatroomId`} component={ChatBox} />
          </div>
        </>
      ) : (
        <h1>You must sign In</h1>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ChatsPage);
