import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import Logo from "~/assets/images/logo.png";

import styles from "./ExploreHeader.module.scss";
const cx = classNames.bind(styles);
function ExploreHeader({ setShowLogin, setShowSignup }) {
  return (
    <div className={cx("explore-header-wrapper")}>
      <div className={cx("explore-header-container")}>
        <div className={cx("header-left")}>
          <Link to="/" className={cx("header-logo")}>
            <div className={cx("logo")}>
              <img src={Logo} alt="logo" className={cx("logo-img")} />
            </div>
            <div className={cx("logo-text")}>Pesterin</div>
          </Link>
          <div className={cx("current-page")}>
            <span className={cx("text")}>Explore</span>
            <i className={cx("fa-solid fa-chevron-down", "icon")}></i>
          </div>
        </div>
        <div className={cx("header-middle")}>
          <i className={cx("fa-solid fa-magnifying-glass", "search-icon")}></i>
          <span className={cx("search-focus")}>
            Search for easy dinners, fashion, etc.
          </span>
        </div>
        <div className={cx("header-right")}>
          <div className={cx("authentication-action")}>
            <button
              className={cx("login-btn")}
              onClick={() => setShowLogin(true)}
            >
              Log in
            </button>
            <button
              className={cx("signup-btn")}
              onClick={() => setShowSignup(true)}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreHeader;
