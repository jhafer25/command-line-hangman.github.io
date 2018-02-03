const inquirer = require('inquirer');
const words = require('./availableWords.js');
const letterCheck = require('./logic.js');


const wordObj = words.word.wordFunctions;					
const letterObj = letterCheck.letter.letterFunctions;	

let randomWord = ''; 
let currentWord = '';
let guessesRemaining = '';
let lettersGuessed = '';


const gameSetup = () => {
	randomWord = wordObj.wordList[Math.floor(Math.random()*wordObj.wordList.length)];
	currentWord = '';

	for(let i=0;i<randomWord.length;i++) {
		currentWord += '_ ';
	}

	lettersGuessed = [];
	guessesRemaining = 10;
}


const currentGuess = () => {
	console.log(currentWord);

	inquirer.prompt([
		{
			type: "input",
			message: "Guess A Letter:",
			name: "letter"
		},
	]).then(function (currentLetterGuessed) {
		let guessedLetter = currentLetterGuessed.letter.toLowerCase();
		let isLetter = letterObj.checkIfLetter(guessedLetter);
		let inWord = false;

		if(isLetter) {
			for(let i = 0; i < randomWord.length; i++) {
				if(guessedLetter == randomWord[i]) {
					currentWord = letterObj.replaceLetter(currentWord, i * 2, guessedLetter);
					inWord = true;
				}
			}

			if(!inWord && !letterObj.inArray(guessedLetter, lettersGuessed)) {
				lettersGuessed.push(guessedLetter);
				guessesRemaining--;
			}

			console.log(`
					\n
					----------------------------------------
					\n
					You have ${guessesRemaining} guesses remaining
					\n
					----------------------------------------
					\n
					You have guessed these letters wrong: ${lettersGuessed}
					\n
					----------------------------------------
			`);

			if(currentWord.indexOf("_") === -1) {
				console.log(`
					\n
					----------------------------------------
					\n
					Congratulations, you won!
					\n
					----------------------------------------
					\n
					The word was ${randomWord}!
					\n
					----------------------------------------
					\n
				`);
				playAgain();
			} else if(guessesRemaining == 0){
				console.log(`
					\n
					----------------------------------------
					\n
					You lost the game!
					\n
					----------------------------------------
					\n
					The word was ${randomWord}!
					\n
					----------------------------------------
					\n
				`);
				playAgain();
			} else {
				currentGuess();
			}
		} else {
			console.log(`
					\n
					----------------------------------------
					\n
					That was not a letter. Please enter a letter A-Z. You guessed ${guessedLetter}.
					\n
					----------------------------------------
					\n
			`);
			currentGuess();
		}

	});
}

const playAgain = () => {
	inquirer.prompt([
	{
		type: "confirm",
		message: "Do you want to play again?",
		name: "playAgain"
	},
	]).then(function (user) {
		if(user.playAgain) {
			gameSetup();
			currentGuess();
		} else {
			console.log("Come back soon!");
		}
	});
}

gameSetup();
currentGuess();