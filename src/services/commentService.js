import api from "~/services/apiService";

async function fetchGetCommentByArtId(artId) {
  try {
    const response = await api.get(`/comment/get-all-by-artId/${artId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching creator information:", error);
    throw error;
  }
}

export { fetchGetCommentByArtId };
