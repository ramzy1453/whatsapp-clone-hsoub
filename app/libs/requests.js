import axios from "axios";

axios.defaults.baseURL = "http://192.168.1.8:8000";

export const register = async ({
  lastName,
  firstName,
  email,
  password,
  confirmPassword,
}) => {
  const response = await axios.post("/api/user/register", {
    lastName,
    firstName,
    email,
    password,
    confirmPassword,
  });

  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post("/api/user/login", {
    email,
    password,
  });

  return response.data;
};

export const getProfile = async (accessToken) => {
  const response = await axios.get("/api/user/profile", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const getUsers = async (accessToken) => {
  const response = await axios.get("/api/user/friends", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const updateUser = async (accessToken, formData) => {
  const response = await axios.put("/api/user", formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const createMessage = async (accessToken, { receiverId, content }) => {
  const response = await axios.post(
    "/api/message",
    {
      receiverId,
      content,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};
export const getMessages = async (accessToken) => {
  const response = await axios.get("/api/message/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
