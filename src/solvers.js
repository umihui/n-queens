/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findSolution = function(row, n, board, validator, callback) {
  // if all rows exhausted, this is a valid solution.
  if (row === n) {
    return callback();
  }

  // iterate over possible decisions
  for (var i = 0; i < n; i++) {
    // place a piece
    board.togglePiece(row, i);
    // recurse into remaining problem
    if (!board[validator]()) {
      var result = findSolution(row + 1, n, board, validator, callback);
      if (result) {
        return result; // EJECT
      }
    }
    // unplace a piece
    board.togglePiece(row, i);
  }
};

window.findNRooksSolution = function(n) {

  var board = new Board({n: n});

  var solution = findSolution(0, n, board, 'hasAnyRooksConflicts', function() {
    return board.rows();
  });
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// window.findNRooksSolution = function(n) {
//   var solution = new Board({n: n});
//   for (var row = 0; row < n; row ++) {
//     for (var col = 0; col < n; col++) {
//       solution.togglePiece(row, col);
//       if (solution.hasAnyRooksConflicts()) {
//         solution.togglePiece(row, col);
//       } 
//     }
//   }
    
//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   return solution.rows();
  
// };

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = new Board({n: n});
  var solutionCount = 0; 
  var helper = function (rowIndex) {
    if (rowIndex === n) {
      solutionCount++;
      return;
    }
    for (var column = 0; column < n; column++) {
      solution.togglePiece(rowIndex, column);
      if (!solution.hasAnyRooksConflicts()) {
        helper(rowIndex + 1);
      }
      solution.togglePiece(rowIndex, column);
    }
  };
  helper(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n: n});
  var test = true;
  var helper = function (rowIndex) {
    if (rowIndex === n) {
      test = false;
      return;
    }
    for (var column = 0; column < n; column++) {
      if (test) {
        solution.togglePiece(rowIndex, column);
        if (!solution.hasAnyQueensConflicts()) {
          helper(rowIndex + 1);
        }
      }
      if (test) {
        solution.togglePiece(rowIndex, column);
      }
    }
  };

  
  helper(0);
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();

  

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other

window.countNQueensSolutions = function(n) {
  var solution = new Board({n: n});
  var solutionCount = 0; 
  var helper = function (rowIndex) {
    if (rowIndex === n) {
      solutionCount++;
      return;
    }
    for (var column = 0; column < n; column++) {
      solution.togglePiece(rowIndex, column);
      if (!solution.hasAnyQueensConflicts()) {
        helper(rowIndex + 1);
      }
      solution.togglePiece(rowIndex, column);
    }
  };

  
  helper(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
