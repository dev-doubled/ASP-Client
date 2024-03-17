import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceStrict } from "date-fns";

import { fetchGetReplyCommentByCommentId } from "~/services/replyCommentService";

import ReplyComment from "./ReplyComment";
import ReplyCommentInput from "./ReplyCommentInput";

import styles from "./Comment.module.scss";
const cx = classNames.bind(styles);
function Comment({
  userData,
  pinInformation,
  comment,
  setCountComment,
  setLoadingShowListComment,
}) {
  const [showReplyComment, setShowReplyComment] = useState(false);
  const [listReplyComments, setListReplyComments] = useState([]);
  const [showAllReplyComments, setShowAllReplyComments] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const replyCommentList = await fetchGetReplyCommentByCommentId(
          comment._id
        );
        setListReplyComments(replyCommentList);
      } catch (error) {
        console.error("Error fetching creator information:", error);
      }
    };

    fetchData();
  }, [comment._id]);

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

  const handleViewAllReply = () => {
    setShowAllReplyComments(true);
  };

  return (
    <div className={cx("comment-container-main")}>
      <div className={cx("comment-content")}>
        <div className={cx("user-avatar")}>
          <img
            src={comment?.author.avatar}
            alt="user-avatar"
            className={cx("avatar")}
          />
        </div>
        <div className={cx("content-main")}>
          <Link to="" className={cx("username")}>
            {comment.author.userName}
          </Link>
          <div className={cx("comment")}>{comment.commentContent}</div>
          <div className={cx("comment-options")}>
            <div className={cx("create-at")}>
              {getFormattedTimestamp(comment.createdAt)}
            </div>
            <div
              className={cx("reply")}
              onClick={() => setShowReplyComment(!showReplyComment)}
            >
              Reply
            </div>
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
      <div className={cx("reply-content")}>
        {showReplyComment && (
          <ReplyCommentInput
            userData={userData}
            pinInformation={pinInformation}
            comment={comment}
            showReplyComment={showReplyComment}
            setShowReplyComment={setShowReplyComment}
            setListReplyComments={setListReplyComments}
            setCountComment={setCountComment}
            setLoadingShowListComment={setLoadingShowListComment}
          />
        )}

        {showAllReplyComments === false && listReplyComments.length > 1 && (
          <div className={cx("show-all-reply")} onClick={handleViewAllReply}>
            <i className={cx("fa-regular fa-comment-dots", "icon")}></i>
            <span className={cx("text")}>
              View {listReplyComments.length}{" "}
              {listReplyComments.length > 1 ? "replies" : "reply"}
            </span>
          </div>
        )}

        {showAllReplyComments && (
          <div
            className={cx("show-all-reply")}
            onClick={() => setShowAllReplyComments(false)}
          >
            <i className={cx("fa-regular fa-comment-dots", "icon")}></i>
            <span className={cx("text")}>
              Hide {listReplyComments.length > 1 ? "replies" : "reply"}
            </span>
          </div>
        )}

        {showAllReplyComments === false &&
          listReplyComments &&
          listReplyComments.length > 0 &&
          listReplyComments
            .slice(0, 1)
            .map((replyComment) => (
              <ReplyComment
                key={replyComment._id}
                replyComment={replyComment}
              />
            ))}

        {showAllReplyComments &&
          listReplyComments &&
          listReplyComments.length > 0 &&
          listReplyComments.map((replyComment) => (
            <ReplyComment key={replyComment._id} replyComment={replyComment} />
          ))}
      </div>
    </div>
  );
}

export default Comment;
