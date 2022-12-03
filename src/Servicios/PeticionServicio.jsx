import axios from 'axios'
const baseUrl = process.env.REACT_APP_BASE_URL

export const PeticionGet = async (endpoint) => {
        const response = await axios.get(`${baseUrl}/${endpoint}`)
        return response;
};
  