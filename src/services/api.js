import axios from "axios";

const BASE_API_URL = "http://localhost:3001/users";

export const getUsers = () => axios.get(BASE_API_URL);
export const getUser = (id) => axios.get(`${BASE_API_URL}/users/:${id}`)
export const createUser = (user) => axios.post(`${BASE_API_URL}/${user}`)
export const updateUser = (id, user) => axios.put(`${BASE_API_URL}/${user}/:${id}`)
export const deleteUser = (id) => axios.delete(`${BASE_API_URL}/${id}`)

