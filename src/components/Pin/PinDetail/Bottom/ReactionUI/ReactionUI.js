import Love from "~/assets/images/love.png";
import Haha from "~/assets/images/haha.png";
import Thank from "~/assets/images/thank.png";
import GoodIdea from "~/assets/images/goodIdea.png";
import Wow from "~/assets/images/wow.png";
import classNames from "classnames/bind";
import styles from "./ReactionUI.module.scss";
const cx = classNames.bind(styles);
function ReactionUI({ selectedReaction }) {
  if (!selectedReaction) {
    return (
      <div>
        <i className={cx("fa-regular fa-heart fa-xl", "icon")}></i>
      </div>
    );
  }
  switch (selectedReaction) {
    case "Love":
      return (
        <div>
          <img
            src={Love}
            alt="love-img"
            style={{ width: "24px", height: "auto" }}
          />
        </div>
      );
    case "Haha":
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={Haha}
            alt="love-img"
            style={{ width: "24px", height: "auto" }}
          />
        </div>
      );
    case "Thank":
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={Thank}
            alt="love-img"
            style={{ width: "24px", height: "auto" }}
          />
        </div>
      );
    case "GoodIdea":
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={GoodIdea}
            alt="love-img"
            style={{ width: "24px", height: "auto" }}
          />
        </div>
      );
    case "Wow":
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={Wow}
            alt="love-img"
            style={{ width: "24px", height: "auto" }}
          />
        </div>
      );
    default:
      return null;
  }
}

export default ReactionUI;
