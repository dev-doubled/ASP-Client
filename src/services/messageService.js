import api from "~/services/apiService";

async function fetchGetMessages(conversationId) {
  try {
    const response = await api.get(`/message/getMessage/${conversationId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching artwork list:", error);
    throw error;
  }
}

export { fetchGetMessages };
