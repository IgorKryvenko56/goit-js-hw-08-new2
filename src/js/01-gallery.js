 // Add imports above this line
 import SimpleLightbox from "simplelightbox";
 import "simplelightbox/dist/simple-lightbox.min.css"; // Import the CSS file
 import { galleryItems } from './gallery-items';

 // Change code below this line
 const gallery = document.querySelector('.gallery');
 const imgs = galleryItems.map(item => `
   <li class='gallery__item'>
     <a class='gallery__link' href='${item.original}'>
      <img class='gallery__image' src='${item.preview}'
 data-source='${item.original}' alt='${item.description}' />
     </a>
   </li>
`).join('');
 gallery.insertAdjacentHTML('beforeend', imgs);

 gallery.addEventListener('click', (evt) => {
  evt.preventDefault();
  if (evt.target.classList.contains('gallery__image')) {
     const imgSrc = evt.target.dataset.source;
    console.log(imgSrc);
   }
 });

 const galleryS = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
 });

 console.log(galleryItems);







