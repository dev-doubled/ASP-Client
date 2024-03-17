import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import api from "~/services/apiService";

import UserImageDefault from "~/assets/images/user-default.png";
import styles from "./Conservation.module.scss";

const cx = classNames.bind(styles);
function ConversationMessage({
  currentUser,
  conversation,
  currentChat,
  setCurrentChat,
}) {
  const [user, setUser] = useState();
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

  const getFormattedTimestamp = (createdAt) => {
    const dateCreated = new Date(createdAt);
    const currentDate = new Date();

    const timeDifference = Math.abs(currentDate - dateCreated) / 1000;

    const units = [
      { label: "y", seconds: 31536000 },
      { label: "mo", seconds: 2592000 },
      { label: "d", seconds: 86400 },
      { label: "h", seconds: 3600 },
      { label: "m", seconds: 60 },
      { label: "s", seconds: 1 },
    ];

    for (const unit of units) {
      const value = Math.floor(timeDifference / unit.seconds);

      if (value >= 1) {
        return value === 1 ? `1${unit.label}` : `${value}${unit.label}`;
      }
    }

    return "1s";
  };

  return (
    <div
      className={
        currentChat?._id === conversation._id
          ? cx("conversation-message", "conversation-message-active")
          : cx("conversation-message")
      }
      onClick={() => setCurrentChat(conversation)}
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
          <div className={cx("content-chat")}>{conversation.lastMessage}</div>
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
    </div>
  );
}

export default ConversationMessage;
