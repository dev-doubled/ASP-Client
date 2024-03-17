import classNames from "classnames/bind";
import { useContext, useState } from "react";

import { AuthContext } from "~/contexts/AuthContext";
import {
  businessPackageDatas,
  enterprisePackageDatas,
  freePackageDatas,
} from "~/datas/packageDatas";
import api from "~/services/apiService";
import { convertUSDToVND } from "~/utils/convertToUSD";

import LoadingSpinner from "~/components/LoadingSpinner";

import MainHeader from "~/layouts/MainHeader";
import styles from "./Business.module.scss";
const cx = classNames.bind(styles);
function Business({ onLogout }) {
  const { userData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const handleTryFree = () => {
    setLoading(true);
    const packageFreeData = {
      userId: userData._id,
      name: freePackageDatas.type,
      price: 0,
    };
    api
      .post("/package/free-trial-package", packageFreeData)
      .then((response) => {
        setLoading(false);
        window.history.go(-1);

        setTimeout(() => {
          window.location.reload();
        }, 10);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBusinessPayment = async () => {
    setLoading(true);
    const vndAmount = convertUSDToVND(businessPackageDatas.price, 24675);
    try {
      api
        .get(
          `/payment/create_payment_url/${vndAmount}/${userData._id}/${businessPackageDatas.type}`
        )
        .then((response) => {
          const vnpUrl = response.data;
          setLoading(false);
          window.location.href = vnpUrl;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEnterprisePayment = () => {
    setLoading(true);
    const vndAmount = convertUSDToVND(enterprisePackageDatas.price, 24675);
    try {
      api
        .get(
          `/payment/create_payment_url/${vndAmount}/${userData._id}/${enterprisePackageDatas.type}`
        )
        .then((response) => {
          const vnpUrl = response.data;
          setLoading(false);
          window.location.href = vnpUrl;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {loading && <LoadingSpinner loading={loading} />}
      <div className={cx("business-wrapper")}>
        <MainHeader onLogout={onLogout} type="NoSearch" />
        <div className={cx("business-container")}>
          <div className={cx("package-container")}>
            <div className={cx("package-introduction")}>
              <div className={cx("type-of-package")}>Pricing</div>
              <div className={cx("head-title")}>Best Plans For Business</div>
              <div className={cx("description")}>
                Thank you for considering our services! Below, you will find our
                flexible pricing options tailored to meet your needs.
              </div>
            </div>
            <div className={cx("package-information")}>
              <div className={cx("package-list")}>
                {/* Free */}
                <div className={cx("package-item")}>
                  <div className={cx("pricing-container")}>
                    <div className={cx("price")}>{freePackageDatas.price}</div>
                    <div className={cx("type-package")}>
                      {freePackageDatas.type} plan
                    </div>
                  </div>
                  <div className={cx("feature-container")}>
                    {freePackageDatas.features.map((feature) =>
                      feature.isCheck === true ? (
                        <div className={cx("feature")} key={feature.id}>
                          <i className={cx("fa-solid fa-check", "icon")}></i>
                          <span className={cx("text")}>{feature.name}</span>
                        </div>
                      ) : (
                        <div
                          className={cx("feature-not-access")}
                          key={feature.id}
                        >
                          <i className={cx("fa-solid fa-xmark", "icon")}></i>
                          <span className={cx("text")}>{feature.name}</span>
                        </div>
                      )
                    )}
                  </div>
                  <div className={cx("action-container")}>
                    <button
                      className={cx("action-btn")}
                      onClick={handleTryFree}
                    >
                      Try it for free
                    </button>
                  </div>
                </div>

                {/* Business */}
                <div className={cx("package-item-popular")}>
                  <div className={cx("pricing-container")}>
                    <div className={cx("price")}>
                      ${businessPackageDatas.price}{" "}
                    </div>
                    <div className={cx("type-package")}>
                      {businessPackageDatas.type} plan
                    </div>
                  </div>
                  <div className={cx("feature-container")}>
                    {businessPackageDatas.features.map((feature) =>
                      feature.isCheck === true ? (
                        <div className={cx("feature")} key={feature.id}>
                          <i className={cx("fa-solid fa-check", "icon")}></i>
                          <span className={cx("text")}>{feature.name}</span>
                        </div>
                      ) : (
                        <div
                          className={cx("feature-not-access")}
                          key={feature.id}
                        >
                          <i className={cx("fa-solid fa-xmark", "icon")}></i>
                          <span className={cx("text")}>{feature.name}</span>
                        </div>
                      )
                    )}
                  </div>
                  <div className={cx("action-container")}>
                    <button
                      className={cx("action-btn")}
                      onClick={handleBusinessPayment}
                    >
                      Get started
                    </button>
                  </div>
                </div>

                {/* Enterprise */}
                <div className={cx("package-item")}>
                  <div className={cx("pricing-container")}>
                    <div className={cx("price")}>
                      ${enterprisePackageDatas.price}
                    </div>
                    <div className={cx("type-package")}>
                      {enterprisePackageDatas.type} plan
                    </div>
                  </div>
                  <div className={cx("feature-container")}>
                    {enterprisePackageDatas.features.map((feature) =>
                      feature.isCheck === true ? (
                        <div className={cx("feature")} key={feature.id}>
                          <i className={cx("fa-solid fa-check", "icon")}></i>
                          <span className={cx("text")}>{feature.name}</span>
                        </div>
                      ) : (
                        <div
                          className={cx("feature-not-access")}
                          key={feature.id}
                        >
                          <i className={cx("fa-solid fa-xmark", "icon")}></i>
                          <span className={cx("text")}>{feature.name}</span>
                        </div>
                      )
                    )}
                  </div>
                  <div className={cx("action-container")}>
                    <button
                      className={cx("action-btn")}
                      onClick={handleEnterprisePayment}
                    >
                      Get started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Business;
