routing.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

export default function routing($stateProvider, $locationProvider, $urlRouterProvider) {
  console.log('$stateProvider', $stateProvider);
  console.log('$locationProvider', $locationProvider);
  console.log('$urlRouterProvider', $urlRouterProvider);
  let homeState = {
    name: 'homePage',
    url: '/',
  }

  // let aboutState = {
  //   name: 'aboutPage',
  //   url: '/about',
  // }

  let notFoundState = {
    name: 'notFoundPage',
    url: '/404',
  }

  let aboutDetailState = {
    name: 'aboutDetailPage',
    url: '/about/aboutDetail',
  }
  
  // $stateProvider.state('homePage', {
  //   url: '/',
  //   templateUrl: './home.html'
  // })
  $stateProvider.state(homeState)
  // $stateProvider.state(aboutState)
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