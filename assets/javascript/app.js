/* 

UofT Bootcamp 2019 -- Trivia Game 

Spoiler Alert: The following code contains answers to questions in the game

Image Credits: TwentyTwoWords, https://twentytwowords.com/40-of-the-best-seinfeld-quotes-fans-still-use-today/

*/


/// GLOBAL VARIABLE
//==========================================================================================================================

//1. declare variable for timer - total 120 seconds (2 minutes)
var timer;
var timeRemaining = 120; 

//2. declare variable for array storing questions, possible answers arrays, correct answer index, and images
var correct = false;
var questions = [
    {
        question: "1. Well the jerk store called, they're running out of you!",
        answers: ["Jerry Seinfeld", "Elaine Benes", "George Constanza", "Cosmo Kramer"],
        correctAnswer: 2, // George Constanza
        image: ("assets/images/Best-Seinfeld-Quotes1.jpg")
    },
    {
        question: "2. Looking at cleavage is like looking at the sun. You don't stare at it. It's too risky. Ta get a sense of it and then you look away.",
        answers: ["Jerry Seinfeld", "Elaine Benes", "George Constanza", "Cosmo Kramer"],
        correctAnswer: 0, // Jerry Seinfeld
        image: ("assets/images/Best-Seinfeld-Quotes2.jpg")
    }, 
    {
        question: "3. When you look annoyed all the time, people think that you're busy.",
        answers: ["Jerry Seinfeld", "Elaine Benes", "George Constanza", "Cosmo Kramer"],
        correctAnswer: 2, // George Constanza
        image: ("assets/images/Best-Seinfeld-Quotes3.jpg")
    }, 
    {
        question: "4. Yada, yada, yada..",
        answers: ["Jerry Seinfeld", "Elaine Benes", "George Constanza", "Cosmo Kramer"],
        correctAnswer: 1, // Elaine Benes
        image: ("assets/images/Best-Seinfeld-Quotes4.jpg")
    }, 
    {
        question: "5. It's not a lie if you believe it",
        answers: ["Jerry Seinfeld", "Elaine Benes", "George Constanza", "Cosmo Kramer"],
        correctAnswer: 2, // George Constanza
        image: ("assets/images/Best-Seinfeld-Quotes5.jpg")
    }, 
    {
        question: "6. She's one of those low-talkers. You can't hear a word she's saying! You're always going 'excuse me, what was that?'",
        answers: ["Jerry Seinfeld", "Elaine Benes", "George Constanza", "Cosmo Kramer"],
        correctAnswer: 0, // Jerry Seinfeld
        image: ("assets/images/Best-Seinfeld-Quotes6.jpg")
    }, 
    {
        question: "7. Who's gonna turn down a Junior Mint? It's chocolate, it's peppermint, it's delicious!",
        answers: ["Jerry Seinfeld", "Elaine Benes", "George Constanza", "Cosmo Kramer"],
        correctAnswer: 3, // Cosmo Kramer
        image: ("assets/images/Best-Seinfeld-Quotes7.jpg")
    }, 
    {
        question: "8. Hello, Newman.",
        answers: ["Jerry Seinfeld", "Elaine Benes", "George Constanza", "Cosmo Kramer"],
        correctAnswer: 0, // Jerry Seinfeld
        image: ("assets/images/Best-Seinfeld-Quotes8.jpg")
    }, 
    {
        question: "9. I was in the pool! There was shrinkage!",
        answers: ["Jerry Seinfeld", "Elaine Benes", "George Constanza", "Cosmo Kramer"],
        correctAnswer: 2, // George Constanza
        image: ("assets/images/Best-Seinfeld-Quotes9.jpg")
    }, 
    {
        question: "10. Am I crazy? Or am I just so sane I blew your mind?",
        answers: ["Jerry Seinfeld", "Elaine Benes", "George Constanza", "Cosmo Kramer"],
        correctAnswer: 3, // Cosmo Kramer
        image: ("assets/images/Best-Seinfeld-Quotes10.jpg")
    }

];

//3. declare variables for score-keeping
//3.1 correct answer
//3.2 incorrect answer 
//3.3 unanswered questions
var correctAnswer = 0;
var incorrectAnswer = 0;
var unansweredQuestion = 0;

//4. declare variable for quiz area
var panel = $(".quiz");


/// FUNCTIONS
//==========================================================================================================================

//1. when game screen appears, hide start button
//1.1 start game screen, set timer countdown, load questions ansd answer choices
$(".startButton").on("click", function () {
    $('.startButton').hide();
    startGame();
});

function startGame() {
    correctAnswer = 0;
    incorrectAnswer = 0;
    unansweredQuestion = 0;
    timeRemaining = 120;
    countDown = setInterval(timer, 1000);
    displayQuestion();
}

//2. counter starts countdown set at 120 seconds,
//2.1 if timer is less than or equals zero, stop timer and alert player time's up and reactivate start button
function timer() {
    timeRemaining--;
    $(".timeRemaining").text('Time Remaining: ' + timeRemaining + ' seconds');    
    if (timeRemaining <= 0) {
        stopTimer();
        window.alert("Time up!");
        checkAnswers();
    }
}

//3. when time remaining hits zero, displays correct answer and reset the counter back to 120 seconds
function stopTimer() {
    clearInterval(countDown);
    $('.questions').text("The Correct Answer is: " + questions[index].answer[correctAnswer]);
}

//4. load questions and answer choices
function displayQuestion(index){
    // loop through questions
    for (var i = 0; i < questions.length; i++) {
        panel.append("<h2>" + questions[i].question + "</h2>");
    // loop through answers
    for (var j = 0; j < questions[i].answers.length; j++) {
        panel.append('<input type="radio" name="question' + '-' + i + '" value="' + questions[i].answers[j] + '">' + questions[i].answers[j]);
        }
    }
    // done button 
    panel.append('<button id="done">Done</button>');
}

//5. check answer, display results, display scoreboard - correct, incorrect answers and unanswered questions
function checkAnswers () {
	for (var i = 0; i < questions.length; i++) {
		if (isCorrect(questions[i])) {
			correctAnswer++;
		} else if (checkAnswers(questions[i])) {
			incorrectAnswer++;
		} else {
			unansweredQuestion++;
		}
    }
    $('.results').html('correct: ' + correctAnswer + "<br>" + 'incorrect: ' + incorrectAnswer + "<br>" + 'unanswered: ' + unansweredQuestion);
}

//6. if player picks correct answer, increment correctAnswer counter, reset game
function correctAnswer() {
    correctAnswer++;
    $('.timeRemaining').text("That's CORRECT! Well done.")
    resetGame();
}

//7. if player picks incorrect answer, increment incorrectAnswer counter, reset game
function incorrectAnswer() {
    incorrectAnswer++;
    $('.timeRemaining').text("That's incorrect. No Soup For You!")
    resetGame();
}

//8. if player did not answer any questions, increment unansweredQ counter, reset game
function unansweredQuestion {
    unansweredQuestion++;
    $('.timeRemaining').text("Unanswered questions.")
    resetGame();
} 

//9. reset game
function resetGame() {
    correctAnswer = 0;
    incorrectAnswer = 0;
    unansweredQuestion = 0;
    timeRemaining = 120;
    countDown = setInterval(timer, 1000);
    displayQuestion();
}
