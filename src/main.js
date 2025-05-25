
import { getImagesByQuery, perPage } from './js/pixabay-api.js';
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
let totalHitsGlobal = 0; 

loadMore.addEventListener('click', onLoad);

async function onLoad() {
  currentPage += 1;

  showLoader();

  try {
    const { hits } = await getImagesByQuery(query, currentPage);
    createGallery(hits);

    const totalLoaded = currentPage * perPage;

    if (totalLoaded >= totalHitsGlobal) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topCenter',
    });
  } finally {
    hideLoader();

    const card = document.querySelector('.gallery-item');
    if (card) {
      const cardHeight = card.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    };
  }
}

// submit
form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();

  hideLoadMoreButton()

  query = event.target.elements.searchText.value.trim();  // зберігаємо значення з інпута

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

  try {
    const { hits, totalHits } = await getImagesByQuery(query, currentPage);

    totalHitsGlobal = totalHits;

    if (totalHits === 0 || hits.length === 0) {
  iziToast.error({
    title: 'Error',
    message: 'Sorry, there are no images matching your search query. Please try again!',
  });
  return;
}

    createGallery(hits);

    const totalLoaded = currentPage * perPage;
    if (totalLoaded < totalHitsGlobal) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }

  } catch (error) {
    console.error(error);
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topCenter',
    });
  } finally {
    hideLoader();
  };

  event.target.reset();
}


