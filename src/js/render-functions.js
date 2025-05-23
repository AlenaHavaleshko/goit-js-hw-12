import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
export const loadMore = document.querySelector('.js-load');


//  Створення екземпляра SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

//  Єдина функція — створює + вставляє + оновлює лайтбокс
export function createGallery(images) {
  const markup = images.map(({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) => `<li class="gallery-item">
            <a href="${largeImageURL}">
              <img src="${webformatURL}" alt="${tags}" />
            </a>
            <div class="info">
              <p><b>Likes:</b> ${likes}</p>
              <p><b>Views:</b> ${views}</p>
              <p><b>Comments:</b> ${comments}</p>
              <p><b>Downloads:</b> ${downloads}</p>
            </div>
        </li>`
  ).join('');

  galleryContainer.insertAdjacentHTML('beforeend',markup);
  lightbox.refresh();
}

// Очищення галереї
export function clearGallery() {
  galleryContainer.innerHTML = '';
}

// Показати лоадер
export function showLoader() {
  loader.classList.add('is-active');
  loader.classList.remove('is-hidden');
}

// Сховати лоадер
export function hideLoader() {
  loader.classList.add('is-hidden');
  loader.classList.remove('is-active');
}

// додає клас для відображення кнопки load more
export function showLoadMoreButton() {
  loadMore.classList.add('is-active');
  loadMore.classList.remove('is-hidden');
};

// прибирає клас для відображення кнопки load more
export function hideLoadMoreButton() {
  loadMore.classList.add('is-hidden');
  loadMore.classList.remove('is-active');
};





