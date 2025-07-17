// src/services/apiService.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

const getPosts = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get(
      `/posts?_page=${page}&_limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

const getPostById = async (id) => {
  try {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with ID ${id}:`, error);
    throw error;
  }
};

const createPost = async (data) => {
  try {
    const response = await apiClient.post("/posts", data);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

const updatePost = async (id, data) => {
  try {
    const response = await apiClient.put(`/posts/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating post with ID ${id}:`, error);
    throw error;
  }
};

const deletePost = async (id) => {
  try {
    await apiClient.delete(`/posts/${id}`);
  } catch (error) {
    console.error(`Error deleting post with ID ${id}:`, error);
    throw error;
  }
};

export { getPosts, getPostById, createPost, updatePost, deletePost };
