import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

import { fetchArtworkList } from "~/services/artService";

import ImageCard from "~/components/Home/ImageCard";
import MainHeader from "~/layouts/MainHeader";

import styles from "./Home.module.scss";
const cx = classNames.bind(styles);

function Home({ onLogout }) {
  const [artworksList, setArtworksList] = useState([]);
  const [loadingShowArtworksList, setLoadingShowArtworksList] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artWorkList = await fetchArtworkList();
        setLoadingShowArtworksList(false);
        setArtworksList(artWorkList);
      } catch (error) {
        console.error("Error fetching pin information:", error);
        setLoadingShowArtworksList(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={cx("home-wrapper")}>
      <MainHeader onLogout={onLogout} />
      <div className={cx("home-container")}>
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

export default Home;
