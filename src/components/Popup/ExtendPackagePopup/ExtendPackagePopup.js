import classNames from "classnames/bind";
import Logo from "~/assets/images/logo.png";
import styles from "./ExtendPackagePopup.module.scss";
const cx = classNames.bind(styles);
function ExtendPackagePopup({
  setShowNotifyUpgradePackage,
  setShowUpgradePackage,
  type,
  descType,
}) {
  const handleClickUpgrade = () => {
    setShowNotifyUpgradePackage(false);
    setShowUpgradePackage(true);
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
            Your <span className={cx("highlight")}>{type}</span> have exceeded
            the limit. Upgrade your package to continue {descType}.
          </div>
        </div>
        <div className={cx("no-package-action")}>
          <button
            className={cx("cancel-btn")}
            onClick={() => setShowNotifyUpgradePackage(false)}
          >
            Cancel
          </button>
          <button className={cx("upgrade-btn")} onClick={handleClickUpgrade}>
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExtendPackagePopup;
