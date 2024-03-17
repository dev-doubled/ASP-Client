import api from "~/services/apiService";

async function fetchGetNotificationsForUser(userId) {
  try {
    const response = await api.get(
      `/notification/getNotificationsByUserId/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching notification list:", error);
    throw error;
  }
}

async function getUnreadNotifications(userId) {
  try {
    const response = await api.get(
      `/notification/getUnreadNotifications/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching notification list:", error);
    throw error;
  }
}

export { fetchGetNotificationsForUser, getUnreadNotifications };
