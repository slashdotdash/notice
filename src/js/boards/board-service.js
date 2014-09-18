angular.module('app.boards')
  .factory('BoardService', ['$q', '_', function($q, _) {
    var boards = [
      {
        id: 1,
        default: true,
        title: 'Example Board',
        lists: [
          { 
            id: 1,
            title: 'To Do',
            cards: [
              { id: 2, title: 'Drag & drop card', description: '' },
              { id: 3, title: 'Create list', description: '' }
            ]
          },
          { 
            id: 2,
            title: 'Doing',
            cards: [
              { id: 1, title: 'Add card', description: '' }
            ]
          },
          { id: 3, title: 'Done', cards: [] }
        ]
      }
    ];    
    
    return {
      // get the default board
      default: () => {
        var deferred = $q.defer();

        deferred.resolve(_.find(boards, board => !!board.default) || _.first(boards));

        return deferred.promise;
      }
    };
  }]);
