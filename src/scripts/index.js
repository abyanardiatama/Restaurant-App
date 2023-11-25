import 'regenerator-runtime';
import '../styles/style.css';
import '../styles/responsive.css';
import filter from 'lodash.filter';
import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
  // filter();
  // generateImage();
});
const START = 1;
const NUMBER_OF_IMAGES = 21;

// const generateImage = () => {
//   const images = document.querySelectorAll('img');
//   console.log(images); // Check if images are selected

//   for (let i = START; i < NUMBER_OF_IMAGES && i < images.length; i++) {
//     const img = images[i];
//     img.classList.add('lazyload');
//     console.log('Lazyload applied to image:', img);
//   }
// };
// const generateImage = (index) => {
//   for (let i = START; i <= 21; i++) {
//     // get all img elements
//     const img = document.querySelectorAll('img')[i];
//     // add lazyload class
//     img.classList.add('lazyload');
//   }
// };
