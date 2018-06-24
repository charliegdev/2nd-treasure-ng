describe('BookStoreController', () => {
  console.log(0);
  beforeEach(angular.mock.module('BookStore'));
  console.log(1);

  let $controller, $rootScope;

  beforeEach(inject((_$controller_, _$rootScope_) => {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  it('returns true just for setting up config.', () => {
    const $scope = $rootScope.$new();
    const controller = $controller('BookStoreController', { $scope });
    expect(controller.testFunc(2)).toBe(4);
  });
});