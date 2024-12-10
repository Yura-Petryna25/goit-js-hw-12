import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '47428851-5b047435bdffa798507e52955';

export async function fetchImages(query, page = 1, perPage = 15) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: perPage,
    },
  });

  return response.data;
}
