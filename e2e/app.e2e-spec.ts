import { DailyJokesPage } from './app.po';

describe('daily-jokes App', function() {
  let page: DailyJokesPage;

  beforeEach(() => {
    page = new DailyJokesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
