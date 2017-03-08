import { Estagio4meWebclientPage } from './app.po';

describe('estagio4me-webclient App', () => {
  let page: Estagio4meWebclientPage;

  beforeEach(() => {
    page = new Estagio4meWebclientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
