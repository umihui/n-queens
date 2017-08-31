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



window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});
  for (var row = 0; row < n; row ++) {
    for (var col = 0; col < n; col++) {
      solution.togglePiece(row, col);
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(row, col);
      } 
    }
  }
    
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
  
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) {    
    solution = new Board({n: 0});
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    //console.log(solution);
    return solution.rows();
  }
  if (n === 1) {
    //debugger;
    solution = new Board({n: 1});
    solution.togglePiece(0, 0);
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution.rows();
  }
  var solution;
  var helper = function (colIndex) {
    if (colIndex === n + 2) {
      //debugger;
      solution = undefined;
      return;
    }
    solution = new Board({n: n});
    solution.togglePiece(0, colIndex);
    var count = 1;
    for (var row = 1; row < n; row++) {
      for (var col = 0; col < n; col++) {
        solution.togglePiece(row, col);
        count++;
        if (solution.hasAnyQueensConflicts()) {
          solution.togglePiece(row, col);
          count--;
        }
      }
    }
    if (count === n ) {
      return;
    } 

    helper(colIndex + 1);
  };
  
  helper(0);
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
  
  
  
  // if (n === 2 || n === 3) {
  //   console.log('this is 2 3');
  //   return [];
  // }
  // //check number of queen
  // //var a starting point
  // //base case have found a solution includes n of queen 
  // //base case row === n stop recursion
  // //recursion on different starting points
  // var solution;
  // var helper = function (colIndex) {
  //   var solutionBoard = new Board({n: n});
  //   if (colIndex === n) {
  //     return;
  //   }
  //   solutionBoard.togglePiece(0, colIndex);
  //   var count = 1;
  //   for (var row = 1; row < n; row ++) {
  //     for (var col = 0; col < n; col++) {
  //       solutionBoard.togglePiece(row, col);
  //       count++;
  //       if (solutionBoard.hasAnyQueensConflicts()) {
  //         solutionBoard.togglePiece(row, col);
  //         count--;
  //       } 
  //     }
  //   }
  //   if (count !== n) {
  //     helper(colIndex + 1);
  //   } else {
  //     solution = solutionBoard;
  //     return;
  //   }

  // }; 
  // helper(0);
  

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other

window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
