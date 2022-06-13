import getCardMarkup from './picture_markup';

const galleryRef = document.querySelector('.gallery');

export function clearGallery() {
  galleryRef.innerHTML = '';
}

export function addPictures(imagesObjArr) {
  galleryRef.insertAdjacentHTML(
    'beforeend',
    imagesObjArr.map(getCardMarkup).join('')
  );
}
