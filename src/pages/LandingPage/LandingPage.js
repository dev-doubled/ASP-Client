import classNames from "classnames/bind";
import { useState } from "react";
import SaveIdea from "~/components/LandingPage/SaveIdea";
import SearchIdea from "~/components/LandingPage/SearchIdea";
import ShopIdea from "~/components/LandingPage/ShopIdea";
import SlideShowIdea from "~/components/LandingPage/SlideShowIdea";
import HeaderLogin from "~/layouts/HeaderLogin";
import Login from "~/components/Auth/Login";
import Signup from "~/components/Auth/Signup";
import SignupBusiness from "~/components/Auth/SignupBusiness";

import styles from "./LandingPage.module.scss";
const cx = classNames.bind(styles);

function LandingPage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSignupBusiness, setShowSignupBusiness] = useState(false);
  return (
    <>
      {showLogin && (
        <Login
          setShowLogin={setShowLogin}
          setShowSignup={setShowSignup}
          onLogin={onLogin}
        />
      )}
      {showSignup && (
        <Signup
          setShowSignup={setShowSignup}
          setShowLogin={setShowLogin}
          setShowSignupBusiness={setShowSignupBusiness}
        />
      )}
      {showSignupBusiness && (
        <SignupBusiness
          setShowLogin={setShowLogin}
          setShowSignup={setShowSignup}
          setShowSignupBusiness={setShowSignupBusiness}
        />
      )}
      <div className={cx("home-wrapper")}>
        <HeaderLogin
          setShowLogin={setShowLogin}
          setShowSignup={setShowSignup}
        />
        <div className={cx("home-container")}>
          <div id="top" className={cx("slide-show-ideas")}>
            <SlideShowIdea />
          </div>
          <div id="search" className={cx("search-ideas")}>
            <SearchIdea />
          </div>
          <div id="save" className={cx("save-ideas")}>
            <SaveIdea />
          </div>
          <div id="shop" className={cx("shop-ideas")}>
            <ShopIdea />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
