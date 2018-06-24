describe('BookStoreController', () => {
  console.log(0);
  beforeEach(angular.mock.module('BookStore'));
  console.log(1);

  let $controller, $rootScope, $scope, controller;


  beforeEach(inject((_$controller_, _$rootScope_) => {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  beforeEach(() => {
    $scope = $rootScope.$new();
    controller = $controller('BookStoreController', { $scope });
  });

  it('returns true just for setting up config.', () => {
    expect(true).toBe(true);
  });

  it('rejects incomplete book submission', () => {
    const incompleteBook = undefined;
    expect(controller.isIncompleteBook(incompleteBook)).toBe(true);
  });

  it('rejects incomplete book submission, part 2', () => {
    const incompleteBook = { isbn: '1234567890123', title: 'Test Title' };
    expect(controller.isIncompleteBook(incompleteBook)).toBe(true);
  });

  it('accepts complete book submission', () => {
    const incompleteBook = { 
      isbn: '1234567890123', 
      title: 'Test Title',
      author: 'Test author',
      genre: 'Science fiction',
      price: 123
    };
    expect(controller.isIncompleteBook(incompleteBook)).toBe(false);
  });
});