
const answer1 = document.querySelector('#answer1');
const answer2 = document.querySelector('#answer2');
const answer3 = document.querySelector('#answer3');
const answer4 = document.querySelector('#answer4');
const nextButton = document.querySelector('#next');
const playAgain = document.querySelector('#play-again');

answer1.classList.add('hidden');
answer2.classList.add('hidden');
answer3.classList.add('hidden');
answer4.classList.add('hidden');
nextButton.classList.add('hidden');


const QUIZ_URL = 'https://opentdb.com/api.php?amount=10';

const categoryArr = [
  'General Knowledge',
  'Entertainment: Books',
	'Entertainment: Film',
	'Entertainment: Music',
	'Entertainment: Musicals & Theatres',
	'Entertainment: Television',
	'Entertainment: Video Games',
	'Entertainment: Board Games',
	'Science & Nature',
	'Science: Computers',
	'Science: Mathematics',
	'Mythology',
	'Sports',
	'Geography',
	'History',
	'Politics',
	'Art',
	'Entertainment: Comics',
	'Science: Gadgets',
	'Entertainment: Japanese Anime & Manga',
	'Entertainment: Cartoon & Animations',
];


const quizQuestions = [];
const correctAnswers = [];
const incorrectAnswers = [];
let answerPosition = [1,2,3,4];

let rightAnswers = 0;
let currentQuestion = 0;
let currIncorrectQuestion = 0;
let currCorrectQuestion = 0;
let correctIndex = 0;

// All parameters are entered as idexes
let categoryIndex = 0;
let difficulty = '';
let type = '';

document.querySelector('#category').addEventListener('change', e => {
	categoryIndex = categoryArr.indexOf(e.target.value) + 9;
	console.log(`${QUIZ_URL}&category=${categoryIndex}`)
  fetch(`${QUIZ_URL}&category=${categoryIndex}`)
		.then(res => {
			return res.json();
		})
		.then(data => {
			// console.log(data);
		})
});

document.querySelector('#difficulty').addEventListener('change', e => {
	difficulty = e.target.value;
})

document.querySelector('#type').addEventListener('change', e => {
	type = e.target.value;
})

document.querySelector('#generate').addEventListener('click', getQuiz);


