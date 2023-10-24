const gameButton = document.querySelector("#game-button");
const quizPart = document.getElementById("quiz-part");

// 데이터 가져오기
async function getRandomWord() {
  try {
    const response = await fetch("https://puzzle.mead.io/puzzle?wordCount=");
    const data = await response.json();
    return data.puzzle.toLowerCase();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// const getRandomWord = async () => {
//   function getRandom(min, max) {
//     return Math.floor(Math.random() * (max - min + 1) + min);
//   }

//   const wordCount = getRandom(1, 9);

//   const response = await fetch(
//     `http://puzzle.mead.io/puzzle?wordCount=${wordCount}`
//   );
//   if (response.status === 200) {
//     const data = await response.json();
//     return data.puzzle.toLowerCase();
//   } else {
//     throw new Error("unable to get puzzle");
//   }
// };

let leftNumber = 5; // 초기 남은 기회 수
let newWord = "";
const guessesLeft = document.getElementById("result-info");
const startButton = document.getElementById("game-button");

// 영문 키만 입력 제한
const isAlphabet = (event) => {
  return event.keyCode >= 65 && event.keyCode <= 122;
};

// 이벤트 핸들러로 불러오는 행맨 게임 시작 함수
function startHangman() {
  leftNumber = 5; // 게임 시작 시 초기화
  guessesLeft.innerHTML = `Guesses Left : <span id="left-number">${leftNumber}</span>`;

  getRandomWord().then((word) => {
    console.log(`정답은 ${word} 입니다.`);
    if (word) {
      const displayWord = word
        .split("")
        .map((char) => {
          return char === " " ? " " : "ㅡ";
        })
        .join("");
      quizPart.textContent = displayWord;
      newWord = word;
    }

    startButton.textContent = "RESET";
  });
}

// 키 다운 시 게임 작동 함수
function guessingWord(event, word, quizPart) {
  const keyPressed = event.key.toLowerCase();
  const leftNumberElement = document.getElementById("left-number");
  const hiddenWordArray = quizPart.textContent.split("");

  let found = false;
  let numLeftNumber = parseInt(leftNumberElement.textContent); // leftNumber를 숫자로 변환

  const newWord = word; // word 변수를 newWord 변수에 복사

  if (newWord.includes(keyPressed)) {
    for (let i = 0; i < newWord.length; i++) {
      if (newWord[i] == keyPressed) {
        hiddenWordArray[i] = newWord[i];
        found = true;
      }
    }
  } else if (!found && numLeftNumber > 1) {
    numLeftNumber -= 1;
    leftNumberElement.textContent = numLeftNumber;
  } else if (!found && numLeftNumber === 1) {
    guessesLeft.textContent = "GAME OVER";
    startButton.textContent = "RESTART";
  }
  if (hiddenWordArray.every((c) => c !== "ㅡ")) {
    guessesLeft.textContent = "YOU WIN!";
  }

  quizPart.textContent = hiddenWordArray.join("");
}

// 이벤트 핸들러
gameButton.addEventListener("click", startHangman);
window.addEventListener("keydown", (event) => {
  if (isAlphabet(event)) {
    guessingWord(event, newWord, quizPart);
  }
});
