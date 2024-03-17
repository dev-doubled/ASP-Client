import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "~/services/apiService";

import ImageCard from "~/components/Home/ImageCard";

import { ClipLoader } from "react-spinners";
import FilterIcon from "~/assets/images/filter.png";
import Plus from "~/assets/images/plus.png";
import styles from "./Saved.module.scss";
const cx = classNames.bind(styles);
function Saved({ userData }) {
  const [artDetails, setArtDetails] = useState([]);
  const [loadingArtsShow, setLoadingArtsShow] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch artIDs based on userID
        if (userData._id) {
          const response = await api.get(`/save/getAllArts/${userData._id}`);

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
  }, [userData._id]);

  return (
    <div className={cx("saved-content-wrapper")}>
      <div className={cx("save-content-options-container")}>
        <div className={cx("save-content-options")}>
          <div className={cx("left")}>
            <img src={FilterIcon} alt="icon" className={"icon"} />
          </div>
          <Link to="/pin-creation-tool" className={cx("right")}>
            <img src={Plus} alt="icon" className={"icon"} />
          </Link>
        </div>
      </div>
      <div className={cx("save-content-artwork-container")}>
        {loadingArtsShow ? (
          <div className={cx("save-content-artwork-loading")}>
            <ClipLoader
              size={40}
              color="#e60023"
              className={cx("loading-spinner")}
            />
          </div>
        ) : artDetails.length > 0 ? (
          <div className={cx("save-content-artwork-list")}>
            {artDetails.map((art, index) => (
              <ImageCard artWork={art} key={index} />
            ))}
          </div>
        ) : (
          <div className={cx("no-artwork-list")}>
            <div className={cx("no-artwork-list-content")}>
              <div className={cx("text")}>You haven't saved any Pins yet</div>
              <Link to="/" className={cx("find-ideas-action")}>
                <div className={cx("text")}>Find ideas</div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Saved;
