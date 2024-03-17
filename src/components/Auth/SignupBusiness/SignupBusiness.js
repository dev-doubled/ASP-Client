import React from "react";
import classNames from "classnames/bind";
import Logo from "~/assets/images/logo.png";
import styles from "./SignupBusiness.module.scss";
const cx = classNames.bind(styles);
function SignupBusiness({
  setShowLogin,
  setShowSignup,
  setShowSignupBusiness,
}) {
  const handleLoginExisting = () => {
    setShowSignupBusiness(false);
    setShowLogin(true);
  };
  const handleSignupPersonal = () => {
    setShowSignupBusiness(false);
    setShowSignup(true);
  };
  return (
    <div className={cx("signup-business-wrapper")}>
      <div className={cx("signup-business-container")}>
        <div className={cx("business")}>
          <div className={cx("close")}>
            <div
              className={cx("close-btn")}
              onClick={() => setShowSignupBusiness(false)}
            >
              <i className={cx("fa-solid fa-xmark", "icon")}></i>
            </div>
          </div>
          <div className={cx("logo")}>
            <img src={Logo} alt="logo-img" className={cx("logo-image")} />
          </div>
          <div className={cx("welcome")}>
            <div className={cx("text")}>Welcome to Pesterin</div>
          </div>
          <div className={cx("sub-heading")}>
            <div className={cx("text")}>Grow your business</div>
          </div>

          {/* Form signup */}
          <div className={cx("form-login-wrapper")}>
            <div className={cx("form-login-container")}>
              <div className={cx("form-content")}>
                {/* Email */}
                <div className={cx("email")}>
                  <div className={cx("email-text")}>Email</div>
                  <div className={cx("email-input")}>
                    <input
                      type="text"
                      placeholder="Email"
                      spellCheck={false}
                      autoFocus={true}
                      className={cx("input")}
                    />
                  </div>
                </div>
                {/* Password */}
                <div className={cx("password")}>
                  <div className={cx("password-text")}>Password</div>
                  <div className={cx("password-input")}>
                    <input
                      type="password"
                      placeholder="Create a password"
                      spellCheck={false}
                      className={cx("input")}
                    />
                  </div>
                </div>
                {/* Birthday */}
                <div className={cx("birthday")}>
                  <div className={cx("birthday-text")}>Birthday</div>
                  <div className={cx("birthday-input")}>
                    <input
                      type="date"
                      placeholder="Birthday"
                      pattern="\d{2}/\d{2}/\d{4}"
                      className={cx("input")}
                    />
                  </div>
                </div>
                {/* Signup button */}
                <div className={cx("signup-btn")}>
                  <button className={cx("btn")}>Create account</button>
                </div>

                {/* Login button */}
                <div className={cx("login-btn")}>
                  <button className={cx("btn")} onClick={handleLoginExisting}>
                    Log into existing account
                  </button>
                </div>
              </div>

              {/* Information text */}
              <div className={cx("information")}>
                <div className={cx("text")}>
                  By continuing, you agree to Pesterin's.{" "}
                  <span className={cx("mark")}>Business Terms of Service</span>{" "}
                  and acknowledge you've read our.{" "}
                  <span className={cx("mark")}>Privacy Policy</span>.{" "}
                  <span className={cx("mark")}>Notice at collection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("normal")} onClick={handleSignupPersonal}>
          <div className={cx("business-text")}>Create a personal account</div>
        </div>
      </div>
    </div>
  );
}

export default SignupBusiness;
