routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('aboutDetail', {
      url: '/about/aboutDetail',
      template: require('./aboutDetail.html'),
      controller: 'AboutDetailController',
      controllerAs: 'aboutDetail'
    });
}