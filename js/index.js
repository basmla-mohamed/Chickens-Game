//select elements
let eggs = $("#chickensContainer .egg"),
  brokenEggs = $("#brokenEggs .brokenEgg"),
  lives = 5,
  basket = $("#basket"),
  score = 0,
  tryAgainButton = $("button#restartBtn"),
  gameRunning = false,
  pauseBtn = $("button#pauseBtn"),
  popupOfStop = $("#continuePlaying"),
  resumeBtn = $("#resumeGame"),
  bestScore = Number(localStorage.getItem("best")) || 0,
  recordShown = false,
  bgMusic = new Audio("./sounds/bg_sound.mp3"),
  soundBtn = $("#soundBtn");

//best score alert
$("#heighstScore").text(bestScore);

//sound of game
bgMusic.loop = true; //when the sound finish repeat it
bgMusic.volume = 1;

//loading page
$(window).on("load", function () {
  $("#loadingPage").addClass("loaded");
});

//move basket (mouse + touch in responsive)
function moveBasket(x) {
  let halfOfBasket = basket.outerWidth(true) / 2;

  if (x >= halfOfBasket && x <= $(window).outerWidth(true) - halfOfBasket) {
    basket.offset({ left: x - halfOfBasket });
  }
}

$(window).on("mousemove", function (e) {
  moveBasket(e.pageX);
});

$(window).on("touchstart touchmove", function (e) {
  moveBasket(e.originalEvent.touches[0].pageX);
});

//start game
$("#startGame").click(function (e) {
  bgMusic.play();
  $("#startGame").slideUp(1000);

  $("#game").removeClass("pre-game"); //preGame (hide chickens and basket and put before on game)
  $("#chickensContainer, #basket").addClass("intro"); //animation of chickens and basket and hide [before]

  setTimeout(counter, 1000);
});

//try again in popupLose and in navbar button
$("#tryAgain, #restartBtn,#restartGame").click(function () {
  gameRunning = false;
  lives = 5;
  $("#lives .life").fadeIn();
  recordShown = false;
  eggs.offset({ top: 150 });
  $("#lostGame").removeClass("show");
  $("#game").addClass("pre-game");
  $("#chickensContainer, #basket").removeClass("intro");
  $("#continuePlaying").removeClass("show");
  $("#startGame").slideDown(500);
  score = 0;
  $(".score").text(0);
  //stop the move of basket??
  // $("#basket").offset({
  //   left: 0,
  // });
});

//pause btn
pauseBtn.click(function () {
  bgMusic.pause();
  gameRunning = false;
  $("#continuePlaying").addClass("show");
});

//resume playing
resumeBtn.click(function () {
  bgMusic.play();
  gameRunning = true;
  $("#continuePlaying").removeClass("show");
  startGame();
});
//sound btn
$("#soundBtn").click(function () {
  bgMusic.muted = !bgMusic.muted;

  $(this).toggleClass("muted", bgMusic.muted);
  $(this).find("i").toggleClass("fa-volume-high", !bgMusic.muted).toggleClass("fa-volume-xmark", bgMusic.muted);
});
