/*-----------------------------------*\
|* UofT Bootcamp 2019 -- Trivia Game *|
\*-----------------------------------*/

$(document).ready(function ($) {

    /// GLOBAL VARIABLES
    //=========================================================================================================

    //1. Declare variables for timer
    var counter;
    var counterInterval;
    var counterRunning = false;

    //2. Declare variables for quiz counter
    var questionCounter = 0;
    var correctAnswerCounter = 0;
    var wrongAnswerCounter = 0;
    var unansweredCounter = 0;

    //3. Declare variables for question tracking
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
            console.log('ERROR: Request Failed');
        });


    /// FUNCTIONS
    //=========================================================================================================

    //1. Hide div on load
    $('#triviaGame, #scores').hide();

    //2. When click btnStartGame
    $(document).on('click', '.btnStartGame', function () {
        $('#triviaGame').show();
        $('#scores').hide();
        $('.instructions').hide();
        $('.btnStartGame').hide();
        displayQuestion();
    });

    //3. Generate questions
    function displayQuestion() {

        //3.1. Call resetCounter function
        resetCounter();

        //3.2. Check to see if game is over if no more questions
        if (questionCounter === questions.length) {
            stopTimer();
            displayScore();
            return;
        }

        //3.3. Setup currentQuestion
        currentQuestion = questions[questionCounter];

        //3.4. Run startTimer function every second if not currently running
        if (!counterRunning) {
            counterInterval = setInterval(startTimer, 1000);
            counterRunning = true;
        }

        //3.5. Run function to display current question
        displayCurrentQuestion(currentQuestion);
    }

    //4. Display current question and answer choices
    function displayCurrentQuestion(question) {
        $('#triviaGame');
        $('#question').text(question.question);
        $('#answers').empty();

        $.each(question.choices, function (index, item) {
            var answerDiv = $('<div class="answer btn btn-answer">').text(item);
            $('#answers').append(answerDiv);
        });
    }

    //5. When answer is clicked
    $(document).on('click', '.answer', function () {
        $(this).addClass('btnActive');
        var guess = $(this).text();
        checkGuess(guess, currentQuestion);
    });

    //6. Checks if guess is correct
    function checkGuess(guess, question) {
        var correctNumber = question.correctAnswer;
        var correct = question.choices[correctNumber];

        //6.1. Shows correctAnswer / wrongAnswer div depending on guess
        if (guess === correct) {
            correctAnswerCounter++;
            $('#correctAnswer').show();
            $('#correctAnswer').text("That's CORRECT!");
        } else {
            wrongAnswerCounter++;
            $('#wrongAnswer').show();
            $('#wrongAnswer').text("That's WRONG! The correct answer is: " + correct);
        }

        nextQuestion();
    }

    //7. Show the next question in questions array
    function nextQuestion() {
        stopTimer();
        questionCounter++;
        setTimeout(displayQuestion, 2000);
    }

    //8. Start timer
    function startTimer() {
        counter--;
        $('#timerInterval').html(counter);

        if (counter === 0) {
            unansweredCounter++;
            $('#unanswered').show().text('Time Up. No Soup For You!');
            nextQuestion();
        }
    }

    //9. Stop timer
    function stopTimer() {
        clearInterval(counterInterval);
        counterRunning = false;
    }

    //10. Reset timer
    function resetCounter() {
        counter = 10;
        $('#correctAnswer, #wrongAnswer, #unanswered').hide();
        $('#timerInterval').html(counter);
    }

    //11. Display score
    function displayScore() {

        $('.triviaLogo').text('Final Score');
        $('#scores').show();
        $('#triviaGame, .instructions').hide();

        $('.wrongAnswer span').text(wrongAnswerCounter);
        $('.correctAnswer span').text(correctAnswerCounter);
        $('.unanswered span').text(unansweredCounter);

        questionCounter = 0;
        correctAnswerCounter = 0;
        wrongAnswerCounter = 0;
        unansweredCounter = 0;

        $('.btnStartGame').text('Play Again').show();
    }

});
