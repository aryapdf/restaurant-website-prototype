import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantSearchView {
  getTemplate() {
    return `
            <div class="introTitle content">
                <h2 class="cardTitle" tabindex="0"> FAVORITE </h2>
                <p class="cardDesc">Your favorite restaurant can be found, here!</p>
                <input id="query" type"text">
                  <div id="restaurants" class="container restaurants">
                  </div>
            </div>
      `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurants(restaurants) {
    this.showFavoriteRestaurants(restaurants);
  }

  showFavoriteRestaurants(restaurants = []) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('restaurants').innerHTML = html;

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return '<div class="restaurant-item_not_found restaurant_not_found"><h5>Restaurant is not available.</h5></div>';
  }
}

export default FavoriteRestaurantSearchView;
