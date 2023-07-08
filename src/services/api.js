import axios from 'axios';

const API_KEY = '36804749-f9982f981e96555b628218181';
export const PER_PAGE = 12;

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    q: '',
    page: 1,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: PER_PAGE,
  },
});

export const getImages = async (q, page = 1) => {
  const { data } = await instance.get('', { params: { q, page } });
  // console.log('data: ', data);
  return data;
};
