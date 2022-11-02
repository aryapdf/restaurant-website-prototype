import 'regenerator-runtime';
import '../styles/style.scss';
import '../styles/responsive.scss';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import App from './views/app';
import swRegister from './utils/sw-register';
import WebSocketInitiator from './utils/websocket-initiator';
import FooterToolsInitiator from './utils/footer-tools-initiator';
import CONFIG from './global/config';

/* eslint-disable no-unused-vars */
const START = 10;
const NUMBER_OF_IMAGES = 100;

const app = new App({
  menu: document.querySelector('#menu'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('main'),
});

const loader = document.querySelector('#preloader');
const fail = document.querySelector('#fail');

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', async () => {
  loader.style.display = 'none';
  app.renderPage();
  await swRegister();
  WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);

  FooterToolsInitiator.init({
    subscribeButton: document.querySelector('#subscribePushNotification'),
    unsubscribeButton: document.querySelector('#unsubscribePushNotification'),
  });
});

window.addEventListener('error', () => {
  fail.style.display = 'block';
  console.log = 'Error has appeared, plesae check your connection.';
});
