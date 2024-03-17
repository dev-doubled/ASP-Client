import React from "react";
import classNames from "classnames/bind";
import { ideasForYou, popular } from "~/datas/noValueSearchDatas";
import styles from "./NoValue.module.scss";
const cx = classNames.bind(styles);

function NoValue() {
  return (
    <div className={cx("no-value-wrapper")}>
      <div className={cx("ideas-for-you")}>
        <span className={cx("text")}>Ideas for you</span>
      </div>
      <div className={cx("ideas-list-container")}>
        <div className={cx("ideas-list")}>
          {ideasForYou.map((idea) => (
            <div className={cx("idea-item")} key={idea.id}>
              <img src={idea.url} alt="idea-img" className={cx("idea-img")} />
              <div className={cx("idea-information")}>
                <span className={cx("text")}>{idea.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={cx("popular")}>
        <span className={cx("text")}>Popular on pesterin</span>
      </div>
      <div className={cx("popular-list-container")}>
        <div className={cx("popular-list")}>
          {popular.map((item) => (
            <div className={cx("popular-item")} key={item.id}>
              <img
                src={item.url}
                alt="idea-img"
                className={cx("popular-img")}
              />
              <div className={cx("popular-information")}>
                <span className={cx("text")}>{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NoValue;
