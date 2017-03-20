import { RelevoPage } from './app.po';

describe('relevo App', () => {
  let page: RelevoPage;

  beforeEach(() => {
    page = new RelevoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
