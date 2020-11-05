//Array with the possible colours
var buttonColours = ["red", "blue", "green", "yellow"];

//Empty array to store colours generated
var gamePattern = [];

//Empty array with user choices
var userClickedPattern = [];

var started = false;
var level = 0;

//Press a key to start

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//Checks user input vs random generated array

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("correct");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

//Resets vars
function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}

//Plays pattern after each level

function playPattern() {
    var i = 0;
    const intervalId = setInterval(function () {
        $("#" + gamePattern[i])
            .fadeOut(100)
            .fadeIn(100);
        playSound(gamePattern[i]);
        i ++;
        if (i === gamePattern.length) {
            clearInterval(intervalId);
        }
    }, 1000);
}
//Save which button was clicked

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

//Play sound refactored
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Add pressed animation when user clicks
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//Random number generator to pick from buttonColours array.
function nextSequence() {
    level++;

    userClickedPattern = [];

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    //Choosing random color
    var randomChosenColour = buttonColours[randomNumber];

    //Pushing the chosen color to empty array
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    playPattern();
}

/////////////////////////GAME FUNCTIONALITY/////////////////////////
