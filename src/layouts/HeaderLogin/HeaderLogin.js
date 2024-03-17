import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import Logo from "~/assets/images/logo.png";

import styles from "./HeaderLogin.module.scss";
const cx = classNames.bind(styles);
const headerNav = [
  {
    id: 1,
    path: "/ideas",
    name: "Explore",
  },
  {
    id: 2,
    path: "",
    name: "Watch",
  },
];

const websiteInfo = [
  {
    id: 1,
    path: "/about",
    name: "About",
  },
  {
    id: 2,
    path: "/business",
    name: "Business",
  },
  {
    id: 3,
    path: "/blog",
    name: "Blog",
  },
];
function MainHeader({ setShowLogin, setShowSignup }) {
  return (
    <div className={cx("main-header-wrapper")}>
      <div className={cx("main-header-container")}>
        <div className={cx("header-left")}>
          <Link to="/" className={cx("header-logo")}>
            <div className={cx("logo")}>
              <img src={Logo} alt="logo" className={cx("logo-img")} />
            </div>
            <div className={cx("logo-text")}>Pesterin</div>
          </Link>
          {headerNav.map((item) => (
            <div className={cx("header-item")} key={item.id}>
              <Link to={item.path} className={cx("item-link")}>
                {item.name}
              </Link>
            </div>
          ))}
        </div>
        <div className={cx("header-right")}>
          <div className={cx("website-information")}>
            {websiteInfo.map((item) => (
              <div className={cx("info-item")} key={item.id}>
                <Link to={item.path} className={cx("info-item-link")}>
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
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

export default MainHeader;
