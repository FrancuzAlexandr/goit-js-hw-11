import { Notify } from 'notiflix';
import { markupGallery } from './markup.js';
import { PixabayAPI } from './fetchRequest.js';

// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

//  const lightBox = new SimpleLightbox(".gallery a", {captionDelay: 250, captionsData: "alt"})

const pixabayAPI = new PixabayAPI();

const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loarMoreBtnEl = document.querySelector('.load-more');

const onSubmitForm = async event => {
  event.preventDefault();
  galleryEl.innerHTML = '';
  loarMoreBtnEl.classList.add('is-hidden');

  const searchQuery = event.currentTarget.searchQuery.value.trim();
  pixabayAPI.query = searchQuery;

  try {
    const { data } = await pixabayAPI.fetchGallery();

    if (!data.hits.length) {
      Notify.failure(
        `Sorry, there are no images matching your ${searchQuery} Please try again.`
      );
      return;
    }

    galleryEl.innerHTML = markupGallery(data.hits);

    Notify.success(`Hooray! We found ${data.totalHits} images.`);
    loarMoreBtnEl.classList.remove('is-hidden');
  } catch (err) {
    console.log(err);
  }
};

const onBtnClick = async () => {
  pixabayAPI.page += 1;

  try {
    const { data } = await pixabayAPI.fetchGallery();

    if (pixabayAPI.page * 40 > data.totalHits) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      loarMoreBtnEl.classList.add('is-hidden');
    }

    galleryEl.innerHTML += markupGallery(data.hits);
  } catch (err) {
    console.log(err);
  }
};

searchFormEl.addEventListener('submit', onSubmitForm);
loarMoreBtnEl.addEventListener('click', onBtnClick);
