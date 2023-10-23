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

let leftNumber = 5; // 초기 남은 기회 수
let newWord = "";
const guessesLeft = document.getElementById("result-info");

// 이벤트 핸들러로 불러오는 행맨 게임 시작 함수
function startHangman() {
  leftNumber = 5; // 게임 시작 시 초기화
  guessesLeft.innerHTML = `Guesses Left : <span id="left-number">${leftNumber}</span>`;

  getRandomWord().then((word) => {
    console.log(`데이터 가져오기 ${word}`);
    const startButton = document.getElementById("game-button");

    if (word) {
      console.log(`조건쪽 word는${word}`);
      const displayWord = word
        .split("")
        .map((char) => {
          return char === " " ? " " : "ㅡ";
        })
        .join("");
      console.log(displayWord);
      quizPart.textContent = displayWord;
      newWord = word;
    }

    startButton.textContent = "Reset";
  });
}

// 키 다운 시 게임 작동 함수
function guessingWord(event, word, quizPart) {
  console.log(word.split(""));
  const keyPressed = event.key.toLowerCase();
  const leftNumberElement = document.getElementById("left-number");
  const hiddenWordArray = quizPart.textContent.split("");
  console.log(hiddenWordArray);
  let found = false;
  let numLeftNumber = parseInt(leftNumberElement.textContent); // leftNumber를 숫자로 변환

  if (word.includes(keyPressed)) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] == keyPressed) {
        console.log(
          `word는 ${word[i]}, hiddenWordArray는 ${hiddenWordArray[i]}, index=${i}`
        );
        hiddenWordArray[i] = word[i];
        found = true;
      }
    }
  } else if (!found && numLeftNumber > 0) {
    numLeftNumber -= 1;
    leftNumberElement.textContent = numLeftNumber;
    console.log(found);
  } else if (!found && numLeftNumber === 0) {
    guessesLeft.textContent = "Game Over";
    //startHangman();
  }
  quizPart.textContent = hiddenWordArray.join("");
}

// gameover 카운트 오류 해결
// 다 맞췄을 때 성공 메세지
// 다른 키 입력 제한 추가

gameButton.addEventListener("click", startHangman);
window.addEventListener("keydown", (event) => {
  guessingWord(event, newWord, quizPart);
});
