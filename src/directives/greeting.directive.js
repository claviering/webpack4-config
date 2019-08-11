import angular from 'angular';

function greeting() {
  return {
    restrict: 'E',
    scope: {
      name: '='
    },
    template: '<h1>Hello, {{name}}</div>',
    controller: function ($scope) {
      console.log('greeting $scope', $scope);
    }
  }
}

export default angular.module('directives.greeting', [])
  .directive('greeting', greeting)
  .name;