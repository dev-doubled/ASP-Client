import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { ClipLoader } from "react-spinners";
import api from "~/services/apiService";
import ImageCard from "~/components/Home/ImageCard";
import styles from "./Saved.module.scss";
const cx = classNames.bind(styles);
function Saved({ id }) {
  const [artDetails, setArtDetails] = useState([]);
  const [loadingArtsShow, setLoadingArtsShow] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch artIDs based on userID
        if (id) {
          const response = await api.get(`/save/getAllArts/${id}`);

          // Fetch art details based on artIDs
          const artDetailsPromises = response.data.map((artID) =>
            api.get(`/art/getArtworkById/${artID}`)
          );

          // Resolve all promises and set artDetails when data is available
          const detailsResponses = await Promise.all(artDetailsPromises);
          const detailsData = detailsResponses.map((response) => response.data);
          setArtDetails(detailsData);
          setLoadingArtsShow(false);
        }
      } catch (error) {
        console.error("Error fetching art data:", error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <div className={cx("save-content-artwork-container")}>
      {loadingArtsShow ? (
        <div className={cx("save-content-artwork-loading")}>
          <ClipLoader
            size={40}
            color="#e60023"
            className={cx("loading-spinner")}
          />
        </div>
      ) : (
        <div className={cx("save-content-artwork-list")}>
          {artDetails.map((art, index) => (
            <ImageCard artWork={art} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Saved;
