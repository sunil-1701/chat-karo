import "./homepage.styles.scss";

import { ReactComponent as GoogleIcon } from "../../assets/google-icon.svg";
import { ReactComponent as LeftArrow } from "../../assets/arrow-left.svg";
import { ReactComponent as HomepageImage } from "../../assets/homepage-image.svg";
import { signInStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const HomePage = ({ signInStart }) => {
  return (
    <div className="homepage">
      <div className="header">
        <div className="header-title">corporate-systems</div>
        <a
          href={"https://github.com/TheNinza/corporate-communication/"}
          target="_blank"
          rel="noreferrer"
          className="burger-menu"
        >
          <div className="line1" />
          <div className="line2" />
          <div className="line3" />
        </a>
      </div>
      <div className="homepage-content">
        <div className="left-content">
          <div className="heading">Productive Everyday</div>
          <div className="subheading">
            The best place for all your corporate chats
          </div>
          <div className="whatwedo">
            At ‘corporate-systems’ we provide communication tools for your
            growing business. The service is entirely free for trial and light
            loads. Start being awesome from today.
          </div>
          <div className="google-signin-section" onClick={signInStart}>
            <div className="google-signin">
              Continue With
              <GoogleIcon className="google-icon" />
            </div>
            <LeftArrow className="left-arrow" />
          </div>
        </div>
        <div className="right-content">
          <div className="hero-image-container">
            <HomepageImage className="hero-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signInStart: () => dispatch(signInStart()),
});

export default connect(null, mapDispatchToProps)(HomePage);
