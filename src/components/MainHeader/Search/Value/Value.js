import React from "react";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import styles from "./Value.module.scss";
const cx = classNames.bind(styles);
function Value({ searchResult, setShowSearch }) {
  const navigate = useNavigate();
  const handleClickSearchCategory = (id) => {
    navigate(`/search/pins/?q=${id}`);
    setShowSearch(false);
  };

  const handleClickSearchCreator = (id) => {
    navigate(`/creator/${id}`);
    setShowSearch(false);
  };
  return (
    <div className={cx("value-wrapper")}>
      <div className={cx("search-result-list-wrapper")}>
        <div className={cx("search-result-list")}>
          {searchResult.map((result) =>
            result.type === "category" ? (
              <div
                className={cx("search-result")}
                key={result.id}
                onClick={() => handleClickSearchCategory(result.id)}
              >
                <div className={cx("search-icon")}>
                  <i className={cx("fa-solid fa-magnifying-glass", "icon")}></i>
                </div>
                <div className={cx("search-text")}>
                  <div className={cx("text")}>{result.name}</div>
                </div>
              </div>
            ) : (
              <div
                className={cx("search-result")}
                key={result.id}
                onClick={() => handleClickSearchCreator(result.id)}
              >
                <div className={cx("search-creator-avt")}>
                  <img
                    src={result.avatar}
                    alt="creator-avt"
                    className={cx("creator-avt")}
                  />
                </div>
                <div className={cx("search-text")}>
                  <div className={cx("text")}>{result.name}</div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className={cx("search-result-rcm-wrapper")}>
        <div className={cx("search-result-rcm")}>
          <div className={cx("rcm-info")}>
            <div className={cx("text")}>Looking for ideas you saved?</div>
          </div>
          <div className={cx("search-pins-btn")}>
            <div className={cx("text")}>Search your Pins</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Value;
