import React from "react";
import classNames from "classnames/bind";
import ImageCard from "~/components/Home/ImageCard";
import { artworks } from "~/datas/artworkDatas";
import styles from "./PinRelated.module.scss";
const cx = classNames.bind(styles);

function PinRelated() {
  return (
    <>
      <div className={cx("related-heading")}>More to explore</div>
      <div className={cx("related-art-wrapper")}>
        <div className={cx("related-art-container")}>
          {artworks.map((image, index) => (
            <ImageCard image={image} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default PinRelated;
