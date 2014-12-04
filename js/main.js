;var main = (function(){
  'use strict';
  var ref = new Firebase("https://tictactoe-alex.firebaseio.com");
  var playerTurn;
  var who;
  var board;
  var game = ref.child('game');
  var myGame;
  var myPlayer;
  var gameOver;
  var $begin = $('.begin');
  var $infoBox = $('.info_box p');
  var _turn;
  var _count;
    function _boardChange(){
      board.on('child_added', function(childSnapshot, prevChildName) {
        var td = '.' + childSnapshot.key();
        $(td).addClass(childSnapshot.val());
      })
    };

    function _playerChange(){
      playerTurn.on("value", function(snapshot) {
         who = snapshot.val();
         if(myPlayer === who){
           $infoBox.text('It is your turn!');
         } else {
           $infoBox.text('Waiting for opponent...')
         }
         tac.checkGameOver();
      });
    };

    function _setCount(){
      _turn.on('value', function(data){
        _count = data.val();
      })
    };

    function _setVariables(){
      board = myGame.child('board');
      myGame.onDisconnect().remove();
      playerTurn = myGame.child('player');
      _boardChange();
      _playerChange();
      _turn = myGame.child('turn');
      _setCount();
    };

    $begin.click(function(){
      if(board){
        tac.clearBoard();
        gameOver = false;
      }
      game.once('value', function(dataSnapshot){
        var found = false
        dataSnapshot.forEach(function(childSnapshot){
          if(childSnapshot.val() === false){
            myGame = childSnapshot.ref();
            myGame.set(true);
            found = true;
            myPlayer = 'x';
            myGame.child('player').set('o');
            _setVariables();
            _turn.set(0);
          }
        })
        if(!found){
          myGame = game.push();
          myGame.set(false);
          myPlayer = 'o';
          $infoBox.text('waiting for another player');
          _setVariables();
        }
      })
      $(this).hide();
    })

    $('td').click(function(){
      if(who != myPlayer || !who || $(this).hasClass('x') || $(this).hasClass('o') || gameOver){
        return
      }
      var spot = $(this).data('cell')
      board.child(spot).set(who);
      var it = who === 'x' ? 'o' : 'x' ;
      _count ++;
      _turn.set(_count);
      playerTurn.set(it);
    })

    function _endGame(lett){
      $infoBox.text(lett.toUpperCase() + "\'s Win! \n New Game?");
      gameOver = true;
      $begin.show();
    }
    return{
      count: _count,
      endGame: _endGame
    }
})();
