
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

let currentQuestion = 0;
let currIncorrectQuestion = 0;
let currCorrectQuestion = 0;

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
				displayQuestion();

				console.log(data);
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function displayQuestion() {
	if(currentQuestion >= quizQuestions.length) {
		alert('Quiz Done!');
		return;
	}
	 console.log(incorrectAnswers);

	 let answerPosition = [1,2,3,4];
	 answerPosition = suffle(answerPosition);
	 console.log(answerPosition);
	 let currAnswerPosition = 0;

	document.querySelector('#question').innerHTML = quizQuestions[currentQuestion];
	document.querySelector(`#answer${answerPosition[currAnswerPosition++]}`).innerHTML = incorrectAnswers[currentQuestion][currIncorrectQuestion++];
	document.querySelector(`#answer${answerPosition[currAnswerPosition++]}`).innerHTML = incorrectAnswers[currentQuestion][currIncorrectQuestion++];
	document.querySelector(`#answer${answerPosition[currAnswerPosition++]}`).innerHTML = incorrectAnswers[currentQuestion][currIncorrectQuestion++];
	document.querySelector(`#answer${answerPosition[currAnswerPosition++]}`).innerHTML = correctAnswers[currCorrectQuestion++];
	checkAnswer(currCorrectQuestion - 1);
	document.querySelector('#next').addEventListener('click', e => {
		answerPosition = suffle(answerPosition);
		console.log(answerPosition);
		currIncorrectQuestion = 0;
		currAnswerPosition = 0;
		++currentQuestion;
		document.querySelector(`#answer${answerPosition[currAnswerPosition++]}`).innerHTML = incorrectAnswers[currentQuestion][currIncorrectQuestion++];
		document.querySelector(`#answer${answerPosition[currAnswerPosition++]}`).innerHTML = incorrectAnswers[currentQuestion][currIncorrectQuestion++];
		document.querySelector(`#answer${answerPosition[currAnswerPosition++]}`).innerHTML = incorrectAnswers[currentQuestion][currIncorrectQuestion++];
		document.querySelector(`#answer${answerPosition[currAnswerPosition++]}`).innerHTML = correctAnswers[currCorrectQuestion++];
		document.querySelector('#question').innerHTML = quizQuestions[currentQuestion];
		checkAnswer(currCorrectQuestion - 1);
	})
	
}

function checkAnswer(index) {
	document.querySelector('#answer1').addEventListener('click', e => {
		console.log(correctAnswers[index]);
		if(e.target.innerHTML === correctAnswers[index]) {
			updateScore();
		}
	})

	document.querySelector('#answer2').addEventListener('click', e => {
	
		if(e.target.innerHTML === correctAnswers[index]) {
			updateScore();
		}
	})


	document.querySelector('#answer3').addEventListener('click', e => {
	
		if(e.target.innerHTML === correctAnswers[index]) {
			updateScore();
		}
	})


	document.querySelector('#answer4').addEventListener('click', e => {
	
		if(e.target.innerHTML === correctAnswers[index]) {
			updateScore();
		}
	})


}

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

