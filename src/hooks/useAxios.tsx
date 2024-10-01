import axios from "axios";
import { PRODUCTS_API } from "./useEnv";

export const useAxios = () => axios.create({baseURL:PRODUCTS_API})