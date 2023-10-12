import axios from 'axios'

const BASE_URL= "http://localhost:8080/"

//const BASE_URL= 'https://bethel-back-f07a-dev.fl0.io/'

export default axios.create({
    baseURL: BASE_URL,
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true
});
