import axios from "./setCredentialsAxios";

export const getPostReq = () => axios.get("/post");

export const getPostByIdReqa = (id) => axios.get(`/postbyid/${id}`);

export const getPostByIdReq = (id) => axios.get(`/post/${id}`);

export const createPostReq = (post) => axios.post("/post", post);

export const updatePostReq = (id, post) => axios.put(`/post/${id}`, post);

export const deletePostReq = (id) => axios.delete(`/post/${id}`);
