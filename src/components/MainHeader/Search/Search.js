import React from "react";
import classNames from "classnames/bind";
import NoValue from "./NoValue";
import styles from "./Search.module.scss";
import Value from "./Value";
const cx = classNames.bind(styles);
function Search({ searchValue, searchResult, setShowSearch }) {
  return (
    <div className={cx("search-wrapper")}>
      <div className={cx("search-container")}>
        {searchValue !== "" ? (
          <Value searchResult={searchResult} setShowSearch={setShowSearch} />
        ) : (
          <NoValue />
        )}
      </div>
    </div>
  );
}

export default Search;
