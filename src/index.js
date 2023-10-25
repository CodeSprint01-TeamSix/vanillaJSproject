let fruits = [
  "apple",
  "banana",
  "grape",
  "pear",
  "strawberry",
  "lemon",
  "melon",
  "watermelon",
  "tomato",
  "orange",
  "kiwi",
  "pineapple",
];

let answer = "";
let life = 5;
let guessed = [];
let wordStatus = null;
/* const aaaa = {
  answer : "",
  life: 5,
  guessed: [],
  wordStatus: null,
} */

// //랜덤 단어 생성
// const createRandomWords = async () => {
//   const response = await fetch("src/words.json");
//   const result = await response.json();
//   const { randomWords } = result;

//   const randomNumber = Math.floor(Math.random() * randomWords.length);
//   const { word } = randomWords[randomNumber];
//   // missionWord.inputWord = word;
//   // console.log(word);
//   // return word;
// };

const gameButton = document.querySelector(".game-button");
const mistakes = document.querySelector("#mistakes");

//랜덤으로 단어를 생성해주는 함수
function randomWord() {
  answer = fruits[Math.floor(Math.random() * fruits.length)];
}

//알파벳을 맞추면 보여주고 틀리면 life를 깎는 함수
function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  console.log(guessed);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkGameWin();
  } else if (answer.indexOf(chosenLetter) === -1) {
    life--;
    checkGameLose();
    mistakes.innerHTML = `${life}`;
  }
}

//초기화 하는 함수
//만들기

//정답을 맞췄을 때 실행되는 함수
function checkGameWin() {
  if (wordStatus === answer) {
    alert("You Win!!");
  }
}

//목숨이 0이 됐을 때 실행되는 함수
function checkGameLose() {
  if (life === 0) {
    alert("You Lose!!");
  }
}

//답을 '_'로 바꿔주는 함수
function guessedWord() {
  console.log(answer);
  wordStatus = answer
    .split("")
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : " _ "))
    .join("");

  document.getElementById("wordSpotlight").innerHTML = wordStatus;
}

//리셋하는 함수
function reset() {
  life = 5;
  guessed = [];

  randomWord();
  guessedWord();
}

//이벤트를 넘겨주는 함수
function handleKeyDown(event) {
  console.log(event);
  handleGuess(event.key);
}

gameButton.addEventListener("click", reset);
window.addEventListener("keydown", handleKeyDown);

randomWord();
guessedWord();
// //1~2까지 랜덤 숫자 생성
// function randomNumber() {
//   return Math.floor(Math.random() * 2) + 1;
// }

//랜덤 단어 생성
// async function createRandomWords() {
//   //const wordCount = randomNumber();
//   try {
//     const response = await fetch("http://puzzle.mead.io/puzzle?wordCount=1");
//     const result = await response.json();
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// }

// createRandomWords();
