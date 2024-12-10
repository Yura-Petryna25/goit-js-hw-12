import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('#load-more');
const loader = document.querySelector('.loader');

let query = '';
let page = 1;
let totalHits = 0;
let lightbox;

form.addEventListener('submit', handleSearch);
loadMoreButton.addEventListener('click', loadMoreImages);

async function handleSearch(event) {
  event.preventDefault();
  query = event.currentTarget.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({ message: 'Please enter a search query!' });
    return;
  }

  page = 1;
  gallery.innerHTML = '';
  toggleLoader(true);
  loadMoreButton.classList.add('hidden');

  try {
    const { hits, totalHits: total } = await fetchImages(query, page);
    totalHits = total;

    if (hits.length === 0) {
      iziToast.info({ message: 'No results found.' });
      return;
    }

    gallery.innerHTML = renderGallery(hits);
    initializeLightbox();

    if (totalHits > hits.length) {
      loadMoreButton.classList.remove('hidden');
    }
  } catch (error) {
    iziToast.error({ message: 'Failed to fetch images. Try again later.' });
  } finally {
    toggleLoader(false);
  }
}

async function loadMoreImages() {
  page += 1;
  toggleLoader(true);

  try {
    const { hits } = await fetchImages(query, page);

    gallery.insertAdjacentHTML('beforeend', renderGallery(hits));
    refreshLightbox();

    if (gallery.children.length >= totalHits) {
      loadMoreButton.classList.add('hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({ message: 'Failed to load more images.' });
  } finally {
    toggleLoader(false);
    scrollToNextBatch();
  }
}

function toggleLoader(show) {
  loader.classList.toggle('hidden', !show);
}

function initializeLightbox() {
  lightbox = new SimpleLightbox('.gallery a');
}

function refreshLightbox() {
  lightbox.refresh();
}

function scrollToNextBatch() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
