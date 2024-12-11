// export function renderGallery(images) {
//   return images
//     .map(
//       ({ webformatURL, largeImageURL, tags }) => `
//     <li>
//       <a href="${largeImageURL}">
//         <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//       </a>
//     </li>`
//     )
//     .join('');
// }
export function renderGallery(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li>
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="gallery-item-info">
            <span>Likes: ${likes}</span>
            <span>Views: ${views}</span>
            <span>Comments: ${comments}</span>
            <span>Downloads: ${downloads}</span>
          </div>
        </li>`
    )
    .join('');
}
