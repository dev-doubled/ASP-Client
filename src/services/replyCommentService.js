import api from "~/services/apiService";

async function fetchGetReplyCommentByCommentId(commentId) {
  try {
    const response = await api.get(
      `/replyComment/get-all-by-commentId/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching creator information:", error);
    throw error;
  }
}

export { fetchGetReplyCommentByCommentId };
