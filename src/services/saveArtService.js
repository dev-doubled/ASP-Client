import api from "~/services/apiService";

async function fetchGetAllArtIDsForUser(userId) {
  try {
    const response = await api.get(`/save/getAllArts/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching artwork list:", error);
    throw error;
  }
}

export { fetchGetAllArtIDsForUser };
