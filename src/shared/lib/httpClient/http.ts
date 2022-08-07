import axios from "axios";
import { IHttp } from "./http.interface";

const Http = (): IHttp => {
    return {
        get: async<T>(url: string): Promise<T> => {
            return axios.get(url).then(data => data.data);
        }
    }
}

export default Http;