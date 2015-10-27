var tac = (function(){
  return {
    checkDiagonal : function(lett){
      if($('.1').hasClass(lett) && $('.5').hasClass(lett) && $('.9').hasClass(lett)){
        main.endGame(lett);
      } else if ($('.3').hasClass(lett) && $('.5').hasClass(lett) && $('.7').hasClass(lett)){
        main.endGame(lett);
      }
    },
    checkHorizontal : function(lett){
      if($('.1').hasClass(lett) && $('.2').hasClass(lett) && $('.3').hasClass(lett)){
        main.endGame(lett);
      } else if ($('.4').hasClass(lett) && $('.5').hasClass(lett) && $('.6').hasClass(lett)){
        main.endGame(lett);
      } else if ($('.7').hasClass(lett) && $('.8').hasClass(lett) && $('.9').hasClass(lett)){
        main.endGame(lett);
      }
    },
    checkVertical : function(lett){
      if($('.1').hasClass(lett) && $('.4').hasClass(lett) && $('.7').hasClass(lett)){
        main.endGame(lett);
      } else if ($('.2').hasClass(lett) && $('.5').hasClass(lett) && $('.8').hasClass(lett)){
        main.endGame(lett);
      } else if ($('.3').hasClass(lett) && $('.6').hasClass(lett) && $('.9').hasClass(lett)){
        main.endGame(lett);
      }
    },
    checkTie : function(){
        if(main.count > 8){
          $infoBox.text("Tie Game! \n New Game?");
          gameOver = true;
          $begin.show();
        }
    },
    checkGameOver : function(){
      tac.checkTie();
      tac.checkDiagonal('o');
      tac.checkDiagonal('x');
      tac.checkVertical('o');
      tac.checkVertical('x');
      tac.checkHorizontal('o');
      tac.checkHorizontal('x');
    }
  }
})();
