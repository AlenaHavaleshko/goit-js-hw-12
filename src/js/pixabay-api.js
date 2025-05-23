
import axios from 'axios';
import '../css/styles.css';


  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '50282223-5a409711ad86c04843247122a';
  const perPage = 15;

export async function getImagesByQuery(query, page) {
  console.log(page);

   const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      page: page,
      per_page: perPage,
      image_type: 'photo',  
      orientation: 'horizontal',
      safesearch: true,
    }
   })
  return response.data.hits;           // Повна відповідь (великий об'єкт)
                                                   // response.data - Дані від API (об'єкт з total, totalHits, hits)
                                                  // response.data.hits - Масив об'єктів з картинками
}



