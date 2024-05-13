import axios from "axios";

axios.defaults.headers.post['Content-Type'] = "application/json";
axios.defaults.headers.post['Accept'] = "application/json";

export const servicesApi = () => {
    const baseUrl = "http://localhost:3000/services"


    const getAll = async () => {
        const response = await axios.get(baseUrl)
        return response
    }
    return {
        getAll
    }
    
}
export const totalApi =() => {
    const baseUrl ='http://localhost:3000/budget';
    
    const postTotal = async (data: object) => {
        try {
            const response = await axios.post(baseUrl, data);
            return response.data;
        } catch (error) {
            console.error("Error posting total:", error);
            throw error;
        }
    };

    const getTotal = async () => {
        const response = await axios.get(baseUrl)
        return response
    };

    return {
        postTotal,
        getTotal 
    };
 
}