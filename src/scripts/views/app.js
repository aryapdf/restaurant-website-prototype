import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ menu, drawer, content }) {
    this._menu = menu;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      menu: this._menu,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();

    const skipLinkElem = document.querySelector('.skipLink');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#maincontent').focus();
    });
  }
}

export default App;
