import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { ClipLoader } from "react-spinners";
import { fetchPinInformationByUserId } from "~/services/artService";
import ImageCard from "~/components/Home/ImageCard";
import styles from "./Created.module.scss";
const cx = classNames.bind(styles);
function Created({ id }) {
  const [createdArtworkList, setCreatedArtworkList] = useState([]);
  const [loadingArtsShow, setLoadingArtsShow] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artworks = await fetchPinInformationByUserId(id);
        setCreatedArtworkList(artworks);
        setLoadingArtsShow(false);
      } catch (error) {
        console.error("Error fetching creator information:", error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <div className={cx("create-content-artwork-container")}>
      {loadingArtsShow ? (
        <div className={cx("create-content-artwork-loading")}>
          <ClipLoader
            size={40}
            color="#e60023"
            className={cx("loading-spinner")}
          />
        </div>
      ) : (
        <div className={cx("create-content-artwork-list")}>
          {createdArtworkList.map((art, index) => (
            <ImageCard artWork={art} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Created;
