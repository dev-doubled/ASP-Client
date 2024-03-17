import api from "~/services/apiService";

async function fetchCreatePaymentUrl(userId, amount, type) {
  try {
    const response = await api.get(
      `/payment/create_payment_url/${amount}/${userId}/${type}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching artwork list:", error);
    throw error;
  }
}

export { fetchCreatePaymentUrl };
