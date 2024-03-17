import React from "react";
import classNames from "classnames/bind";
import styles from "./SearchTag.module.scss";
const cx = classNames.bind(styles);
function SearchTag({ setShowSearchTag, searchTagResult, setSearchValue }) {
  const handleChooseTag = (result) => {
    setShowSearchTag(false);
    setSearchValue(result);
  };
  return (
    <div className={cx("search-tag-wrapper")}>
      <div className={cx("search-tag-container")}>
        <div className={cx("matched-tags")}>
          <div className={cx("text")}>Matched tags</div>
        </div>
        <div className={cx("search-result-list")}>
          {searchTagResult.map((result, index) => (
            <div
              className={cx("search-result")}
              key={index}
              onClick={() => handleChooseTag(result)}
            >
              {result}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchTag;
