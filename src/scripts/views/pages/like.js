import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';
import FavoriteRestaurantView from './liked-restaurants/favorite-restaurant-view';
import favoriteRestaurantShowPresenter from './liked-restaurants/favorite-restraurant-show-presenter';
import FavoriteRestaurantSearchPresenter from './liked-restaurants/favorite-restaurant-search-presenter';

const view = new FavoriteRestaurantView();

const Like = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurants');
    const searchElement = document.querySelector('#query');

    // Clear the container before rendering
    restaurantsContainer.innerHTML = '';

    if (restaurants.length > 0) {
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } else {
      // Display "Tidak ada restaurant untuk ditampilkan" message
      restaurantsContainer.innerHTML = '<div class="restaurant-item__not__found">Tidak ada restaurant untuk ditampilkan</div>';
    }

    // Add event listener to the search element
    searchElement.addEventListener('input', (event) => {
      const query = event.target.value;
      const filteredRestaurants = restaurants.filter((restaurant) => restaurant.name
        .toLowerCase().includes(query.toLowerCase()));

      // Clear the container before rendering the filtered results
      restaurantsContainer.innerHTML = '';

      // Render the filtered results
      if (filteredRestaurants.length > 0) {
        // Render the filtered results
        filteredRestaurants.forEach((restaurant) => {
          restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        });
      } else {
        // Display "Restaurant tidak ditemukan" message when no restaurants are found
        restaurantsContainer.innerHTML = '<div class="restaurant-item__not__found">Tidak ada restaurant untuk ditampilkan</div>';
      }
    });
  },
};

export default Like;
