import axios from "./setCredentialsAxios";

export const getCommentByIdReq = (id) => axios.get(`/postcomment/${id}`);

export const createComentReq = (post) => axios.post("/postcomment", post);

export const deleteComentReq = (id) => axios.delete(`/postcomment/${id}`);