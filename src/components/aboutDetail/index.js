import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './aboutDetail.routes';
import AboutDetailController from './aboutDetail.controller';

export default angular.module('app.aboutDetail.routes', [uirouter])
  .config(routing)
  .controller('AboutDetailController', AboutDetailController)
  .name;