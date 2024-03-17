import classNames from "classnames/bind";
import { useContext, useRef, useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  list,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 } from "uuid";
import { ClipLoader } from "react-spinners";

import { storage } from "~/configs/firebase";
import { AuthContext } from "~/contexts/AuthContext";
import styles from "./EditProfile.module.scss";
import api from "~/services/apiService";
const cx = classNames.bind(styles);
function EditProfile({ setShowEditProfile, setLoading }) {
  const fileInputImageRef = useRef(null);
  const { userData, setUserData } = useContext(AuthContext);
  const [aboutCountInput, setAboutCountInput] = useState(0);
  const [avatarImg, setAvatarImg] = useState(userData.avatar);
  const [userInfo, setUserInfo] = useState({
    avatar: userData.avatar,
    firstName: userData.firstName,
    lastName: userData.lastName,
    userName: userData.userName,
    about: userData.about,
    website: userData.website,
  });
  const [loadingUploadAvatar, setLoadingUploadAvatar] = useState(false);

  const handleClickChangeAvatar = () => {
    fileInputImageRef.current.click();
  };

  const handleChangeAvatar = async (e) => {
    setLoadingUploadAvatar(true);
    let file = null;
    let url;

    //Preview cover image
    if (e.target.files.length === 1) {
      file = e.target.files[0];
      url = URL.createObjectURL(file);

      if (avatarImg) {
        URL.revokeObjectURL(avatarImg);
      }

      // Get a reference to the userAvatars folder
      const userAvatarsFolderRef = ref(storage, `userAvatars/${userData._id}`);

      // List all items in the folder
      const items = await list(userAvatarsFolderRef);

      // Delete each item in the folder
      const deletePromises = items.items.map(async (item) => {
        try {
          await deleteObject(item);
          console.log(`Deleted old avatar: ${item.name}`);
        } catch (deleteError) {
          console.error(
            `Error deleting old avatar: ${item.name}`,
            deleteError.message
          );
        }
      });

      // Wait for all deletions to complete
      await Promise.all(deletePromises);

      //Upload User Avatar to Firebase
      const userAvatarRef = ref(
        storage,
        `userAvatars/${userData._id}/${file.name + v4()}`
      );
      try {
        await uploadBytes(userAvatarRef, file);
        const downloadURL = await getDownloadURL(userAvatarRef);
        setAvatarImg(url);
        setUserInfo({ ...userInfo, avatar: downloadURL });
        setLoadingUploadAvatar(false);
        console.log("User avatar uploaded successfully");
      } catch (error) {
        console.error("Error uploading file:", error.message);
      }
    }
  };

  const handleChangeFirstName = (e) => {
    setUserInfo({ ...userInfo, firstName: e.target.value });
  };

  const handleChangeLastName = (e) => {
    setUserInfo({ ...userInfo, lastName: e.target.value });
  };

  const handleChangeAbout = (e) => {
    setUserInfo({ ...userInfo, about: e.target.value });
    setAboutCountInput(e.target.value.length);
  };

  const handleChangeWebsite = (e) => {
    setUserInfo({ ...userInfo, website: e.target.value });
  };

  const handleChangeUsername = (e) => {
    setUserInfo({ ...userInfo, userName: e.target.value });
  };

  const handleUpdateUser = () => {
    setLoading(true);
    const updateUserInfo = {
      avatar: userInfo.avatar.trim(),
      firstName: userInfo.firstName.trim(),
      lastName: userInfo.lastName.trim(),
      about: userInfo.about.trim(),
      website: userInfo.website.trim(),
      userName: userInfo.userName.trim(),
    };

    api
      .post(`/user/updateUser/${userData._id}`, updateUserInfo)
      .then((response) => {
        setLoading(false);
        setUserData(response.data);
        setShowEditProfile(false);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(updateUserInfo);
  };

  return (
    <div className={cx("edit-profile-wrapper")}>
      <div className={cx("edit-profile-container")}>
        <div className={cx("edit-profile-heading")}>
          <div className={cx("empty")}></div>
          <div className={cx("heading-text")}>Edit profile</div>
          <div
            className={cx("close")}
            onClick={() => setShowEditProfile(false)}
          >
            <i className={cx("fa-solid fa-xmark", "icon")}></i>
          </div>
        </div>
        <div className={cx("edit-profile-content-container")}>
          <div className={cx("edit-profile-content-main")}>
            <div className={cx("desc-information")}>
              Keep your personal details private. Information you add here is
              visible to anyone who can view your profile.
            </div>
            <div className={cx("edit-photo")}>
              <div className={cx("photo-text")}>Photo</div>
              <div className={cx("photo-container")}>
                <div className={cx("profile-avatar")}>
                  <img
                    src={avatarImg}
                    alt="profile-img"
                    className={cx("profile-image")}
                  />
                  {loadingUploadAvatar && (
                    <div className={cx("avatar-loading")}>
                      <ClipLoader
                        size={25}
                        color="#e60023"
                        className={cx("loading-spinner")}
                      />
                    </div>
                  )}
                </div>
                <button
                  className={cx("change-photo-btn")}
                  onClick={handleClickChangeAvatar}
                >
                  Change
                </button>
                <input
                  ref={fileInputImageRef}
                  type="file"
                  accept="image/*"
                  name="img"
                  multiple
                  className={cx("image-input")}
                  style={{ display: "none" }}
                  onChange={handleChangeAvatar}
                />
              </div>
            </div>
            <div className={cx("edit-full-name")}>
              <div className={cx("edit-first-name")}>
                <div className={cx("text")}>First name</div>
                <input
                  type="text"
                  value={userInfo.firstName}
                  spellCheck={false}
                  className={cx("first-name-input")}
                  onChange={handleChangeFirstName}
                />
              </div>
              <div className={cx("edit-last-name")}>
                <div className={cx("text")}>Last name</div>
                <input
                  type="text"
                  value={userInfo.lastName}
                  spellCheck={false}
                  className={cx("last-name-input")}
                  onChange={handleChangeLastName}
                />
              </div>
            </div>
            <div className={cx("edit-about")}>
              <div className={cx("text")}>About</div>
              <input
                type="text"
                value={userInfo.about}
                spellCheck={false}
                className={cx("about-input")}
                maxLength={50}
                onChange={handleChangeAbout}
              />
              <div className={cx("count-input")}>{aboutCountInput}/50</div>
            </div>
            <div className={cx("edit-website")}>
              <div className={cx("text")}>Website</div>
              <input
                type="text"
                value={userInfo.website}
                spellCheck={false}
                className={cx("website-input")}
                onChange={handleChangeWebsite}
              />
            </div>
            <div className={cx("edit-username")}>
              <div className={cx("text")}>Username</div>
              <input
                type="text"
                value={userInfo.userName}
                spellCheck={false}
                className={cx("username-input")}
                onChange={handleChangeUsername}
              />
              <div className={cx("example")}>
                www.pesterin.com/{userInfo.userName.replace(/ /g, "")}
              </div>
            </div>
          </div>
        </div>
        <div className={cx("edit-profile-footer")}>
          <div className={cx("edit-profile-action")}>
            <button
              className={cx("cancel-btn")}
              onClick={() => setShowEditProfile(false)}
            >
              Cancel
            </button>
            <button className={cx("save-btn")} onClick={handleUpdateUser}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
