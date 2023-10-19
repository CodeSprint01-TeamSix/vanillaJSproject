const gameButton = document.querySelector("#game-button");

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

// 이벤트 핸들러로 불러오는 행맨 게임 시작 함수
function startHangman() {
  leftNumber = 5; // 게임 시작 시 초기화
  getRandomWord().then((word) => {
    const startButton = document.getElementById("game-button");
    const quizPart = document.getElementById("quiz-part");

    if (word) {
      console.log(word);
      const displayWord = word
        .split("")
        .map((char) => (char === " " ? " " : "ㅡ"))
        .join("");
      quizPart.textContent = displayWord;

      document.addEventListener("keydown", (event) => {
        guessingWord(event, word, quizPart);
      });
    }

    startButton.textContent = "Reset";
  });
}

// 키 다운 시 게임 작동 함수
function guessingWord(event, word, quizPart) {
  const keyPressed = event.key.toLowerCase();
  const guessesLeft = document.getElementById("result-info");
  const leftNumberElement = document.getElementById("left-number");
  let numLeftNumber = parseInt(leftNumberElement.textContent); // leftNumber를 숫자로 변환

  if (word.includes(keyPressed)) {
    const hiddenWordArray = quizPart.textContent.split("");
    let found = false;
    for (let i = 0; i < word.length; i++) {
      if (word[i] === keyPressed) {
        hiddenWordArray[i] = keyPressed;
        found = true;
      }
    }
    if (!found && numLeftNumber > 0) {
      numLeftNumber -= 1;
      leftNumberElement.textContent = numLeftNumber;
    } else if (!found && numLeftNumber === 0) {
      guessesLeft.textContent = "Game Over";
    }
    quizPart.textContent = hiddenWordArray.join("");
  }
}

gameButton.addEventListener("click", startHangman);
