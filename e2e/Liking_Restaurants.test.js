Feature('Liking Restaurants');
Before(({ I }) => {
  I.amOnPage('/#/like');
});

const assert = require('assert');

Scenario('show empty liked movie', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
  // screenShot('empty_liked_restaurant.png');
});

Scenario('like one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');
  I.seeElement('.restaurant__title a');
  I.click(locate('.restaurant__title a').first());
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/like');
  I.seeElement('.restaurant-item');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant__title');
  assert.strictEqual(likedRestaurantTitle, likedRestaurantTitle);
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');
  I.seeElement('.restaurant__title a');
  const titles = [];
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant__title a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    titles.push(await I.grabTextFrom('.restaurant__title'));
    I.amOnPage('/');
  }
  I.amOnPage('/#/like');
  I.seeElement('#query');
  const searchQuery = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(titles.length, searchQuery);
});
