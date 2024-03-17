import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";

import api from "~/services/apiService";

import UserDefaultImage from "~/assets/images/user-default.png";

import styles from "./ChatInfo.module.scss";
const cx = classNames.bind(styles);
const settings = [
  "Chat info",
  "Customize chat",
  "Media, files and links",
  "Privacy & support",
];
function ChatInfo({ currentChat, currentUser }) {
  const navigate = useNavigate();
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

  const handleClickProfile = () => {
    navigate(`/creator/${user?._id}`);
  };
  return (
    <div className={cx("chat-info-wrapper")}>
      <div className={cx("chat-info-container")}>
        <div className={cx("receiver-avatar")}>
          <img
            src={user?.avatar ? user.avatar : UserDefaultImage}
            alt="receiver-img"
            className={cx("avatar")}
          />
        </div>
        <div className={cx("receiver-name")}>
          <Link to={`/creator/${user?._id}`} className={cx("name")}>
            {user?.userName
              ? user.userName
              : user?.firstName + " " + user?.lastName}
          </Link>
        </div>
        <div className={cx("receiver-options")}>
          <div className={cx("profile")}>
            <div className={cx("icon-container")} onClick={handleClickProfile}>
              <i className={cx("fa-solid fa-circle-user", "icon")}></i>
            </div>
            <div className={cx("text")}>Profile</div>
          </div>
          <div className={cx("notify")}>
            <div className={cx("icon-container")}>
              <i className={cx("fa-solid fa-bell", "icon")}></i>
            </div>
            <div className={cx("text")}>Mute</div>
          </div>
          <div className={cx("search")}>
            <div className={cx("icon-container")}>
              <i className={cx("fa-solid fa-magnifying-glass", "icon")}></i>
            </div>
            <div className={cx("text")}>Search</div>
          </div>
        </div>
        <div className={cx("chat-settings-container")}>
          {settings.map((setting, index) => (
            <div className={cx("setting-container")} key={index}>
              <div className={cx("text")}>{setting}</div>
              <div className={cx("dropdown")}>
                <i className={cx("fa-solid fa-chevron-down", "icon")}></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatInfo;
