import UrlParser from '../../routes/url-parser';
import DicodingRestaurantSource from '../../data/dicoding-restaurant-source';
import { createRestaurantDetailTemplate, createLikeButtonTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
        <div id="restaurant" class="restaurant"></div>
        <div id="customerReviews" class="customerReviews">
            <h3 class="customerReviews-item__title" style="margin-left: 32px; font-size: 24px;">Customer Review</h3>
        </div>
        <div id="likeButtonContainer"></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await DicodingRestaurantSource.detail(url.id);
    const restaurantContainer = document.querySelector('#restaurant');
    const customerReviewsContainer = document.querySelector('#customerReviews');

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
        city: restaurant.city,
      },
    });
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
    restaurant.customerReviews.forEach((review) => {
      customerReviewsContainer.innerHTML += `
            <div class="customerReviews-item">
                <div class="customerReviews-item__header">
                    <p class="customerReviews-item__name">${review.name}</p>
                    <p class="customerReviews-item__date">${review.date}</p>
                </div>
                <p class="customerReviews-item__review">${review.review}</p>
            </div>
        `;
    });
  },
};

export default Detail;
