import { createContext, useEffect, useReducer } from "react";
import { fetchGetConversation } from "~/services/conversationService";
import { fetchUserData } from "~/services/userService";

const MessageContext = createContext();

const initialState = {
  conversations: [],
  userId: localStorage.getItem("userId"),
};

const messageReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONVERSATION":
      return {
        ...state,
        conversations: action.payload,
      };
    default:
      return state;
  }
};

const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, initialState);

  const setConversations = (data) => {
    dispatch({ type: "SET_CONVERSATION", payload: data });
  };

  useEffect(() => {
    if (state.userId) {
      const getConversations = async () => {
        try {
          const secretKey = process.env.REACT_APP_SECRET_KEY_ENCODE;
          const userData = await fetchUserData(state.userId, secretKey);
          const conversationRes = await fetchGetConversation(userData._id);
          setConversations(conversationRes);
        } catch (err) {
          console.log(err);
        }
      };

      getConversations();
    }
  }, [state.userId]);

  return (
    <MessageContext.Provider
      value={{
        ...state,
        conversations: state.conversations,
        setConversations,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageProvider };
