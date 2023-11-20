import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
    <div class="restaurant__poster">
        <img class="restaurant__poster__image lazyload" src="${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId}" alt="${restaurant.name}" />
    </div>
    <div tabindex="0" id="restaurant__info" class="restaurant__info">
        <div class="restaurant__info__details">
            <h2 class="restaurant__title">${restaurant.name}</h2>
            <p><strong>City:</strong> ${restaurant.city}</p>
            <p><strong>Address:</strong> ${restaurant.address}</p>
            <p><strong>Rating:</strong> ${restaurant.rating}</p>
            <p><strong>Categories:</strong> ${restaurant.categories.map((category) => category.name).join(', ')}</p>
            <p>${restaurant.description}</p>
        </div>
        <div class="restaurant__info__menus">
            <h4>Menus</h4>
            <div class="restaurant__info__menu">
                <p><strong>Foods:</strong></p>
                <ul>
                    ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
                </ul>
            </div>
            <div class="restaurant__info__menu">
                <p><strong>Drinks:</strong></p>
                <ul>
                    ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
                </ul>
            </div>
        </div>
    </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
    <div class="restaurant-item">
    <div class="restaurant-item__header">
      <img class="restaurant-item__header__poster" alt="${restaurant.name}"
           src="${CONFIG.BASE_IMAGE_URL}/${restaurant.pictureId}">
      <div class="restaurant-item__header__rating">
        <p>⭐️<span class="restaurant-item__header__rating__score">${restaurant.rating}</span></p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h3>
      <p>${restaurant.description}</p>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this movie" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this movie" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
