import DicodingRestaurantSource from '../../data/dicoding-restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
        <!-- Jumbotron -->
        <div class="wrapper-jumbotron">
            <div class="box1">
                <picture>
                  <source media="(max-width: 600px)" srcset="../images/herosHasil/hero-image_2large.jpg" style="height: 500px">
                  <img loading="lazy" src="./images/herosHasil/hero-image_2xtralarge.jpg" style="height: 400px" alt="food" class="img-fluid lazyload">
                </picture>
            </div>
        </div>
        <!-- End of Jumbotron -->
        <div tabindex="0" id="content" class="content">
            <h2>Home Page</h2>
            <p>Restaurant List</p>
            <div id="restaurants" class="restaurants"></div>
        </div>
      `;
  },

  async afterRender() {
    const restaurants = await DicodingRestaurantSource.home();
    const restaurantsContainer = document.querySelector('#restaurants');

    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
