export function markupGallery(arr) {
    return arr.map(
      ({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
      <div class="gallery">
      <a  href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" width="220" height="100" />  
      </a>
      </div>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          ${likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${downloads}
        </p>
        </div>
    </div>`}).join('');
  }