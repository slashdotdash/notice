angular.module('app.boards')
  .controller('BoardController', [function() {
    this.boards = [
      { name: 'To Do', cards: [] },
      { name: 'Doing', cards: [] },
      { name: 'Done', cards: [] },
    ];
  }]);