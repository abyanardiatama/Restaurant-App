import FavoriteRestaurantView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-view';
import favoriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restraurant-show-presenter';

describe('Showing all favorite restaurants', () => {
  let view;

  const renderTemplate = () => {
    // eslint-disable-next-line new-cap
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When there is no favorite restaurant', () => {
    it('should render the information that there is no restaurant have been liked', () => {
      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };
      // eslint-disable-next-line new-cap
      const presenter = new favoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });

      const restaurants = [];
      presenter._displayRestaurants(restaurants);
      expect(document.querySelectorAll('.restaurant-item__not__found').length)
        .toEqual(1);
    });

    it('should ask for the favorite restaurants', () => {
      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };
      // eslint-disable-next-line new-cap
      new favoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });

    it('should show the information that the restaurant have been liked', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
        done();
      });

      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      new favoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });

  describe('When favorite restaurants exist', () => {
    it('should render the restaurants', () => {
      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };
      const presenter = new favoriteRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });

      presenter._displayRestaurants([
        {
          id: 1,
          title: 'Satu',
          vote_average: 3,
          overview: 'Sebuah restaurant',
        },
        {
          id: 2,
          title: 'Dua',
          vote_average: 4,
          overview: 'Sebuah restaurant lagi',
        },
      ]);
      expect(document.querySelectorAll('.restaurant-item').length).toEqual(2);
    });
  });
});
