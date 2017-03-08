import { browser, element, by } from 'protractor';

export class Estagio4meWebclientPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
