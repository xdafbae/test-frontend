import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const getPosts = async (limit = 10, offset = 0) => {
  const response = await axios.get(`${API_BASE_URL}/article/${limit}/${offset}`);
  return response.data;
};

export const getPostById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/article/${id}`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axios.post(`${API_BASE_URL}/article`, postData);
  return response.data;
};

export const updatePost = async (id, postData) => {
  const response = await axios.put(`${API_BASE_URL}/article/${id}`, postData);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/article/${id}`);
  return response.data;
};
