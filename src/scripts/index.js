import 'regenerator-runtime'; /* for async await transpile */

import '../styles/main.css';
//import bootstrap icons
import 'bootstrap-icons/font/bootstrap-icons.css';

import "@fontsource/montserrat";

// import data.json
import restaurants from '../public/data/DATA.json';

// display restaurants in DOM
const restaurantsContainer = document.querySelector('#restaurant');
const restaurantsList = restaurants.restaurants;
restaurantsList.forEach((restaurant) => {
  restaurantsContainer.innerHTML += `
    <div class="restaurant-item">
      <div class="card">
        <img src="${restaurant.pictureId}" class="restaurant-img" alt="${restaurant.name}">
        <div class="card-body">
          <h5 class="name">${restaurant.name}</h5>
          <p class="city"><i class="bi bi-map-fill"></i> ${restaurant.city}</p>
          <p class="rating"><i class="bi bi-star-fill"></i> ${restaurant.rating}</p>
          <a href="#" class="detail">Detail</a>
        </div>
      </div>
    </div>
  `;
});