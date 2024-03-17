import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { formatDistanceStrict } from "date-fns";
import styles from "./ReplyComment.module.scss";
const cx = classNames.bind(styles);
function ReplyComment({ replyComment }) {
  const getFormattedTimestamp = (createdAt) => {
    const distance = formatDistanceStrict(new Date(createdAt), new Date(), {
      addSuffix: true,
    });

    const match = distance.match(/(\d+) (\w+)/);

    if (!match) {
      return distance;
    }

    const [, value, unit] = match;
    let formattedValue;

    switch (unit) {
      case "less":
        formattedValue = "1s";
        break;
      case "seconds":
        formattedValue = value === "1" ? "1s" : `${value}s`;
        break;
      case "minute":
      case "minutes":
        formattedValue = value === "1" ? "1m" : `${value}m`;
        break;
      case "hour":
      case "hours":
        formattedValue = value === "1" ? "1h" : `${value}h`;
        break;
      case "day":
      case "days":
        formattedValue = value === "1" ? "1d" : `${value}d`;
        break;
      case "month":
      case "months":
        formattedValue = value === "1" ? "1mo" : `${value}mo`;
        break;
      case "year":
      case "years":
        formattedValue = value === "1" ? "1y" : `${value}y`;
        break;
      default:
        formattedValue = distance;
    }

    return formattedValue;
  };
  return (
    <div className={cx("comment-content")}>
      <div className={cx("user-avatar")}>
        <img
          src={replyComment?.author.avatar}
          alt="user-avatar"
          className={cx("avatar")}
        />
      </div>
      <div className={cx("content-main")}>
        <Link to="" className={cx("username")}>
          {replyComment.author.userName}
        </Link>
        <div className={cx("comment")}>{replyComment.replyContent}</div>
        <div className={cx("comment-options")}>
          <div className={cx("create-at")}>
            {getFormattedTimestamp(replyComment.createdAt)}
          </div>
          <div className={cx("reply")}>Reply</div>
          <div className={cx("reaction")}>
            <i className={cx("fa-regular fa-heart", "icon")}></i>
          </div>
          <div className={cx("more")}>
            <i
              className={cx(
                "fa-solid fa-ellipsis-vertical fa-rotate-90",
                "icon"
              )}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReplyComment;
