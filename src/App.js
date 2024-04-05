import { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import "./App.scss";
import ChatsPage from "./pages/chats-page/chats-page.component";
import HomePage from "./pages/homepage/homepage.component";
import { checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";

const App = ({ currentUser, checkUserSession }) => {
  const history = useHistory();

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  useEffect(() => {
    if (!currentUser) history.push("/");
    else history.push("/chats");
  }, [currentUser, history]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/chats" component={ChatsPage} />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
