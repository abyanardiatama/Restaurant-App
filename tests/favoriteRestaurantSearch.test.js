import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-view';

describe('Searching restaurants', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    // eslint-disable-next-line new-cap
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = {
      getAllRestaurants: jest.fn(),
      searchRestaurants: jest.fn(),
    };
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('restaurant a');
      expect(presenter.latestQuery)
        .toEqual('restaurant a');
    });

    it('should ask the model to search for liked restaurants', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('restaurant a');
      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('restaurant a');
    });

    // it('should show the found restaurants', () => {
    //   presenter._showFoundRestaurants([{ id: 1 }]);
    //   const foundRestaurant = document.querySelectorAll('.restaurant');
    //   expect(foundRestaurant.length).toEqual(1);

    //   presenter._showFoundRestaurants([
    //     {
    //       id: 1,
    //       title: 'Satu',
    //     },
    //     {
    //       id: 2,
    //       title: 'Dua',
    //     },
    //   ]);
    //   expect(document.querySelectorAll('.restaurant').length).toEqual(2);
    // });

    // it('should show the title of the found restaurants', () => {
    //   presenter._showFoundRestaurants([
    //     {
    //       id: 1,
    //       title: 'Satu',
    //     },
    //     {
    //       id: 2,
    //       title: 'Dua',
    //     },
    //   ]);
    //   expect(document.querySelectorAll('.restaurant__title').item(0).textContent).toEqual('Satu');
    //   expect(document.querySelectorAll('.restaurant__title').item(1).textContent).toEqual('Dua');
    // });

    // it('should show - for found restaurant without title', () => {
    //   presenter._showFoundRestaurants([{ id: 1 }]);
    //   expect(document.querySelectorAll('.restaurant__title').item(0).textContent).toEqual('-');
    // });

    it('should show the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant').length).toEqual(3);
        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 1, title: 'restaurant abc' },
            { id: 2, title: 'ada juga restaurant abcde' },
            { id: 3, title: 'ini juga boleh restaurant a' },
          ];
        }
        return [];
      });
      searchRestaurants('restaurant a');
    });

    it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        const restaurantTitles = document.querySelectorAll('.restaurant__title');
        expect(restaurantTitles.item(0).textContent).toEqual('restaurant abc');
        expect(restaurantTitles.item(1).textContent).toEqual('ada juga restaurant abcde');
        expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh restaurant a');
        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 1, title: 'restaurant abc' },
            { id: 2, title: 'ada juga restaurant abcde' },
            { id: 3, title: 'ini juga boleh restaurant a' },
          ];
        }
        return [];
      });
      searchRestaurants('restaurant a');
    });

    it('should show - when the restaurant returned does not contain a title', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        const restaurantTitles = document.querySelectorAll('.restaurant__title');
        expect(restaurantTitles.item(0).textContent).toEqual('-');
        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [{ id: 444 }];
        }
        return [];
      });
      searchRestaurants('restaurant a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);
      searchRestaurants('    ');
      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('restaurant a');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant').length).toEqual(0);
        done();
      });

      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);
      searchRestaurants('restaurant a');
    });
  });
});
