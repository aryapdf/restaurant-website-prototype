import NotificationHelper from './notification-helper';
import CONFIG from '../global/config';

const WebSocketInitiator = {
  init(url) {
    const webSocket = new WebSocket(url);
    webSocket.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    const restaurant = JSON.parse(message.data);
    NotificationHelper.sendNotification({
      title: `${restaurant.name} is Available!`,
      options: {
        body: restaurant.city,
        image: `${CONFIG.BASE_IMAGE_URL_SMALL + restaurant.pictureId}`,
      },
    });
  },
};

export default WebSocketInitiator;
