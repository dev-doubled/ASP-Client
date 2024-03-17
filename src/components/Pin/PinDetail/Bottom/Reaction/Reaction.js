import React from "react";
import classNames from "classnames/bind";
import Love from "~/assets/images/love.png";
import Haha from "~/assets/images/haha.png";
import Thank from "~/assets/images/thank.png";
import GoodIdea from "~/assets/images/goodIdea.png";
import Wow from "~/assets/images/wow.png";
import styles from "./Reaction.module.scss";
const cx = classNames.bind(styles);
const reactions = [
  {
    id: 1,
    react: Love,
    text: "Love",
  },
  {
    id: 2,
    react: Haha,
    text: "Haha",
  },
  {
    id: 3,
    react: Thank,
    text: "Thank",
  },
  {
    id: 4,
    react: GoodIdea,
    text: "GoodIdea",
  },
  {
    id: 5,
    react: Wow,
    text: "Wow",
  },
];
function Reaction({ setMouseIsOver, handleReactionClick }) {
  const handleReactionsMouseEnter = (e) => {
    e.stopPropagation();
  };

  const handleReactionsMouseLeave = () => {
    setMouseIsOver(false);
  };
  return (
    <div className={cx("reactions-wrapper")}>
      <div
        className={cx("reactions-container")}
        onMouseEnter={handleReactionsMouseEnter}
        onMouseLeave={handleReactionsMouseLeave}
      >
        <div className={cx("reactions-content")}>
          {reactions.map((reaction, index) => (
            <div
              className={cx("reaction")}
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleReactionClick(reaction.text);
              }}
            >
              <img src={reaction.react} alt="react" className={cx("react")} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reaction;