function getQuiz() {
	document.querySelector('#generate').disabled = true;
	const numQuestions = document.querySelector('#num-questions').value;
	console.log(numQuestions);
	if(type === 'True/False') {
		type = 'boolean'
	} else {
		type = 'multiple'
	}



	fetch(`https://opentdb.com/api.php?amount=${numQuestions}&category=${categoryIndex}&difficulty=${difficulty.toLocaleLowerCase()}&type=${type}`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
				
				// CURRENT PROBLEM: GET QUESTIONS IN SEQUENCE ONE AFTER THE OTHER
				// ALSO KEEP TRACK OF SCORE

				for(let i = 0; i < data.results.length; i++) {
					quizQuestions.push(data.results[i].question);
					correctAnswers.push(data.results[i].correct_answer);
					incorrectAnswers.push(data.results[i].incorrect_answers); // this is going to be an array within an array! Watch out for this
				}
				if(type === 'multiple') {

					displayQuestion();
				} else {
					displayTrueFalse();
				}

				console.log(data);
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function displayTrueFalse(){
	console.log(correctAnswers);
	answer3.classList.add('hidden');
	answer4.classList.add('hidden');
	answer1.innerHTML = 'True';
	answer2.innerHTML = 'False';
}

function displayQuestion() {

	
	 console.log(incorrectAnswers);
	 console.log(correctAnswers);

	 
	 answerPosition = suffle(answerPosition);
	 console.log(answerPosition);
	 let currAnswerPosition = 0;
	 
	 document.querySelector('#question').innerHTML = quizQuestions[currentQuestion];
	 document.querySelector(`#answer${answerPosition[currAnswerPosition++]}`).innerHTML = incorrectAnswers[currentQuestion][currIncorrectQuestion++];
	 document.querySelector(`#answer${answerPosition[currAnswerPosition++]}`).innerHTML = incorrectAnswers[currentQuestion][currIncorrectQuestion++];
	 document.querySelector(`#answer${answerPosition[currAnswerPosition++]}`).innerHTML = incorrectAnswers[currentQuestion][currIncorrectQuestion++];
	 document.querySelector(`#answer${answerPosition[currAnswerPosition++]}`).innerHTML = correctAnswers[currCorrectQuestion++];
	 document.querySelector('#count').innerHTML = `Question ${currentQuestion + 1} out of ${correctAnswers.length}`;
	// checkAnswer(currCorrectQuestion - 1, answerPosition[3], answerPosition);

	correctIndex = answerPosition.indexOf(answerPosition[3]);


	
	document.querySelector('#next').addEventListener('click', e => {
		
		if(currentQuestion === quizQuestions.length - 2) {
			nextButton.innerHTML = 'Get Results';
		}
		
		if(currentQuestion >= quizQuestions.length - 1) {
			
			nextButton.disabled = true;
			answer1.disabled = true;
			answer2.disabled = true;
			answer3.disabled = true;
			answer4.disabled = true;
			document.querySelector('#final').innerHTML = `You scored a final score of ${rightAnswers}/${correctAnswers.length}. 
				That's a ${(rightAnswers/correctAnswers.length) * 100}%! To play again, just refresh this page!`
			playAgain.classList.remove('hidden');
			playAgain.addEventListener('click', e => {
				location.reload(true);
			})
			
			return;
		}
		
		answer1.disabled = false;
		answer2.disabled = false;
		answer3.disabled = false;
		answer4.disabled = false;

		for(let i = 1; i < 5; i++) {
			document.querySelector(`#answer${i}`).classList.remove('correct');
			document.querySelector(`#answer${i}`).classList.remove('incorrect');
		}
		
		
		answerPosition = suffle(answerPosition);
		console.log(answerPosition);
		currIncorrectQuestion = 0;
		currAnswerPosition = 0;
		++currentQuestion;
		document.querySelector('#question').innerHTML = quizQuestions[currentQuestion];
		document.querySelector(`#answer${answerPosition[currAnswerPosition++]}`).innerHTML = incorrectAnswers[currentQuestion][currIncorrectQuestion++];
		document.querySelector(`#answer${answerPosition[currAnswerPosition++]}`).innerHTML = incorrectAnswers[currentQuestion][currIncorrectQuestion++];
		document.querySelector(`#answer${answerPosition[currAnswerPosition++]}`).innerHTML = incorrectAnswers[currentQuestion][currIncorrectQuestion++];
		document.querySelector(`#answer${answerPosition[currAnswerPosition++]}`).innerHTML = correctAnswers[currCorrectQuestion++];
		document.querySelector('#count').innerHTML = `Question ${currentQuestion + 1} out of ${correctAnswers.length}`;
		console.log('here');
	})
	
}


// checkAnswer(currCorrectQuestion - 1, answerPosition[3], answerPosition);

answer1.addEventListener('click', e => {
	let answer = document.querySelector(`#answer${answerPosition[3]}`);
	if(e.target.innerHTML === correctAnswers[currCorrectQuestion - 1]) {
		console.log('reached 1');
		answer1.classList.add('correct');
		// answer2.classList.add('incorrect');
		// answer3.classList.add('incorrect');
		// answer4.classList.add('incorrect');

		answer1.disabled = true;
		answer2.disabled = true;
		answer3.disabled = true;
		answer4.disabled = true;
		updateScore(correctAnswers.length, e);
	} else {
		answer.classList.add('correct');
		
		document.querySelector(`#${e.target.id}`).classList.add('incorrect');

		answer1.disabled = true;
		answer2.disabled = true;
		answer3.disabled = true;
		answer4.disabled = true;
		
	}
})

answer2.addEventListener('click', e => {
	let answer = document.querySelector(`#answer${answerPosition[3]}`);
	if(e.target.innerHTML === correctAnswers[currCorrectQuestion - 1]) {
		console.log('reached 2');
		answer2.classList.add('correct');

		answer1.disabled = true;
		answer2.disabled = true;
		answer3.disabled = true;
		answer4.disabled = true;
		updateScore(correctAnswers.length, e);
	} else {
		answer.classList.add('correct');
		
		document.querySelector(`#${e.target.id}`).classList.add('incorrect');

		answer1.disabled = true;
		answer2.disabled = true;
		answer3.disabled = true;
		answer4.disabled = true;
		
	}
})

answer3.addEventListener('click', e => {
	let answer = document.querySelector(`#answer${answerPosition[3]}`);
	if(e.target.innerHTML === correctAnswers[currCorrectQuestion - 1]) {
		console.log('reached 3');
		answer3.classList.add('correct');

		answer1.disabled = true;
		answer2.disabled = true;
		answer3.disabled = true;
		answer4.disabled = true;
		updateScore(correctAnswers.length, e);
	} else {
		answer.classList.add('correct');
		
		document.querySelector(`#${e.target.id}`).classList.add('incorrect');

		answer1.disabled = true;
		answer2.disabled = true;
		answer3.disabled = true;
		answer4.disabled = true;
		
	}
})

answer4.addEventListener('click', e => {
	let answer = document.querySelector(`#answer${answerPosition[3]}`);
	if(e.target.innerHTML === correctAnswers[currCorrectQuestion - 1]) {
		console.log('reached 4');
		answer4.classList.add('correct');
		answer1.disabled = true;
		answer2.disabled = true;
		answer3.disabled = true;
		answer4.disabled = true;
		updateScore(correctAnswers.length, e);
	} else {
		answer.classList.add('correct');
		
		document.querySelector(`#${e.target.id}`).classList.add('incorrect');

		answer1.disabled = true;
		answer2.disabled = true;
		answer3.disabled = true;
		answer4.disabled = true;
		
	}
})

// function checkAnswer(index, corrAnsPos, arr) {

// 	console.log(arr);
// 	console.log(corrAnsPos);
// 	let answerPosCopy = [...arr];
// 	console.log(answerPosCopy);
// 	let answer = '';

// 	document.querySelector(`#answer${corrAnsPos}`).addEventListener('click', e => {
// 		answer = document.querySelector(`#answer${corrAnsPos}`);
// 		console.log(answer);
// 		answer1.disabled = true;
// 		answer2.disabled = true;
// 		answer3.disabled = true;
// 		answer4.disabled = true;
// 		updateScore(correctAnswers.length, answer);
// 	})



// 	let correctIndex = answerPosCopy.indexOf(corrAnsPos);
// 	answerPosCopy.splice(correctIndex, 1);
// 	console.log(answerPosCopy);
// 	for(let i = 0; i < answerPosCopy.length; i++) {
// 		document.querySelector(`#answer${answerPosCopy[i]}`).addEventListener('click', e => {
// 			if(e.target.innerHTML !== correctAnswers[index]) {
// 				let wrong = document.querySelector(`#answer${answerPosCopy[i]}`);
// 				wrong.classList.add('incorrect');
// 				updateScore(correctAnswers.length, wrong)
// 				document.querySelector(`#answer${corrAnsPos}`).classList.add('correct');
// 				answer1.disabled = true;
// 				answer2.disabled = true;
// 				answer3.disabled = true;
// 				answer4.disabled = true;
// 			}
// 		})
// 	}



	

	// document.querySelector('#answer1').addEventListener('click', e => {

	// 	answer1.disabled = true;
	// 	answer2.disabled = true;
	// 	answer3.disabled = true;
	// 	answer4.disabled = true;

	// 	if(e.target.innerHTML === correctAnswers[index]) {
	// 		updateScore(correctAnswers.length, answer1);
	// 		answer2.classList.add('incorrect');
	// 		answer3.classList.add('incorrect');
	// 		answer4.classList.add('incorrect');
	// 	} else {
	// 		if(!e.target.innerHTML !== document.querySelector(`#answer${corrAnsPos}`).innerHTML) {
	// 			answer1.classList.add('incorrect');
	// 			document.querySelector(`#answer${corrAnsPos}`).classList.add('correct');
	// 			return;
	// 		}
	// 	}
	// })

	// document.querySelector('#answer2').addEventListener('click', e => {

	// 	answer1.disabled = 'true';
	// 	answer2.disabled = 'true';
	// 	answer3.disabled = 'true';
	// 	answer4.disabled = 'true';
	
	// 	if(e.target.innerHTML === correctAnswers[index]) {
	// 		updateScore(correctAnswers.length, answer2);
	// 		answer1.classList.add('incorrect');
	// 		answer3.classList.add('incorrect');
	// 		answer4.classList.add('incorrect');
	// 	} else {
	// 		if(!e.target.innerHTML !== document.querySelector(`#answer${corrAnsPos}`).innerHTML) {
	// 			answer2.classList.add('incorrect');
	// 			document.querySelector(`#answer${corrAnsPos}`).classList.add('correct');

	// 		}
	// 	}
	// })


	// document.querySelector('#answer3').addEventListener('click', e => {

	// 	answer1.disabled = 'true';
	// 	answer2.disabled = 'true';
	// 	answer3.disabled = 'true';
	// 	answer4.disabled = 'true';
	
	// 	if(e.target.innerHTML === correctAnswers[index]) {
	// 		updateScore(correctAnswers.length, answer3);
	// 		answer1.classList.add('incorrect');
	// 		answer2.classList.add('incorrect');
	// 		answer4.classList.add('incorrect');
	// 	}else {
	// 		if(!e.target.innerHTML !== document.querySelector(`#answer${corrAnsPos}`).innerHTML) {
	// 			answer3.classList.add('incorrect');
	// 			document.querySelector(`#answer${corrAnsPos}`).classList.add('correct');

	// 		}
	// 	}
	// })


	// document.querySelector('#answer4').addEventListener('click', e => {

	// 	answer1.disabled = 'true';
	// 	answer2.disabled = 'true';
	// 	answer3.disabled = 'true';
	// 	answer4.disabled = 'true';
	
	// 	if(e.target.innerHTML === correctAnswers[index]) {
	// 		updateScore(correctAnswers.length, answer4);
	// 		answer1.classList.add('incorrect');
	// 		answer2.classList.add('incorrect');
	// 		answer3.classList.add('incorrect');
	// 	}else {
	// 		if(!e.target.innerHTML !== document.querySelector(`#answer${corrAnsPos}`).innerHTML) {
	// 			answer4.classList.add('incorrect');
	// 			document.querySelector(`#answer${corrAnsPos}`).classList.add('correct');

	// 		}
	// 	}
	// })




function suffle(arr) {
	let currentIndex = arr.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex], arr[currentIndex]];
  }

  return arr ;
}

function updateScore(total) {

	// if(num === 0) {
	// 	document.querySelector('#score').innerHTML = `${rightAnswers}/${total}`
	// }

	
		document.querySelector('#score').innerHTML = `${++rightAnswers}/${total}`

	return;
}



