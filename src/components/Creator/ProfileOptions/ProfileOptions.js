import React from "react";
import classNames from "classnames/bind";
import styles from "./ProfileOptions.module.scss";
const cx = classNames.bind(styles);
function ProfileOptions({ setShowReportProfile, setShowProfileOptions }) {
  return (
    <div className={cx("profile-options-wrapper")}>
      <div className={cx("profile-options-container")}>
        <div className={cx("profile-options")}>
          <div className={cx("text")}>Profile options</div>
        </div>
        <div className={cx("block-options")}>
          <div className={cx("block-text")}>Block</div>
        </div>
        <div
          className={cx("report-options")}
          onClick={() => {
            setShowReportProfile(true);
            setShowProfileOptions(false);
          }}
        >
          <div className={cx("report-text")}>Report</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileOptions;
