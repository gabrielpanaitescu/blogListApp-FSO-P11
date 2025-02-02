import axios from "axios";
const baseUrl = "/api/blogs";

let token;

const setToken = (storedToken) => {
  token = `Bearer ${storedToken}`;
};

const getConfig = () => ({
  headers: {
    Authorization: token,
  },
});

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfig());
  return response.data;
};

const update = async (blog) => {
  const id = blog.id;
  const url = `${baseUrl}/${id}`;

  const response = await axios.put(url, blog, getConfig());
  return response.data;
};

const deleteItem = async (id) => {
  const url = `${baseUrl}/${id}`;
  const response = await axios.delete(url, getConfig());
  return response.data;
};

const addComment = async ({ id, text }) => {
  const url = `${baseUrl}/${id}/comments`;
  const response = await axios.post(url, { text }, getConfig());

  return response.data;
};

const deleteComment = async ({ blogId, commentId }) => {
  const url = `${baseUrl}/${blogId}/${commentId}`;

  const response = await axios.delete(url, getConfig());

  return response.data;
};

const editComment = async ({ text, blogId, commentId }) => {
  const url = `${baseUrl}/${blogId}/${commentId}`;

  const response = await axios.put(url, { text }, getConfig());

  return response.data;
};

export default {
  setToken,
  getAll,
  create,
  update,
  deleteItem,
  addComment,
  deleteComment,
  editComment,
};
