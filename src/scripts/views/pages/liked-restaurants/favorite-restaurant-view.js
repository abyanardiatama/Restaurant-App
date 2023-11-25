import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantView {
  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    return `
        <div tabindex="0" class="content">
          <input id="query" type="text">
          <h2 class="content__heading" style="font-weight: bold; margin-top: 32px;">Favorite Restaurant</h2>
          <div tabindex="0" id="restaurants" class="restaurants">
          </div>
        </div>
    
        <div class="restaurant-result-container">
          <ul class="restaurants">
          </ul>
        </div>
      `;
  }

  // eslint-disable-next-line class-methods-use-this
  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  showRestaurants(restaurants) {
    let html;
    if (restaurants.length > 0) {
      html = restaurants.reduce(
        (carry, restaurant) => carry.concat(`
          <li class="restaurant">
            <span class="restaurant__title">${restaurant.title || '-'}</span>
          </li>
          `),
        '',
      );
    } else {
      // html = '<div class="restaurant-item__not__found restaurant__not__found">Restaurant tidak ditemukan</div>';
      html = this._getEmptyRestaurantTemplate();
    }
    document.querySelector('.restaurants').innerHTML = html;

    // document
    //   .getElementById('restaurant-search-container')
    //   .dispatchEvent(new Event('restaurants:searched:updated'));

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  // eslint-disable-next-line class-methods-use-this
  // getFavoriteRestaurantTemplate() {
  //   return `
  //       <div tabindex="0" class="content">
  //         <h2 class="content__heading" style="font-weight: bold; margin-top: 32px;">Favorite Restaurant</h2>
  //         <div tabindex="0" id="restaurants" class="restaurants">
  //         </div>
  //       </div>
  //     `;
  // }

  // eslint-disable-next-line class-methods-use-this
  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length > 0) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }
    document.getElementById('restaurants').innerHTML = html;

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return '<div class="restaurant-item__not__found">Restaurant tidak ditemukan</div>';
  }
}

export default FavoriteRestaurantView;
