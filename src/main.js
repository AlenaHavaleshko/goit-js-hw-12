
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  loadMore
}
  from './js/render-functions.js';
  import iziToast from 'izitoast';
  import 'izitoast/dist/css/iziToast.min.css';


const form = document.querySelector('.form');
let currentPage = 1;
let query = "";
let totalPages = 5;


loadMore.addEventListener('click', onLoad);

function onLoad() {
  currentPage += 1;

  showLoader();

  getImagesByQuery(query, currentPage)
    .then(images => {
      createGallery(images);
      if (currentPage >= totalPages) {
        hideLoadMoreButton();
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    })
    .catch(error => {
      console.error(error);
      iziToast.error({
        message: 'Something went wrong. Please try again later.',
        position: 'topCenter',
      });
    })
    .finally(() => {
      hideLoader();

      const card = document.querySelector('.gallery-item');
      if (card) {
        const cardHeight = card.getBoundingClientRect().height;
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
    });
}

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  console.log('Форма відправлена');

  hideLoadMoreButton()

  query = event.target.elements['search-text'].value.trim();  // зберігаємо значення з інпута

  if (query === '') {
    iziToast.warning({
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  currentPage = 1;

  clearGallery();
  showLoader();


  getImagesByQuery(query, currentPage)
    .then(images => {
      if (images.length === 0) {
        iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please, try again!',
          position: 'topRight',
        });
        return;
      }

      createGallery(images);

    }).catch(error => {
      console.error(error);
      iziToast.error({
        message: 'Something went wrong. Please try again later.',
        position: 'topCenter',
      });
    })
    .finally(() => {
      hideLoader();
      showLoadMoreButton();
    });

  event.target.reset();
}


