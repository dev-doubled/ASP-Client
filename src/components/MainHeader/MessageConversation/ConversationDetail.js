import classNames from "classnames/bind";
import { formatDistanceStrict } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "~/services/apiService";

import UserImageDefault from "~/assets/images/user-default.png";

import styles from "./MessageConversation.module.scss";
const cx = classNames.bind(styles);
function Conversation({
  conversation,
  currentUser,
  setShowMessage,
  unseenMessages,
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [checkConversationUnseen, setCheckConversationUnseen] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find(
      (u) => u.user_id !== currentUser._id
    );

    const getUser = async () => {
      try {
        const userResponse = await api.get(
          `user/getUserById/${friendId.user_id}`
        );
        setUser(userResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [conversation.members, currentUser._id]);

  useEffect(() => {
    const isCheck = checkConversationIdInArray(
      conversation._id,
      unseenMessages
    );
    setCheckConversationUnseen(isCheck);
  }, [conversation._id, unseenMessages]);

  const checkConversationIdInArray = (conversationId, arrayOfArrays) => {
    return arrayOfArrays.some((innerArray) => {
      return innerArray.some(
        (message) =>
          message.conversationId.toString() === conversationId.toString()
      );
    });
  };

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

  const handleClickConversation = async () => {
    try {
      setShowMessage(false);
      const conversationUrl = `/messages/${conversation._id}`;
      navigate(conversationUrl);
      await api.get(
        `/message/markMessagesAsSeen/${conversation._id}/${currentUser._id}`
      );
    } catch (error) {
      console.error("Error handling conversation:", error);
    }
  };

  return (
    <div
      className={cx("conversation-message")}
      onClick={handleClickConversation}
    >
      <img
        src={user?.avatar ? user.avatar : UserImageDefault}
        alt="avatar"
        className={cx("user-avatar")}
      />
      <div className={cx("user-content")}>
        <div className={cx("above")}>
          <div className={cx("username")}>
            {user?.userName
              ? user.userName
              : user?.firstName + " " + user?.lastName}
          </div>
        </div>
        <div className={cx("under")}>
          <div
            className={
              checkConversationUnseen
                ? cx("content-chat", "unseen")
                : cx("content-chat")
            }
          >
            {conversation.lastMessage}
          </div>
          {conversation.lastMessage && (
            <>
              <span className={cx("dot")}>
                <i className={cx("fa-solid fa-period", "icon")}></i>
              </span>
              <div className={cx("time")}>
                {getFormattedTimestamp(conversation.updatedAt)}
              </div>
            </>
          )}
        </div>
      </div>
      {checkConversationUnseen && (
        <div className={cx("dot-wrapper")}>
          <div className={cx("dot")}></div>
        </div>
      )}
    </div>
  );
}

export default Conversation;
