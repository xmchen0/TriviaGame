/* 

UofT Bootcamp 2019 -- Trivia Game 

Pseudocode (initial logic):
- on screen load, hide content and show start button
- set timer countdown, load questions ansd answer choices
- counter starts countdown set at 100 seconds
- if timer is less than or equals zero, stop timer and alert player time's up and reactivate start button
- when time hits zero, displays correct answer and reset the counter back to 100 seconds
- load questions and answer choices upon click event
- if player picks correct answer, increment correctAnswer counter
- if player picks incorrect answer, increment wrongAnswer counter
- if player did not answer any questions, increment unanswered counter
- check answer, append results
- display final scores - correct, incorrect answers and unanswered questions
- reset game

*/

$(document).ready(function ($) {

    /// GLOBAL VARIABLES
    //=========================================================================================================

    //1. Declare variables for timer
    var counter;
    var counterInterval;
    var counterRunning = false;

    //2. Declare variables for quiz counter
    var questionCounter = 0;
    var correctAnswer = 0;
    var wrongAnswer = 0;
    var unanswered = 0;

    //3. Declare variables for question 
    var questions;
    var currentQuestion;


    /// LOAD JSON
    //=========================================================================================================

    //1. Load questions from myjson api
    $.getJSON('https://api.myjson.com/bins/15ht7i') /*---experimenting temporary storage of json file on web---*/
        .done(function (data) {
            questions = data;
        })
        .fail(function () {
            console.log('something went wrong');
        });


    /// FUNCTIONS
    //=========================================================================================================

    //1. Hide div on load
    $('#trivia-game, #scores').hide();

    //2. When you click #btn-start-game
    $(document).on('click', '.btn-start-game', function () {
        $('#start-game').hide();
        $('#trivia-game').show();
        displayQuestion();
    });

    //3. When answer is clicked
    $(document).on('click', '.answer', function () {
        $(this).addClass('btn-active');
        var guess = $(this).text();
        checkGuess(guess, currentQuestion);
    });

    //4. Generates each question
    function displayQuestion() {

        //4.1. Call resetCounter function
        resetCounter();

        //4.2. Check to see if game is over if no more questions
        if (questionCounter === questions.length) {
            stopTimer();
            showScore();
            return;
        }

        //4.3. Setup currentQuestion
        currentQuestion = questions[questionCounter];

        //4.4. Run startTimer function every second if not currently running
        if (!counterRunning) {
            counterInterval = setInterval(startTimer, 1000);
            counterRunning = true;
        }

        //4.5. Run function to display current question
        displayCurrentQuestion(currentQuestion);

    }

    //5. Reset Counter function
    function resetCounter() {
        counter = 10;
        $('#right-answer, #wrong-answer, #time-out').hide();
        $('#timer-interval').html(counter);
    }

    //6. Display current question and answer choices
    function displayCurrentQuestion(question) {
        $('#trivia-game');
        $('#question').text(question.question);
        $('#answers').empty();

        $.each(question.choices, function (index, item) {
            var answerDiv = $('<div class="answer btn btn-answer">').text(item);
            $('#answers').append(answerDiv);
        });

    }

    //7. Starts Timer
    function startTimer() {
        counter--;
        $('#timer-interval').html(counter);

        if (counter === 0) {
            unanswered++;
            $('#time-out').show().text('Time Up. No Soup For You!');
            nextQuestion();
        }
    }

    //8. Stops Timer
    function stopTimer() {
        clearInterval(counterInterval);
        counterRunning = false;
    }

    //9. Checks if guess is correct
    function checkGuess(guess, question) {
        var correctNumber = question.correctAnswer;
        var correct = question.choices[correctNumber];

        //9.1. Shows #right-answer/#wrong-answer div depending on guess
        if (guess === correct) {
            correctAnswer++;
            $('#right-answer').show();
            $('#right-answer').text("That's CORRECT!");
        } else {
            wrongAnswer++;
            $('#wrong-answer').show();
            $('#wrong-answer').text("That's WRONG! The correct answer is: " + correct);
        }

        nextQuestion();

    }

    //10. Show the next question in questions array
    function nextQuestion() {
        stopTimer();
        questionCounter++;
        setTimeout(displayQuestion, 2000);
    }

    //11. Show Score
    function showScore() {

        $('.trivia-logo').text('Final Score');
        $('#start-game, #scores').show();
        $('#trivia-game').hide();

        $('.wrong-answer span').text(wrongAnswer);
        $('.right-answer span').text(correctAnswer);
        $('.time-out span').text(unanswered);

        questionCounter = 0;
        correctAnswer = 0;
        wrongAnswer = 0;
        unanswered = 0;

    }

});