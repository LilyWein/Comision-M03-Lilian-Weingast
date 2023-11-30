import axios from "./setCredentialsAxios";

//registerReq 
export const registerReq = (user) => axios.post(`/register`, user);

//loginRequest
export const loginRequest = (user) => axios.post(`/login`, user);

//verificación del token
export const verifyToken = () => axios.get(`/verifyToken`);
