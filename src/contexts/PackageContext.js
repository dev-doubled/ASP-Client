import { createContext, useEffect, useReducer } from "react";
import { fetchUserData } from "~/services/userService";
import { fetchFeatureByUserId } from "~/services/packageService";

const PackageContext = createContext();

const initialState = {
  feature: {},
  userId: localStorage.getItem("userId"),
};

const packageReducer = (state, action) => {
  switch (action.type) {
    case "SET_FEATURE":
      return {
        ...state,
        feature: action.payload,
      };
    default:
      return state;
  }
};

const PackageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(packageReducer, initialState);

  const setFeature = (data) => {
    dispatch({ type: "SET_FEATURE", payload: data });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (state.userId) {
          const secretKey = process.env.REACT_APP_SECRET_KEY_ENCODE;
          const userData = await fetchUserData(state.userId, secretKey);
          const featureData = await fetchFeatureByUserId(userData._id);
          setFeature(featureData);
        }
      } catch (error) {
        console.error("Error fetching feature data:", error);
      }
    };

    fetchData();
  }, [state.userId]);

  return (
    <PackageContext.Provider
      value={{
        ...state,
        feature: state.feature,
        setFeature,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export { PackageContext, PackageProvider };
