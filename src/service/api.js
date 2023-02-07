import axios from 'axios';

const REQUEST_BASE_URL = 'https://pixabay.com/api/';
const PIXABAY_API_KEY = '32148291-f9daa6b0a4ebde44950954495';

export default async function fetchImagesOnQuery(query, page) {
  const response = await axios(
    `${REQUEST_BASE_URL}?q=${query}&page=${page}&key=${PIXABAY_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (response.status === 200) {
    return response.data;
  }
}
