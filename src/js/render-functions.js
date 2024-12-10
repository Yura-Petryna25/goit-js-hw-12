export function renderGallery(images) {
  return images
    .map(
      ({ webformatURL, largeImageURL, tags }) => `
    <li>
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
    </li>`
    )
    .join('');
}
