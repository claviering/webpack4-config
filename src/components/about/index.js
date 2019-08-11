import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './about.routes';
import AboutController from './about.controller';
import aboutDetail from '../aboutDetail';


export default angular.module('app.about', [uirouter, aboutDetail])
  .config(routing)
  .controller('AboutController', AboutController)
  .name;