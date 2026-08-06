import api from "./axios";

export const createBooking = async (payload) => {
  const response = await api.post("/bookings", payload);
  return response.data;
};

export const downloadTicket = async (bookingId) => {
  const response = await api.get(`/bookings/${bookingId}/ticket`, {
    responseType: "blob",
  });
  return response;
};
