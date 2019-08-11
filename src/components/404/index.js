import angular from 'angular';
import uirouter from 'angular-ui-router';
import routing from './404.routes';
import NotFoundController from './404.controller';

export default angular.module('app.notFound', [uirouter])
  .config(routing)
  .controller('NotFoundController', NotFoundController)
  .name;