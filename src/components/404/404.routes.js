routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('notFound', {
      url: '/404',
      template: require('./404.html'),
      controller: 'NotFoundController',
      controllerAs: 'notFound'
    });
}