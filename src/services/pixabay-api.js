import axios from 'axios';

export async function fetchImages(name, page = 1, per_page) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '41528122-08bf6ff4052e91093ac35f1ea';

    const params = new URLSearchParams({
        q: name,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page,
    });

    const response = await axios({
        method: 'GET',
        url: `${BASE_URL}?${params}`,
    });

    return response.data;
}
