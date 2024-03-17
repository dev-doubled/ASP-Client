import api from "~/services/apiService";

async function fetchGetFollowing(followerId) {
  try {
    const response = await api.get(`/follow/getFollowing/${followerId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching creator information:", error);
    throw error;
  }
}

async function fetchGetFollower(followingId) {
  try {
    const response = await api.get(`/follow/getFollower/${followingId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching creator information:", error);
    throw error;
  }
}

export { fetchGetFollowing, fetchGetFollower };
