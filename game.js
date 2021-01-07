const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let level = 0;

function newSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomColor = buttonColours[randomNumber];
  gamePattern.push(randomColor);
  fadeInAndOut(randomColor);
  $('h1').text('Level ' + level++);
}

$(document).keypress(newSequence);

function fadeInAndOut(randomColor) {
  playSound(randomColor);
  $('#' + randomColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  $(document).off('keypress');
}

function playSound(color) {
  var audio = new Audio('./sounds/' + color + '.mp3');
  audio.play();
}

let userClickedPattern = [];

$('.btn').click(function (e) {
  const userClickedOn = e.target.id;
  userClickedPattern.push(userClickedOn);
  playSound(userClickedOn);
  animatePress(userClickedOn);
  checkAnswer();
});

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');
  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}

function checkAnswer() {
  if (
    gamePattern[userClickedPattern.length - 1] ===
    userClickedPattern[userClickedPattern.length - 1]
  ) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(newSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    startOver();
    playSound('wrong');
    $('body').addClass('game-over');
    $('h1').text('Game Over, Press Any Key to Restart');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 500);
    $(document).keypress(newSequence);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
