import api from "~/services/apiService";

async function fetchGetConversation(userId) {
  try {
    const response = await api.get(`/conversation/getConversation/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching artwork list:", error);
    throw error;
  }
}

async function fetchGetConversationById(conversationId) {
  try {
    const response = await api.get(
      `/conversation/getConversationById/${conversationId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching artwork list:", error);
    throw error;
  }
}

export { fetchGetConversation, fetchGetConversationById };
