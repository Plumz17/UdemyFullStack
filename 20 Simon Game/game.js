var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

function playSound(name) {
    var myAudio = new Audio("sounds/" + name +".mp3");
    myAudio.play();
}

function animatePress(currentColor) {
    var currentButton = $("." + currentColor);
    currentButton.fadeOut(100).fadeIn(100);
    currentButton.addClass("pressed");
    setTimeout(function() {
        currentButton.removeClass("pressed")
    }, 100);
}

// Called when going to the next level
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
}

// Should be called once per click
function checkAnswer(currentIndex) {
    if(userClickedPattern[currentIndex] != gamePattern[currentIndex]) {
        gameOver();
        return;
    }
    if (userClickedPattern.length === gamePattern.length) {
        console.log("Go to next level");
        userClickedPattern = []
        setTimeout(function() {nextSequence()}, 1000);
        return;
    }
}

function gameOver() {
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over")
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
        $("body").removeClass("game-over")
    }, 200);
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
    level = 0;
}

// User Click
$(".btn").on("click", function() {
    console.log("Game Started: " + gameStarted);
    if (gameStarted === false) {
        return;
    }
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    playSound(userChosenColour);
    animatePress(userChosenColour);
})

//First Key Press to start game
$(document).on("keydown", function() {
    if (gameStarted === false) {
        nextSequence();
        gameStarted = true;
        console.log("Game Start!");
        $("h1").text("Level " + level);
    }
})