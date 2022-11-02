import CONFIG from '../../global/config';

const createRestaurantDetailTemplate = (restaurant) => `
    <div class="introTitle">
        <h2 class="cardTitle restaurant_title" tabindex="0">${restaurant.name}</h2>
        <p >${restaurant.description}<p>
        <img class="restaurantImageDetail" src="${CONFIG.BASE_IMAGE_URL_LARGE + restaurant.pictureId}" alt="${restaurant.name}">
        <h5 class="detailDesc">${restaurant.address}, ${restaurant.city}</h5>
        <h5 class="detailDesc">Category</h5>
        <div class="detailContainer">
            ${restaurant.categories.reduce((show, value) => show.concat(`<p>&#x2022 ${value.name}</p>`), '')}
        </div>
        <h5 class="detailDesc">Foods</h5>
        <div class="detailContainer">
            ${restaurant.menus.foods.reduce((show, value) => show.concat(`<p>&#x2022 ${value.name}</p>`), '')}
        </div>
        <h5 class="detailDesc">Drinks</h5>
        <div class="detailContainer">
            ${restaurant.menus.drinks.reduce((show, value) => show.concat(`<p>&#x2022 ${value.name}</p>`), '')}
        </div>
        <h5 class="detailDesc">Rating : ${restaurant.rating}</h5>
        <h5 class="detailDesc">Reviews</h5>
        <div class="reviewList">
            ${restaurant.customerReviews.reduce((show, value) => show.concat(`<div class="review">
            <p><strong>${value.name}</strong></p>
            <p>${value.review}</p>
            <p>${value.date}</p>
            </div>
            `), '')}
        </div>
    </div>

`;

const createRestaurantItemTemplate = (restaurant) => `
    <div class="card restaurant-item" tabindex="0">
        <img class="restaurantImage lazyload" width="100%" height="350px"  alt="${restaurant.name || '-'}" data-src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL_SMALL + restaurant.pictureId : 'https://restaurant-api.dicoding.dev/images/small/01'}">
        <div class="restaurantInfo">
            <h5 class="restaurant_title"><a href="#/detail/${restaurant.id}">${restaurant.name || '-'}</a></h5>
            <p>Lokasi : ${restaurant.city || '-'}</p>
            <p>Rating : ${restaurant.rating || '-'}</p>
        </div>
    <div>
`;

const createLikeRestoButtonTemplate = () => `
  <button aria-label="like this resto" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestoButtonTemplate = () => `
  <button aria-label="unlike this resto" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeRestoButtonTemplate,
  createUnlikeRestoButtonTemplate,
};
