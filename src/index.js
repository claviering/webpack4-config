import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './app.config';
import home from './features/home';

// import routes from './app.routes';
// import pokemons from './pokemons';

angular.module('app', [uirouter, home])
  .config(routing)
