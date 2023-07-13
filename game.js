const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let sounds = {
    blue : new Audio('./sounds/blue.mp3'),
    green : new Audio('./sounds/green.mp3'),
    yellow : new Audio('./sounds/yellow.mp3'),
    red : new Audio('./sounds/red.mp3'),
    wrong : new Audio('./sounds/wrong.mp3')
};

let level = 0;
startOver();

function startOver(){
    $(document).one("keydown", nextSequence);
}

function rightReset() {
    setTimeout(() => {
        userClickedPattern = [];
        nextSequence();
    }, 1000);
}

function wrongReset() {
    sounds['wrong'].play();

    $('#level-title').html(
    `<h5>Your Score is ${level-1}</h5> 
    <h6>Game Over, Press Any Key to Restart</h6>`);

    $('body').addClass('game-over');
    
    setTimeout(() => {
        $('body').removeClass('game-over');
    }, 200);

    userClickedPattern = [];
    gamePattern = [];
    level = 0;

    startOver();
}

function checkAnswer(currentLevel){
    if(userClickedPattern.length<gamePattern.length){
        // check if the last move made by the user is the same as the gamepattern requires him to make
        if(userClickedPattern[currentLevel] !== gamePattern[currentLevel]){
            wrongReset();
        } 
    }
    else if(userClickedPattern.length === gamePattern.length){
        if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
        {
            rightReset();      
        }
        else{
            wrongReset();
        }
    }
    
}

const animatePress = (currentColour) => {
    let currButton = $('.btn#' + currentColour);
    currButton.addClass('pressed');
    setTimeout(function(){
        currButton.removeClass('pressed');
    }, 100);
}

const playSound = (name) => {
    sounds[name].play();
}

const handler = (e) => {
    let userChosenColour =  ($(e.target).attr("id"));
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
}

function nextSequence() {
    $('#level-title').text("level "+level);
    let randomNumber =  Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
}

// call click handler on the press of a button
$('.btn').on("click", handler);
