// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    // quilty's note: conflicts are defined on Boardspec.js as positions where
    // pieces can attack each other
    // also checked for uses of this test in current file
    hasRowConflictAt: function(rowIndex) {
      var pieces = 0;
      // is method of Board, which will be the context and a board is
      // will we need to traverse over the board?  I should probably check specrunner or the board
      // to see what its properties are: just checked and it appears as if I can do a lookup of the rows
      var targetRow = this.rows()[rowIndex];
      // check to see if there are more than one 1 in array as the 1 indicates presence of rook/queen
      // this is wrong.  we need more than 1 1, not simply the presence of 1

      // redo:
      // iterate over row
      //  if current element is 1, add one to pieces
      //  if pieces is greater than 1, return true
      // return false
      for (var i = 0; i < targetRow.length; i++) {
        if (targetRow[i] === 1) {
          pieces++;
        }
        if (pieces > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //iterate over rows
      //  if hasRowConflictAt on current row returns true return true
      //return false
      for (var i = 0; i < this.rows().length; i++) {
        if (this.hasRowConflictAt(i) === true) {
          return true;
        }
      }
      return false; 
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // does not have a col() method, so will use rows(), which returns an array of rows
      // columns will be the number of elements within those rows
      // which is defined by finding more than one 1
      // build a temporary column per column test.
      // so...


      // [0 0] [0 0]
      // make col array for column <===actually no need for this when we have a counter that tracks
      // create counter for pieces
      // iterate over rows
      //  for each row, push contents of the element at colIndex of current row to col array
      // iterate over column
      //  if element is one, then increment counter
      //  if pieces is greater than one return true
      // return false
      var pieces = 0;
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        if (rows[i][colIndex] === 1) {
          pieces++;
        }
        if (pieces > 1) {
          return true;
        }
      }
      return false; 
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // get rows
      // iterate over rows <=== no need since hasColConflictAt takes care of this for us
      //   iterate over the length of just one of the rows
      //     if hasColConflictAt for current col returns true return true
      // return false
      if (this.rows()) {
        for (var i = 0; i < this.rows()[0].length; i++) {
          if (this.hasColConflictAt(i) === true) {
            return true;
          }
        }
      }
      return false; 
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      /*
        000 000 000 | 0,0  1,1 2,2 3,3 <=== these are coords to compare for pieces for corner diag left to right <==== major

        (row, column) 0,2 1,1 2,1 <== coords for right-top to left-bottom  <=== 

        0,1 1,2 <== left to right  i,j (i+1, j+1 <=== check for existence of j+1 at i+1) <=== major (b/c it's left to right

        0,1 1,0 <== right to left i,j i+1, j-1 <=== check for existence of j-1 at i+1 <=== minor
      */
      var pieces = 0;
      // create pieces counter
      // if board has no rows return false
      // look for piece at first row at passed idx (if true, increment pieces counter)
      // if pieces counter > 1 return true
      // if diagonal travel (left-top to bottom-right) is not possible
      //   return false
      // (else)
      // run hasMajorDiagonalConflictAtOn the next diagonal coord on context of array copy with first row missing 
      // if return value is a number,
      //  increment pieces counter by number
      //  if pieces > 1 return true
      debugger;
      var rows = this.rows(); // 10 
      if (rows.length === 0) {
        return false;
      }
      if (rows[majorDiagonalColumnIndexAtFirstRow] === 1) {
        pieces++;
        if (pieces > 1) {
          return true;
        }
      }
      if (rows[1][majorDiagonalColumnIndexAtFirstRow + 1] === undefined) {
        return false;
      }
      var copyFromNextRowOn = this.slice();
      copyFromNextRowOn.shift();
      var result = copyFromNextRowOn.hasMajorDiagonalConflictAt(majorDiagonalColumnIndexAtFirstRow + 1);
      if (typeof result === 'number') {
        pieces += result;
        if (pieces > 1) {
          return true;
        }
      }
      return pieces;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // traverse over entire board, which means:
      // iterate over rows
      //   iterate over columns
      //     if hasMajorDiagConflict at current idx is true return true
      // return false
      var rows = this.rows();
      var noOfCols = this.rows()[0].length;
      while (rows.length > 0) {
        for (var j = 0; j < noOfCols; j++) {
          if (rows.hasMajorDiagonalConflictAt(j) === true) {
            return true;
          }
        }
        rows.shift();
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
