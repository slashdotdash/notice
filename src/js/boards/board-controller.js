angular.module('app.boards')
  .controller('BoardController', ['BoardService', function(BoardService) {
    this.title = '';
    this.lists = [];

    BoardService.default()
      .then((board) => {
        this.title = board.title;
        this.lists = board.lists;
      });
  }]);