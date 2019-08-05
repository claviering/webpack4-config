export default (app) => {
  app.directive("child", () => ({
    restrict: "E",
    template: `
      <button ng-click="rootF()">ROOT @ child</button>
    `
  }));
}