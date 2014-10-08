angular.module('app.boards')
  .controller('BoardController', ['BoardService', function(BoardService) {
    this.board = null;
    this.addItemToList = null;

    this.addCard = () => {
      BoardService.addCardToList(this.addItemToList, this.card.title)
        .then(() => {
          this.card = null;
        });      
    };

    BoardService.default()
      .then(board => {
        this.board = board;
      });
  }]);