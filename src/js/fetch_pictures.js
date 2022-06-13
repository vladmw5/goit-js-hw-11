import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '28031110-e15497f5225bacebbd356f3c2';
const PARAMS =
  'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

export default async function getImages(keyWord, page = 1) {
  const url = `${BASE_URL}?key=${KEY}&q=${keyWord}&${PARAMS}&page=${page}`;

  try {
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.log(err?.message);
  }
}
