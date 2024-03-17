import classNames from "classnames/bind";
import styles from "./Conservation.module.scss";
import ConversationMessage from "./ConversationMessage";
const cx = classNames.bind(styles);
function Conversation({
  conversations,
  currentUser,
  currentChat,
  setCurrentChat,
}) {
  return (
    <div className={cx("conversation-wrapper")}>
      <div className={cx("conversation-container")}>
        <div className={cx("conversation-heading")}>
          <div className={cx("heading-text")}>Chats</div>
          <div className={cx("heading-options")}>
            <div className={cx("options")}>
              <i className={cx("fa-solid fa-ellipsis", "icon")}></i>
            </div>
            <div className={cx("edits")}>
              <i className={cx("fa-solid fa-pen-to-square", "icon")}></i>
            </div>
          </div>
        </div>
        <div className={cx("conversation-search")}>
          <div className={cx("search")}>
            <i
              className={cx("fa-light fa-magnifying-glass", "search-icon")}
            ></i>
            <input
              type="text"
              placeholder="Search..."
              spellCheck={false}
              className={cx("input-search")}
            />
          </div>
        </div>
        <div className={cx("conversation-message-list")}>
          {conversations.map((conversation) => (
            <ConversationMessage
              key={conversation._id}
              currentUser={currentUser}
              conversation={conversation}
              currentChat={currentChat}
              setCurrentChat={setCurrentChat}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Conversation;
