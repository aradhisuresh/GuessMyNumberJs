'use strict';


var resetGame = function () {
    bodyElement.style.backgroundColor = '#222';
    secretNumberElement.style.width = '15rem';
    secretNumberElementent.textContent = '?';
    showmsg('Start guessing...');
    numberAndButtonSectionElement.style.visibility = 'visible';

    numberElement.value = '';
    score = 20;

    scoreElement.textContent = score;
    secretNumber = randomNumber();

}

const showmsg = function (msg) {
    msgElement.textContent = msg;
}

var randomNumber = function () {
    const num = Math.trunc(Math.random() * 20) + 1;
    return num;
}

var numberElement = document.querySelector('.guess');
var msgElement = document.querySelector('.message');
var scoreElement = document.querySelector('.score');
var highScoreElement = document.querySelector('.highscore');
var secretNumberElement = document.querySelector('.number');
var bodyElement = document.querySelector('.body');
var numberAndButtonSectionElement = document.querySelector('.left');

let secretNumber = randomNumber();
let highScore = parseInt(highScoreElement.textContent);
let score = parseInt(scoreElement.textContent);

//Check button click
document.querySelector('.check').addEventListener('click', function () {
    let number = parseInt(numberElement.value);
    console.log(number);
    console.log(typeof number);

    //When no number is entered
    if (!number) {
        showmsg('Please Enter a valid Input..');
    }

    //when number is not between 1 and 20
    else if (number > 20 || number < 1) {
        showmsg('Please Enter a number between 1 and 20');
    }

    //when valid number is entered
    else {

        //Check if score is not 0
        if (score > 1) {
            //when number matches the secret number
            if (number === secretNumber) {
                bodyElement.style.backgroundColor = 'green';
                secretNumberElement.style.width = '30rem';
                secretNumberElement.textContent = number;
                showmsg('You Win!!!!');
                numberAndButtonSectionElement.style.visibility = 'hidden';

                // setting highscore
                if (score > highScore) {
                    highScore = score;
                    highScoreElement.textContent = highScore;
                }

            }

            //when number doesn't match the secret number 
            else {

                //when number is greater than the secret number
                if (number > secretNumber) {

                    //when number is very close to the secret number
                    if ((number - secretNumber) < 3) {
                        showmsg('You are close');
                    }

                    //when number is higher than the secret number
                    else {
                        showmsg('Too High..');

                    }
                }

                //when number is lesser than the secret number
                else {
                    //when number is very close to the secret number
                    if ((secretNumber - number) < 3) {
                        showmsg('You are close');
                    }

                    //when number is lower than the secret number
                    else {
                        showmsg('Too Low..');
                    }
                }

                score--;
                scoreElement.textContent = score;
            }
        }

        //if score is 0
        else {
            showmsg('You lost the game..');
            bodyElement.style.backgroundColor = 'red';
            secretNumberElement.textContent = secretNumber;
            numberAndButtonSectionElement.style.visibility = 'hidden';
            scoreElement.textContent = 0;
        }
    }
});

//resetting the data to origial on click of 'Again' button 
document.querySelector('.again').addEventListener('click', resetGame);