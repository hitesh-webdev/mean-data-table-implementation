import { MeanDataTablePage } from './app.po';

describe('mean-data-table App', () => {
  let page: MeanDataTablePage;

  beforeEach(() => {
    page = new MeanDataTablePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
