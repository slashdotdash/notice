angular.module('app.boards')
  .controller('BoardController', [function() {
    this.title = 'Example Board';
    this.lists = [
      { 
        id: 1,
        title: 'To Do',
        cards: [
          { id: 1, title: 'Add card', description: '' },
          { id: 2, title: 'Drag & drop card', description: '' },
          { id: 3, title: 'Create list', description: '' }
        ]
      },
      { id: 2, title: 'Doing', cards: [] },
      { id: 3, title: 'Done', cards: [] }
    ];
  }]);