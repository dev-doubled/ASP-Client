import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import api from "~/services/apiService";

import MessageInput from "./MessageInput";
import MessageBox from "./MessageBox";

import UserDefaultImage from "~/assets/images/user-default.png";

import styles from "./ChatBox.module.scss";

const cx = classNames.bind(styles);
function ChatBox({
  socket,
  currentUser,
  currentChat,
  messages,
  setMessages,
  setShowImageViewer,
  setImageViewer,
}) {
  const [user, setUser] = useState();
  useEffect(() => {
    if (currentUser._id) {
      const friendId = currentChat.members.find(
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
    }
  }, [currentChat.members, currentUser._id]);
  return (
    <div className={cx("chat-box-wrapper")}>
      <div className={cx("chat-box-container")}>
        <div className={cx("message-box-header")}>
          <div className={cx("header-left")}>
            <img
              src={user?.avatar ? user.avatar : UserDefaultImage}
              alt="avatar"
              className={cx("avatar")}
            />
            <span className={cx("name")}>
              {user?.userName
                ? user.userName
                : user?.firstName + " " + user?.lastName}
            </span>
          </div>
          <div className={cx("header-right")}>
            <button className={cx("phone-btn")}>
              <i className={cx("fa-sharp fa-solid fa-phone", "phone")}></i>
            </button>
            <button className={cx("video-btn")}>
              <i className={cx("fa-solid fa-video", "video")}></i>
            </button>
          </div>
        </div>
        <MessageBox
          messages={messages}
          currentUser={currentUser}
          setShowImageViewer={setShowImageViewer}
          setImageViewer={setImageViewer}
        />
        <MessageInput
          socket={socket}
          currentUser={currentUser}
          currentChat={currentChat}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
}

export default ChatBox;
