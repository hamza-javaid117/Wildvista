export const AUTH_STORAGE_KEY = "wildvista-auth";
export const USER_STORAGE_KEY = "wildvista-user";

export const isUserLoggedIn = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const token = window.localStorage.getItem(AUTH_STORAGE_KEY);
  return Boolean(token && token !== "false");
};

export const getAuthToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEY);
};

export const loginUser = (token, user = null) => {
  if (typeof window !== "undefined") {
    if (token) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, token);
    }

    if (user) {
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    }
  }
};

export const logoutUser = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    window.localStorage.removeItem(USER_STORAGE_KEY);
  }
};
