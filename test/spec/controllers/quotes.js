'use strict';

describe('Controller: QuotesCtrl', function () {

  // load the controller's module
  beforeEach(module('portfolioApp'));

  var QuotesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuotesCtrl = $controller('QuotesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(QuotesCtrl.awesomeThings.length).toBe(3);
  });
});
