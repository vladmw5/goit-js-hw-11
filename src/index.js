import getImages from './js/fetch_pictures';
import { clearGallery, addPictures } from './js/render_pictures';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import smoothScroll from './js/smooth_scroll';

const HIDDEN_CLASS = 'is-hidden';
let currentPage = null;
let userQuery = null;
let hitsLeft = null;

const formRef = document.querySelector('#search-form');
const loadMoreBtnRef = document.querySelector('.load-more');
const slbInstance = new SimpleLightbox('.gallery a');

formRef.addEventListener('submit', onFormSubmit);
loadMoreBtnRef.addEventListener('click', onLoadMoreBtnClick);

async function onFormSubmit(event) {
  event.preventDefault();

  userQuery = event.target.elements.searchQuery.value;
  if (userQuery === '') {
    return Notify.info('Please, make some query');
  }

  loadMoreBtnRef.classList.add(HIDDEN_CLASS);
  currentPage = 1;

  const {
    data: { hits: imagesObjArr, totalHits },
  } = await getImages(userQuery);
  loadMoreBtnRef.classList.remove(HIDDEN_CLASS);
  if (imagesObjArr.length === 0) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  hitsLeft = totalHits - imagesObjArr.length;
  clearGallery();
  addPictures(imagesObjArr);
  slbInstance.refresh();
  smoothScroll();
}

async function onLoadMoreBtnClick() {
  if (hitsLeft <= 0) {
    loadMoreBtnRef.classList.add(HIDDEN_CLASS);
    return Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }

  const {
    data: { hits: imagesObjArr, totalHits },
  } = await getImages(userQuery, ++currentPage);

  hitsLeft -= imagesObjArr.length;
  addPictures(imagesObjArr);
  slbInstance.refresh();
  smoothScroll();
}
