import axios from "axios";

const url = "/api/users";

const getUsers = async () => {
  const response = await axios.get(url);
  return response.data;
};

const createUser = async (newUser) => {
  const response = await axios.post(url, newUser);
  return response.data;
};

export default {
  getUsers,
  createUser,
};
