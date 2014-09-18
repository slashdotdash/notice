angular.module('lodash', [])
  .factory('_', ['$window', function($window) {
    var lodash = $window._.noConflict();

    return lodash;
  }]);