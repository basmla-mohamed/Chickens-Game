//counter function
function counter() {
  $("#counter").html("<span>3</span>");
  setTimeout(() => $("#counter").html("<span>2</span>"), 1000); //we change html content not add to it (from span3 to span2)
  setTimeout(() => $("#counter").html("<span>1</span>"), 2000);
  setTimeout(() => $("#counter").html('<span class="go">GO!</span>'), 3000);

  setTimeout(() => {
    $("#counter").empty();
    gameRunning = true;
    startGame(); //call of it while the counter end
  }, 3500); //empty counter
}

//start game
function startGame() {
  moveEggs(eggs[0], Math.random() * 12);
  moveEggs(eggs[1], Math.random() * 12);
  moveEggs(eggs[2], Math.random() * 12);

  if (gameRunning) {
    requestAnimationFrame(startGame);
  }

  isEggHunted(eggs[0]);
  isEggHunted(eggs[1]);
  isEggHunted(eggs[2]);
}

//the top of the egg when it starts falling (center of its chicken)
function eggStartTop(egg) {
  let chicken = $(egg).closest(".chicken");
  return chicken.offset().top + chicken.outerHeight() / 2 - $(egg).outerHeight() / 2;
}

//move egg
function moveEggs(egg, speed) {
  let topOfEgg = $(egg).offset().top,
    distance = Math.random() * speed + 1,
    bottomOfBasket = $("#basket").offset().top + $("#basket").outerHeight(true), //we have offset top and left only
    indexOfEgg = eggs.index(egg); //.index not [] because we select it jQuery

  //when the egg be under the basket
  if (topOfEgg <= bottomOfBasket) {
    $(egg).offset({
      top: topOfEgg + distance,
    });
  } else {
    //move egg to chicken
    $(egg).offset({
      top: eggStartTop(egg),
    });

    //show broken egg
    brokenEggs.eq(indexOfEgg).fadeIn(500).delay(500).fadeOut(500);

    //lives
    if (lives > 0) {
      lives--;
      $("#lives .life").eq(lives).fadeOut(1000);

      if (lives === 0) {
        bgMusic.pause();
        gameRunning = false;
        $("#lostGame").addClass("show");
      }
    }
  }
}

//collision
function collision(item1, item2) {
  //item1 = egg
  let t1 = $(item1).offset().top;
  let l1 = $(item1).offset().left;
  let b1 = $(item1).offset().top + $(item1).outerHeight();
  let r1 = $(item1).offset().left + $(item1).outerWidth();

  //item2 = basket
  let t2 = $(item2).offset().top;
  let l2 = $(item2).offset().left;
  let b2 = $(item2).offset().top + $(item2).outerHeight();
  let r2 = $(item2).offset().left + $(item2).outerWidth();

  //when the egg be into the basket
  if (b1 < t2 || l1 > r2 || t1 > b2 || l2 > r1) {
    return false;
  } else {
    return true;
  }
}

//is Egg Hunted
function isEggHunted(egg) {
  if (collision(egg, basket)) {
    $(".score").text(++score);
    //best score
    if (score > bestScore) {
      if (bestScore > 0 && !recordShown) {
        recordShown = true;
        $("#newRecord").addClass("show");
        setTimeout(() => $("#newRecord").removeClass("show"), 3000);
      }
      bestScore = score;
      localStorage.setItem("best", bestScore);
    }
    $("#heighstScore").text(bestScore);

    $(egg).offset({
      top: eggStartTop(egg),
    });
  }
}
