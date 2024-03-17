import React from "react";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import Logo from "~/assets/images/logo.png";
import styles from "./NoPackagePopup.module.scss";
const cx = classNames.bind(styles);
function NoPackagePopup({ setShowNotifyNoPackage, type }) {
  const navigate = useNavigate();
  const handleClickPurchase = () => {
    navigate("/convert-business");
  };
  return (
    <div className={cx("no-package-wrapper")}>
      <div className={cx("no-package-container")}>
        <div className={cx("no-package-heading")}>
          <img src={Logo} alt="logo" className={cx("logo")} />
          <div className={cx("heading-text")}>Notifications</div>
          <div className={cx("empty")}></div>
        </div>
        <div className={cx("no-package-notify")}>
          <div className={cx("notify")}>
            Access to {type} requires a partnership and the purchase of a
            package.
          </div>
        </div>
        <div className={cx("no-package-action")}>
          <button
            className={cx("cancel-btn")}
            onClick={() => setShowNotifyNoPackage(false)}
          >
            Cancel
          </button>
          <button className={cx("purchase-btn")} onClick={handleClickPurchase}>
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoPackagePopup;
