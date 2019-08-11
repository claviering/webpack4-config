routing.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

export default function routing($stateProvider, $locationProvider, $urlRouterProvider) {

  let homeState = {
    name: 'homePage',
    url: '/',
  }

  let notFoundState = {
    name: 'notFoundPage',
    url: '/404',
  }

  $stateProvider.state(homeState)
  $stateProvider.state(notFoundState)
  $stateProvider
    .state('aboutPage', {
      name: 'aboutPage',
      url: '/about',
    })
    .state('about.aboutDetail', {
      name: 'aboutDetailPage',
      url: '/aboutDetail',
  })

  $urlRouterProvider.otherwise('/');
}