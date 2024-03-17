import classNames from "classnames/bind";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "~/configs/firebase";
import { fetchDecreaseDownloadCount } from "~/services/packageService";
import styles from "./MoreOptionsPin.module.scss";
import { useContext } from "react";
import { PackageContext } from "~/contexts/PackageContext";
const cx = classNames.bind(styles);
function MoreOptionsPin({
  userData,
  pinInformation,
  setShowReportPin,
  setShowNotifyNoPackage,
  setShowNotifyUpgradePackage,
  setShowPrivate,
}) {
  const { feature, setFeature } = useContext(PackageContext);

  const handleDownloadImage = () => {
    if (pinInformation.access === "private") {
      setShowPrivate(true);
    } else if (!userData.packageId) {
      setShowNotifyNoPackage(true);
    } else if (feature.countDownload < 1) {
      setShowNotifyUpgradePackage(true);
    } else {
      const storageRef = ref(storage, pinInformation.url);
      getDownloadURL(storageRef)
        .then((url) => {
          const xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = () => {
            const blob = xhr.response;
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${pinInformation._id}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            //Call API
            callApiDownloadImage();
          };

          xhr.open("GET", url);
          xhr.send();
        })
        .catch((error) => {
          console.error("Error downloading image:", error);
        });
    }
  };
  const callApiDownloadImage = async () => {
    try {
      const featureResponse = await fetchDecreaseDownloadCount(
        userData._id,
        userData.packageId
      );

      setFeature(featureResponse);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={cx("more-options-wrapper")}>
      <div className={cx("more-options-container")}>
        {pinInformation.userId !== userData._id && (
          <div className={cx("download")} onClick={handleDownloadImage}>
            <div className={cx("text")}>Download image</div>
          </div>
        )}

        <div className={cx("hide")}>
          <div className={cx("text")}>Hide Pin</div>
        </div>
        <div className={cx("report")} onClick={() => setShowReportPin(true)}>
          <div className={cx("text")}>Report Pin</div>
        </div>
        <div className={cx("get-pin")}>
          <div className={cx("text")}>Get Pin embed code</div>
        </div>
      </div>
    </div>
  );
}

export default MoreOptionsPin;
