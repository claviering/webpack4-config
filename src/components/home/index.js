import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './home.routes';
import HomeController from './home.controller';
import randomNames from '@/services/randomNames.service';
import greeting from '@/directives/greeting.directive';
import treeView from '@/directives/treeView.directive';

import './home.less';

export default angular.module('app.home', [uirouter, randomNames, greeting, treeView])
  .config(routing)
  .controller('HomeController', HomeController)
  .name;