import React, { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./PackageFeature.module.scss";
import { PackageContext } from "~/contexts/PackageContext";
const cx = classNames.bind(styles);
function PackageFeature() {
  const { feature } = useContext(PackageContext);
  return (
    <div className={cx("package-feature-wrapper")}>
      <div className={cx("package-feature-container")}>
        <div className={cx("save")}>
          <i className={cx("fa-solid fa-floppy-disk", "icon")}></i>
          <span className={cx("text")}>Save artwork:</span>
          <span className={cx("count-number")}>{feature.countSave}</span>
        </div>
        <div className={cx("download")}>
          <i className={cx("fa-solid fa-download", "icon")}></i>
          <span className={cx("text")}>Download artwork:</span>
          <span className={cx("count-number")}>{feature.countDownload}</span>
        </div>
        <div className={cx("ads")}>
          <i className={cx("fa-brands fa-adversal", "icon")}></i>
          <span className={cx("text")}>Advertise artwork:</span>
          <span className={cx("count-number")}>{feature.countAds}</span>
        </div>
        <div className={cx("private")}>
          <i className={cx("fa-regular fa-signature-lock", "icon")}></i>
          <span className={cx("text")}>Private posting artwork:</span>
          <span className={cx("count-number")}>{feature.countPostPrivate}</span>
        </div>
      </div>
    </div>
  );
}

export default PackageFeature;
