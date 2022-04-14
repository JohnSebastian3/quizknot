
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
			console.log(data);
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

	let currentQuestion = 0;

	fetch(`https://opentdb.com/api.php?amount=${numQuestions}&category=${categoryIndex}&difficulty=${difficulty.toLocaleLowerCase()}&type=${type}`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
				
				// CURRENT PROBLEM: GET QUESTIONS IN SEQUENCE ONE AFTER THE OTHER
				// ALSO KEEP TRACK OF SCORE
				getQuestion(questionNum);
				document.querySelector('#question').innerHTML = data.results[0].question;

		
				console.log(data);
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}


fetch(QUIZ_URL)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

function getFetch(){
  const choice = document.querySelector('input').value
  const url = 'https://pokeapi.co/api/v2/pokemon/'+choice

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function getQuestion()