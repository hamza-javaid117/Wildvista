import api from "./axios";

export const createBooking = async (payload) => {
  const response = await api.post("/booking", payload);
  return response.data;
};

export const getMyBookings = async () => {
  const response = await api.get("/booking/my-bookings");
  return response.data;
};

export const getBookingById = async (id) => {
  const response = await api.get(`/booking/${id}`);
  return response.data;
};

export const updateBooking = async (id, payload) => {
  const response = await api.put(`/booking/${id}`, payload);
  return response.data;
};

export const deleteBooking = async (id) => {
  const response = await api.delete(`/booking/${id}`);
  return response.data;
};
