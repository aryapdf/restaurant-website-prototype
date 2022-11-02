import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
        <div class="hero">
            <div class="heroInner">
                <h1 class="heroTitle">R Y A</h1>
                <img src="" alt="">
                <p class="heroTagline">Meet and Eat.</p>
            </div>
        </div>

        <section id="introduction">
            <div class="introInner">
                <div class="introTitle">
                    <h2 class="cardTitle" tabindex="0">INTRODUCTION</h2>
                    <h3 class="cardSubtitle">Our Goals</h3>
                    <p class="cardDesc">We are offering our special service for our beloved costumer. We will try our best to find the perfect restaurant that suits you well.</p>
                </div>
                <div class="introImages">
                    <picture>
                    <source class="introImage" media="(max-width: 600px)" srcset="./images/resto1-small.jpg">
                    <img class="introImage" src='./images/resto1-large.jpg' 
                        alt="">
                    </picture>
                    <picture>
                    <source class="introImage" media="(max-width: 600px)" srcset="./images/resto2-small.jpg">
                    <img class="introImage" src='./images/resto2-large.jpg' 
                        alt="">
                    </picture>
                    <picture>
                    <source class="introImage" media="(max-width: 600px)" srcset="./images/resto 3-small.jpg">
                    <img class="introImage"src='./images/resto 3-large.jpg' 
                        alt="">
                    </picture>                
                </div>
            </div>
        </section>
        <section>
            <h2 class="cardTitle" tabindex="0">LIST OF RESTAURANTS</h2>
            <div class="container restaurants" id="restaurants"></div>
        </section>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.listRestaurants();
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
