import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '39796826-5323de49fb67ecd68459fdb2a';

export const fetchImages = async query => {
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
    });

    const response = await axios({
        method: 'GET',
        url: `${BASE_URL}?${params}`,
    });

    return response.data;
};

const api = {
    fetchImages
}

export default api
