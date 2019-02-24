/*-----------------------------*\
|* Pseudocode (initial logic): *|
\*-----------------------------*/

/*
- attempt basic game
- declare variable for timer and variable to hold array of questions, answer list and correct answer
- on screen load, hide content and show start button
- set timer countdown, load 10 questions and 4 answer choices
- counter starts countdown set at 100 seconds
- if timer is less than or equals zero, stop timer and alert player time's up and reactivate start button
- when time hits zero, displays correct answer and reset the counter back to 100 seconds
- load questions and answer choices upon start button click event
- if player picks correct answer, increment correctAnswer counter
- if player picks wrong answer, increment wrongAnswer counter
- if player did not answer any questions, increment unanswered counter
- check answer using indexing, append results
- display final scores: correct answers, wrong answers and unanswered questions
- reset game

/*---------------------------*\
|* Pseudocode (final logic): *|
\*---------------------------*/

/*
- attempt recommended game
- declare variables for timer, quiz counters and question tracking
- save questions and answer list array in a separate json format
- get json data from local directory or get json from web server
- if json successfully on load, display data, else console log request failed
- listen to when start button is clicked, hide results and start button, show triviaGame
- questions and answer choices on load
- display questions, make sure timer is set to zero and game is over if there's no more questions
- display current question from array
- if counter is not running, setup start timer every second and counter running is set to true
- display currenty question and answer choices
- for each question index the right answer and append to div
- check current question guess matches to correct answer array
- if guess is correct and matches to correct answer display alert message;
- if guess is wrong and matches to wrong answer display alert message
- call function to display next question in the array
- timer functionality: start, stop, reset
- start: decrement timer by 1 second, if time remaining equals to 0 increment unanswered question counter
- stop: clear interval, counter running is set to default
- reset: reset timer to 10 seconds
- display results and enable restart button
