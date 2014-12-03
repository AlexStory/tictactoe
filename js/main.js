;var tac = (function(){
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

    function _setVariables(){
      board = myGame.child('board');
      myGame.onDisconnect().remove();
      playerTurn = myGame.child('player');
      _boardChange();
      _playerChange();
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
      playerTurn.set(it);
    })

    function endGame(lett){
      $infoBox.text(lett.toUpperCase() + "\'s Win! \n New Game?");
      gameOver = true;
      var $newGame = $('<button>New Game?</button>');
      $begin.show();
    }

  return {
    checkDiagonal : function(lett){
      if($('.1').hasClass(lett) && $('.5').hasClass(lett) && $('.9').hasClass(lett)){
        endGame(lett);
      } else if ($('.3').hasClass(lett) && $('.5').hasClass(lett) && $('.7').hasClass(lett)){
        endGame(lett);
      }
    },
    checkHorizontal : function(lett){
      if($('.1').hasClass(lett) && $('.2').hasClass(lett) && $('.3').hasClass(lett)){
        endGame(lett);
      } else if ($('.4').hasClass(lett) && $('.5').hasClass(lett) && $('.6').hasClass(lett)){
        endGame(lett);
      } else if ($('.7').hasClass(lett) && $('.8').hasClass(lett) && $('.9').hasClass(lett)){
        endGame(lett);
      }
    },
    checkVertical : function(lett){
      if($('.1').hasClass(lett) && $('.4').hasClass(lett) && $('.7').hasClass(lett)){
        endGame(lett);
      } else if ($('.2').hasClass(lett) && $('.5').hasClass(lett) && $('.8').hasClass(lett)){
        endGame(lett);
      } else if ($('.3').hasClass(lett) && $('.6').hasClass(lett) && $('.9').hasClass(lett)){
        endGame(lett);
      }
    },
    clearBoard : function(){
      myGame.remove()
      $('td').removeClass('x');
      $('td').removeClass('o');
    },
    checkGameOver : function(){
      tac.checkDiagonal('o');
      tac.checkDiagonal('x');
      tac.checkVertical('o');
      tac.checkVertical('x');
      tac.checkHorizontal('o');
      tac.checkHorizontal('x');
    }
  }
})();
