import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { ClipLoader } from "react-spinners";
import { useLocation } from "react-router-dom";

import { fetchGetArtworkByCategoryId } from "~/services/artService";

import ImageCard from "~/components/Home/ImageCard";
import MainHeader from "~/layouts/MainHeader";
import styles from "./SearchPins.module.scss";
const cx = classNames.bind(styles);

function SearchPins({ onLogout }) {
  const location = useLocation();

  const [artworksList, setArtworksList] = useState([]);
  const [loadingShowArtworksList, setLoadingShowArtworksList] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get("q");
    const fetchData = async () => {
      try {
        const artWorkList = await fetchGetArtworkByCategoryId(categoryId);
        setLoadingShowArtworksList(false);
        setArtworksList(artWorkList);
      } catch (error) {
        console.error("Error fetching pin information:", error);
        setLoadingShowArtworksList(false);
      }
    };

    fetchData();
  }, [location.search]);

  return (
    <div className={cx("search-pins-wrapper")}>
      <MainHeader onLogout={onLogout} />
      <div className={cx("search-pins-container")}>
        {loadingShowArtworksList ? (
          <div className={cx("show-artworks-loading")}>
            <ClipLoader
              size={40}
              color="#e60023"
              className={cx("loading-spinner")}
            />
          </div>
        ) : (
          <div className={cx("show-artworks-list")}>
            {artworksList.map((artWork) => (
              <ImageCard key={artWork._id} artWork={artWork} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPins;
