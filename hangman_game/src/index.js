const gameButton = document.querySelector("#game-button");

// 데이터 가져오기
async function getRandomWord() {
    try {
      const response = await fetch('https://puzzle.mead.io/puzzle?wordCount=');
      if (!response.ok) {
        throw new Error('서버로부터 데이터를 가져오지 못했습니다.');
      }
      const data = await response.json();
      return data.puzzle.toLowerCase();
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
}

// 키다운 이벤트 핸들러로 불러오는 행맨 게임 시작 함수
function startHangman() {
    getRandomWord().then((word) => {
        if (word) {
            console.log(word);
            const quizPart = document.getElementById('quiz-part');
            const hiddenWord = ' - '.repeat(word.length);
            quizPart.textContent = hiddenWord;
        }
    });
}

gameButton.addEventListener("click", startHangman);