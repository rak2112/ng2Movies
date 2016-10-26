import { Ng2moviesPage } from './app.po';

describe('ng2movies App', function() {
  let page: Ng2moviesPage;

  beforeEach(() => {
    page = new Ng2moviesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
