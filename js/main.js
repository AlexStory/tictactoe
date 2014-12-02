;var tac = (function(){
  'use strict';

  var ref = new Firebase("https://tictactoe-alex.firebaseio.com");
  var playerTurn;
  var who;
  var board;
  var game = ref.child('game');
  var $begin = $('.begin');
  var $infoBox = $('.info_box');
  var myGame;
  var myPlayer;

  $begin.click(function(){
    game.once('value', function(dataSnapshot){
      var found = false
      dataSnapshot.forEach(function(childSnapshot){
        if(childSnapshot.val() === false){
          myGame = childSnapshot.ref();
          myGame.set(true);
          board = myGame.child('board');
          playerTurn = myGame.child('player');
          found = true;
          myPlayer = 'x';
          myGame.child('player').set('o');

          board.on('child_added', function(childSnapshot, prevChildName) {
            var td = '.' + childSnapshot.key();
            $(td).addClass(childSnapshot.val());
          })

          playerTurn.on("value", function(snapshot) {
             who = snapshot.val();
             if(myPlayer === who){
               $infoBox.text('It is your turn!');
             } else {
               $infoBox.text('Waiting for opponent...')
             }
             tac.checkDiagonal();
             tac.checkHorizontal();
             tac.checkVertical();
          });
        }
      })
      if(!found){
        myGame = game.push();
        myGame.set(false);
        board = myGame.child('board');
        playerTurn = myGame.child('player');
        myPlayer = 'o';
        $infoBox.text('waiting for another player');

        board.on('child_added', function(childSnapshot, prevChildName){
          var td = '.' + childSnapshot.key();
          $(td).addClass(childSnapshot.val());
        })

        playerTurn.on("value", function(snapshot) {
           who = snapshot.val();
           if(myPlayer === who){
             $infoBox.text('It is your turn!');
           } else {
             $infoBox.text('Waiting for opponent...')
           }
           tac.checkDiagonal();
           tac.checkHorizontal();
           tac.checkVertical();
        });
      }
    })

    $(this).hide();
  })

  $('td').click(function(){
    console.log(who + ' ' + myPlayer)
    if(who != myPlayer || !who){
      return
    }
    if($(this).hasClass('x') || $(this).hasClass('o')){
      return;
    }
    var spot = $(this).data('cell')
    board.child(spot).set(who);

    if(who === 'x'){
      playerTurn.set('o');
    } else {
      playerTurn.set('x');
    }
  })

  return {
    checkDiagonal : function(){
      if($('.1').hasClass('o') && $('.5').hasClass('o') && $('.9').hasClass('o')){
        $infoBox.text("Os win! ")
        $infoBox.append('<button>New Game?</button>');
          $('button').addClass('newGame');
      } else if ($('.3').hasClass('o') && $('.5').hasClass('o') && $('.7').hasClass('o')){
        $infoBox.text("Os win! ")
        $infoBox.append('<button>New Game?</button>');
          $('button').addClass('newGame');
      } else if ($('.3').hasClass('x') && $('.5').hasClass('x') && $('.7').hasClass('x')){
        $infoBox.text("Xs win! ")
        $infoBox.append('<button>New Game?</button>');
          $('button').addClass('newGame');
      } else if ($('.1').hasClass('x') && $('.5').hasClass('x') && $('.9').hasClass('x')){
        $infoBox.text("Xs win! ")
        $infoBox.append('<button>New Game?</button>');
          $('button').addClass('newGame');
      }
    },

    checkHorizontal : function(){
      if($('.1').hasClass('o') && $('.2').hasClass('o') && $('.3').hasClass('o')){
        $infoBox.text("Os win! ")
        $infoBox.append('<button>New Game?</button>');
          $('button').addClass('newGame');
      } else if ($('.4').hasClass('o') && $('.5').hasClass('o') && $('.6').hasClass('o')){
        $infoBox.text("Os win! ")
        $infoBox.append('<button>New Game?</button>');
          $('button').addClass('newGame');
      } else if ($('.7').hasClass('o') && $('.8').hasClass('o') && $('.9').hasClass('o')){
        $infoBox.text("Os win! ")
        $infoBox.append('<button>New Game?</button>');
          $('button').addClass('newGame');
      } else if ($('.1').hasClass('x') && $('.2').hasClass('x') && $('.3').hasClass('x')){
        $infoBox.text("Xs win! ")
        $infoBox.append('<button>New Game?</button>');
          $('button').addClass('newGame');
      } else if ($('.4').hasClass('x') && $('.5').hasClass('x') && $('.6').hasClass('x')){
        $infoBox.text("Xs win! ")
        $infoBox.append('<button>New Game?</button>');
          $('button').addClass('newGame');
      } else if ($('.7').hasClass('x') && $('.8').hasClass('x') && $('.9').hasClass('x')){
        $infoBox.text("Xs win! ")
        $infoBox.append('<button>New Game?</button>');
          $('button').addClass('newGame');
      }
    },

    checkVertical : function(){
      if($('.1').hasClass('o') && $('.4').hasClass('o') && $('.7').hasClass('o')){
        $infoBox.text("Os win! ")
        $infoBox.append('<button>New Game?</button>');
          $('button').addClass('newGame');
      } else if ($('.2').hasClass('o') && $('.5').hasClass('o') && $('.8').hasClass('o')){
        $infoBox.text("Os win! ")
        $infoBox.append('<button>New Game?</button>');
          $('button').addClass('newGame');
      } else if ($('.3').hasClass('o') && $('.6').hasClass('o') && $('.9').hasClass('o')){
        $infoBox.text("Os win! ")
        $infoBox.append('<button>New Game?</button>');
          $('button').addClass('newGame');
      } else if ($('.1').hasClass('x') && $('.4').hasClass('x') && $('.7').hasClass('x')){
        $infoBox.text("Xs win! ")
        $infoBox.append('<button>New Game?</button>');
          $('button').addClass('newGame');
      } else if ($('.2').hasClass('x') && $('.5').hasClass('x') && $('.8').hasClass('x')){
        $infoBox.text("Xs win! ");
        $infoBox.append('<button>New Game?</button>');
          $('button').addClass('newGame');
      } else if ($('.3').hasClass('x') && $('.6').hasClass('x') && $('.9').hasClass('x')){
        $infoBox.text("Xs win! ");
        $infoBox.append('<button>New Game?</button>');
          $('button').addClass('newGame');
      }
    },

    clearBoard : function(){
      if(board){
        board.remove();
      }
      $('td').removeClass('x');
      $('td').removeClass('o');
    }
  }
})();
