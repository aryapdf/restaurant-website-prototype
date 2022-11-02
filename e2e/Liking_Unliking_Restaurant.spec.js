/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */

Feature('Liking Movies');

const assert = require('assert');

Before(({ I }) => {
  I.amOnPage('/#/like');
});

Scenario('showing empty liked movies', ({ I }) => {
  I.seeElement('#query');
  I.see('Restaurant is not available.', '.restaurant-item_not_found');
});

Scenario('liking restaurants', async ({ I }) => {
  I.see('Restaurant is not available.', '.restaurant-item_not_found');

  I.amOnPage('/');

  I.seeElement('.restaurant_title a');

  const titles = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant_title a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    titles.push(await I.grabTextFrom('.restaurant_title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/like');
});

Scenario('unliking restaurants', async ({ I }) => {
  I.see('Restaurant is not available.', '.restaurant-item_not_found');

  I.amOnPage('/');

  I.seeElement('.restaurant_title a');

  const titles = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant_title a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');

    titles.push(await I.grabTextFrom('.restaurant_title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/like');

  I.seeElement('.restaurant_title a');

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant_title a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');

    titles.push(await I.grabTextFrom('.restaurant_title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/like');
});

Scenario('search for liked restaurants', async ({ I }) => {
  I.see('Restaurant is not available.', '.restaurant-item_not_found');

  I.amOnPage('/');

  I.seeElement('.restaurant_title a');

  const titles = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant_title a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    titles.push(await I.grabTextFrom('.restaurant_title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/like');
  I.seeElement('#query');

  const searchQuery = titles[1].substring(1, 3);
  const matchingMovies = titles.filter((title) => title.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedMovies = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(matchingMovies.length, visibleLikedMovies);

  matchingMovies.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.restaurant_title').at(index + 1));
    assert.strictEqual(title, visibleTitle);
  });
});

Scenario('press the subscribe button', ({ I }) => {
  I.amOnPage('/');

  I.seeElement('#subscribePushNotification');

  I.click('#subscribePushNotification');
});
