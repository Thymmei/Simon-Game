/*
started state --> dettect keypresses --> started --> runs functions and logic if true --> false --> reset back --> started state (cycle)
*/

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var gameStarted = false;


$(document).keypress(function() {
 if (!gameStarted) {
  $("#level-title").text("Level " + level);
  nextSequence();
  gameStarted = true;
 }
});

$(".btn").on("click", function() {
 var userChosenColour = this.id;
 userClickedPattern.push(userChosenColour);
 playSound(userChosenColour);
 animatePress(userChosenColour);
 checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
 if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  if (userClickedPattern.length === gamePattern.length) {
   setTimeout(function() {
    nextSequence();
   }, 1000);
  }
 } else {
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  setTimeout(function() {
   $("body").removeClass("game-over");
  }, 200);

  startOver();
 }
}


function nextSequence() {
 userClickedPattern = []; //reset
 level++;
 $("#level-title").text("Level " + level);
 var randomNumber = Math.floor(Math.random() * 4);
 var randomChosenColour = buttonColours[randomNumber];
 gamePattern.push(randomChosenColour);
 $("#" + randomChosenColour).fadeOut(150).fadeIn(150);
 playSound(randomChosenColour);
}

function playSound(randomColour) {
 var sound = new Audio("./sounds/" + randomColour + ".mp3");
 sound.play();
}

function animatePress(currentColour) {
 $("#" + currentColour).addClass("pressed");
 setTimeout(function() {
  $("#" + currentColour).removeClass("pressed");
 }, 100)
}

function startOver() {
 level = 0;
 gamePattern = [];
 gameStarted = false;
}