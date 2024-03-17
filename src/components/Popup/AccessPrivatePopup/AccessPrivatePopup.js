import React, { useContext } from "react";
import className from "classnames/bind";
import { useNavigate } from "react-router-dom";

import api from "~/services/apiService";
import { MessageContext } from "~/contexts/MessageContext";

import Logo from "~/assets/images/logo.png";

import styles from "./AccessPrivatePopup.module.scss";
const cx = className.bind(styles);
function AccessPrivatePopup({
  userData,
  pinInformation,
  setShowAccessPrivate,
}) {
  const { setConversations } = useContext(MessageContext);
  const navigate = useNavigate();
  const handleContactCreator = async () => {
    try {
      const senderId = userData._id;
      const receiverId = pinInformation.userId;

      const conversationData = {
        senderId,
        receiverId,
      };

      const conversationResponse = await api.post(
        "/conversation/newConversation",
        conversationData
      );
      const conversationId = conversationResponse.data.conversation._id;
      const updatedConversations = conversationResponse.data.conversations;
      setConversations(updatedConversations);
      navigate(`/messages/${conversationId}`);
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={cx("access-private-wrapper")}>
      <div className={cx("access-private-container")}>
        <div className={cx("access-private-heading")}>
          <img src={Logo} alt="logo" className={cx("logo")} />
          <div className={cx("heading-text")}>Notifications</div>
          <div className={cx("empty")}></div>
        </div>
        <div className={cx("access-private-notify")}>
          <div className={cx("notify")}>
            Oops!{" "}
            <span className={cx("highlight")}>This artwork is private</span>. If
            you want to download it, just contact the creator for permission
            first.
          </div>
        </div>
        <div className={cx("access-private-action")}>
          <button
            className={cx("cancel-btn")}
            onClick={() => setShowAccessPrivate(false)}
          >
            Cancel
          </button>
          <button className={cx("contact-btn")} onClick={handleContactCreator}>
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccessPrivatePopup;
