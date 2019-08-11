export default class HomeController {
  constructor(randomNames) {
    this.random = randomNames;
    this.name = 'World';
    this.treeData = {
      name: 'menu',
      children: [{
        name: 'A',
        children: [{
          name: 'A.1',
          children: [{
            name: 'A.1.1',
            children: []
          }]
        }, {
          name: 'A.2',
          children: [{
            name: 'A.2.1',
            children: [{
              name: 'A.2.1.1',
              children: []
            }]
          }, {
            name: 'A.2.2',
            children: []
          }]
        }]
      }, {
        name: 'B',
        children: [{
          name: 'B.1',
          children: []
        }, {
          name: 'B.2',
          children: []
        }]
      }, {
        name: 'C',
        children: []
      }]
    }
  }

  changeName() {
    this.name = 'angular-tips';
  }
  randomName() {
    this.name = this.random.getName();
  }
}