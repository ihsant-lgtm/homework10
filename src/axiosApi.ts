import axios from "axios";

export const axiosApi = axios.create({
    baseURL: 'https://plovo-it-27-default-rtdb.europe-west1.firebasedatabase.app/'
})