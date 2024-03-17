import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { fetchUserDataV2 } from "~/services/userService";

import SideBar from "~/components/Admin/SideBar";
import NotFound from "~/components/NotFound";
import MainHeader from "~/layouts/MainHeader";

import styles from "./TransactionManagement.module.scss";
const cx = classNames.bind(styles);
function TransactionManagement({ onLogout }) {
  const [authorize, setAuthorize] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedToken = localStorage.getItem("accessToken");
        if (!storedToken) {
          throw new Error("Access token not found in localStorage");
        }
        const decodeAccessToken = jwtDecode(storedToken);
        const userId = decodeAccessToken.userId;
        if (!userId) {
          throw new Error("User ID not found in token");
        }
        const userData = await fetchUserDataV2(userId);
        if (userData && userData.type !== "Admin") {
          setAuthorize(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []);

  return (
    <>
      {authorize ? (
        <NotFound />
      ) : (
        <div className={cx("transaction-management-wrapper")}>
          <MainHeader onLogout={onLogout} type="Admin" />
          <div className={cx("transaction-management-container")}>
            <SideBar />
          </div>
        </div>
      )}
    </>
  );
}

export default TransactionManagement;
