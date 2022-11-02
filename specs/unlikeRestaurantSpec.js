import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Unliking A Restaurant', () => {
  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should display unlike widget when the restaurant have been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this resto"]')).toBeTruthy();
  });

  it('should not display like widget when the restaurant have been liked', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="like this resto"]')).toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    document.querySelector('[aria-label="unlike this resto"]').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error if the unliked restaurant is not on the list', async () => {
    await TestFactories.createLikeButtonPresenterWithResto({ id: 1 });

    await FavoriteRestaurantIdb.deleteRestaurant(1);
    document.querySelector('[aria-label="unlike this resto"]').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
