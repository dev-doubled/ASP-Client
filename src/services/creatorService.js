import api from "~/services/apiService";

async function fetchCreatorInformation(userId) {
  try {
    const response = await api.get(`/user/getUserById/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching creator information:", error);
    throw error;
  }
}

export { fetchCreatorInformation };
