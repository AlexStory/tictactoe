;var tac = (function(){
  'use strict';

  var ref = new Firebase("https://tictactoe-alex.firebaseio.com");
  var playerTurn = ref.child('player');
  var who;
  var board = ref.child('board');
  var member = ref.child('member');
  var $begin = $('.begin');
  var $infoBox = $('.info_box');

  board.on('child_changed', function(childSnapshot, prevChildName) {
    var td = '.' + childSnapshot.key();
    $(td).addClass(childSnapshot.val());

    tac.checkDiagonal();
    tac.checkHorizontal();
    tac.checkVertical();
  })

  playerTurn.on("value", function(snapshot) {
     who = snapshot.val();
  });

  $begin.click(function(){
    tac.clearBoard();
    $(this).hide();
    member.push(true);
    member.on('value' , function(snapshot){
      var people = snapshot.numChildren();
      if(people === 2){
        alert('begin game!')
      }
    });
  })

  $('td').click(function(){
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

    tac.checkDiagonal();
    tac.checkHorizontal();
    tac.checkVertical();
  })

  return {
    checkDiagonal : function(){
      if($('.1').hasClass('o') && $('.5').hasClass('o') && $('.9').hasClass('o')){
        $infoBox.text("Os win!")
      } else if ($('.3').hasClass('o') && $('.5').hasClass('o') && $('.7').hasClass('o')){
        $infoBox.text("Os win!")
      } else if ($('.3').hasClass('x') && $('.5').hasClass('x') && $('.7').hasClass('x')){
        $infoBox.text("Xs win!")
      } else if ($('.1').hasClass('x') && $('.5').hasClass('x') && $('.9').hasClass('x')){
        $infoBox.text("Xs win!")
      }
    },

    checkHorizontal : function(){
      if($('.1').hasClass('o') && $('.2').hasClass('o') && $('.3').hasClass('o')){
        $infoBox.text("Os win!")
      } else if ($('.4').hasClass('o') && $('.5').hasClass('o') && $('.6').hasClass('o')){
        $infoBox.text("Os win!")
      } else if ($('.7').hasClass('o') && $('.8').hasClass('o') && $('.9').hasClass('o')){
        $infoBox.text("Os win!")
      } else if ($('.1').hasClass('x') && $('.2').hasClass('x') && $('.3').hasClass('x')){
        $infoBox.text("Xs win!")
      } else if ($('.4').hasClass('x') && $('.5').hasClass('x') && $('.6').hasClass('x')){
        $infoBox.text("Xs win!")
      } else if ($('.7').hasClass('x') && $('.8').hasClass('x') && $('.9').hasClass('x')){
        $infoBox.text("Xs win!")
      }
    },

    checkVertical : function(){
      if($('.1').hasClass('o') && $('.4').hasClass('o') && $('.7').hasClass('o')){
        console.log('hi')
        $infoBox.text("Os win!")
      } else if ($('.2').hasClass('o') && $('.5').hasClass('o') && $('.8').hasClass('o')){
        $infoBox.text("Os win!")
      } else if ($('.3').hasClass('o') && $('.6').hasClass('o') && $('.9').hasClass('o')){
        $infoBox.text("Os win!")
      } else if ($('.1').hasClass('x') && $('.4').hasClass('x') && $('.7').hasClass('x')){
        $infoBox.text("Xs win!")
      } else if ($('.2').hasClass('x') && $('.5').hasClass('x') && $('.8').hasClass('x')){
        $infoBox.text("Xs win!")
      } else if ($('.3').hasClass('x') && $('.6').hasClass('x') && $('.9').hasClass('x')){
        $infoBox.text("Xs win!")
      }
    },

    clearBoard : function(){
      for ( var i = 0 ; i < 10 ; i++ ){
        board.child(i).set('0');
      }
    }
  }
})();
