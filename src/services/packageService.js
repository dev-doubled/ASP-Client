import api from "~/services/apiService";

async function fetchFeatureByUserId(userId) {
  try {
    const response = await api.get(`/package/getFeatureByUserId/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching artwork list:", error);
    throw error;
  }
}

async function fetchDecreaseDownloadCount(userId, packageId) {
  try {
    const response = await api.get(
      `/package/decreaseDownloadCount/${userId}/${packageId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching artwork list:", error);
    throw error;
  }
}

export { fetchFeatureByUserId, fetchDecreaseDownloadCount };
