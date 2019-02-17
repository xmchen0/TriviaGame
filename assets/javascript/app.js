/* UofT Bootcamp 2019 - Trivia Game */

/// ********** GLOBAL VARIABLE **********

//1. timer - total 60 seconds before timesout
var timeRemaining = 60; 

//2. questions and answers index
//2.1 questions string
//2.2 answer array
var indexQandA = 0;
var gameQA = [{
        question: "1. What Manhattan neighbourhood did Jerry reside in?"
        answer: ["a. Lower East Side", "b. Upper East Side", "c. Upper West Side", "d. Soho"]
        correctA: "2"
        video:
        }, 

    {
        question: "2. What is the name of the coffee shop the gang hangs out in?"
        answer: ["a. Katz Deli", "b. Charlie's", "c. Monk's", "d. Starbucks"]
        correctA: "2"
        video:
        },

    {
        question: "3. What phrase does Lloyd Braun tell George caused his breakdown?"
        answer: ["a. Yada Yada Yada", "b. Serenity Now!", "c. Grow up!", "d. Hoochie Mama"]
        correctA: "3"
        video:
        },

    {
        question: "4. What movie was Jerry caught making out in??"
        answer: ["a. Rochelle, Rochelle", "b. Sack Lunch", "c. Schlinder's List", "d. Chunnel"]
        correctA: "2"
        video:
        },

    {
        question: "5. What is Kramer's first name?"
        answer: ["a. Cosmo", "b. Charlie", "c. Casper", "d. Costcos"]
        correctA: "0"
        video:
        },

    {
        question: "6. Who is Jerry's nemisis in his building?"
        answer: ["a. Kramer", "b. Manny", "c. Newman", "d. Building manager"]
        correctA: "2"
        video:
        },

    {
        question: "7. What does Kramer do for a living?"
        answer: ["a. Mailman", "b. Banker", "c. TV Host", "d. No one really knows"]
        correctA: "3"
        video:
        },

    {
        question: "8. When George and Jerry write a pilot for NBC, what is it about?"
        answer: ["a. Living in New York City", "b. Dating", "c. Nothing", "d. College"]
        correctA: "2"
        video:
        },

    {
        question: "9. What is Elaine's surname?"
        answer: ["a. Benes", "b. Bernstein", "c. Smith", "d. Perez"]
        correctA: "0"
        video:
        },

    {
        question: "10. If someone upsets the 'Soup Nazi', what does he yell?"
        answer: ["a. Get out!", "b. No soup for you! NEXT!", "c. You go home!", "d. Goodbye!"]
        correctA: "1"
        video:
        },

}];


//2.3 correct answer
var correctAnswer = 0;

//2.4 incorrect answer 
var incorrectAnswer = 0;

//2.5 unanswered questions
var unansweredQ = 0;

/// ********** FUNCTIONS **********

//1. start game screen, remove start button, set timer, load questions ansd answer choices
function startGame() {
    $("#start-button").attr("disabled", true);
    correctAnswer = 0;
    incorrectAnswer = 0;
    unansweredQ= 0;
    timeRemaining = 60;
    countDown = setInterval(timer, 1000);
    gameQA;
}

//2. counter starts countdown set at 60 seconds,
//2.1 if timer is less than or equals zero, stop timer and alert player time's up
//2.2 reactivate start button
function timer() {
    timeRemaining--;
    $("#timeRemaining").text(timeRemaining);
    if (timeRemaining <= 0) {
        stopTimer();
        window.alert("Sorry, time's up!");
        $("#start-button").attr("disabled", false);
    }
}

//3. when time remaining hits zero, reset the counter back to 60 seconds
function stopTimer() {
    clearInterval(countDown);
    $('#questions').text("Correct answer: " + gameQA[indexQandA].answer[correctA]);
    unansweredQ();
    timeRemaining = 60;
}

//4. if player picks correct answer, increment correctAnswer counter
function correctAnswer() {
    correctAnswers++;
    $('#timeRemaining').text("That's CORRECT!")
    resetGame();
}

//5. if player picks incorrect answer, increment incorrectAnswer counter
function incorrectAnswer() {
    incorrectAnswers++;
    $('#timeRemaining').text("That's incorrect. Try Again.")
    resetGame();
}

//4.1 a separate screen will show all done 
//4.2 display scoreboard - correct, incorrect answers and unanswered questions

//5. alternatively user can press submit if they finish early



$('.startButton').click, function () {
    $('.startButton');
    startGame();
}

