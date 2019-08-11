import angular from 'angular';

let template = `
<div>
  tree view
</div>
`

function treeView() {
  return {
    restrict: 'E',
    scope: {
      treeData: '='
    },
    template: template,
    controller: function($scope) {
    }
  }
}

export default angular.module('directives.treeView', [])
  .directive('treeView', treeView)
  .name;