import axios from "axios";
import { STRAPI_URL } from "./constraints";

const API_BASE_URL = STRAPI_URL;

const ajax =  axios.create({
    baseURL: API_BASE_URL
});
export default ajax;