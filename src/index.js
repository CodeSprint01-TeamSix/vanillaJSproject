// 전체 로직: 키보드 버튼 누르면, 퀴즈 문자열에 존재하는 값인지 아닌지 판별

// 클래스명으로 앨리먼트 가져오기 (바뀌는 부분)
const resetButton = document.getElementById("resetButton");
const quizContent = document.querySelector(".QuizContent");
const GussesLeft = document.querySelector(".GuessesLeft");
const input = document.querySelector(".input");

// 변수 선언
const data = { puzzle: "Common Cause" };
let quiz = " "; //실제 퀴즈 내용
quiz = data["puzzle"].toUpperCase(); //모두 대문자로 처리
let life = [...new Set(quiz.split(" ").join(""))].length + 2; // 목숨 수 (알파벳 갯수+2개로 정함)
let madedQuiz = []; //퀴즈 출제와 사용자 입력 (각 요소를 바꾸기 위해 배열로)
let inputList = []; //사용자의 키보드 입력값 담기 위한 배열

// 목숨 갯수 화면에 보여주기
GussesLeft.textContent = life;

//reset 버튼 클릭 이벤트 발생 시, 퀴즈 출제-> madedquiz
async function getSentence() {
  resetButton.textContent = "Reset";
  madedQuiz = []; //reset 누를 때마다, 단어 배열 초기화 되도록
  inputList = [];
  const min = 1;
  const max = 500;
  const wordCount = Math.floor(Math.random() * (max - min + 1)) + min;
  try {
    // const response = await fetch(`http://puzzle.mead.io/puzzle?wordCount=`);
    // const data = await response.json();
    // 문장 길이에 따라 input창에 '*' 띄어주기
    for (const char of quiz) {
      madedQuiz.push(char === " " ? " " : "*");
    }
    quizContent.textContent = madedQuiz.join("");
    return data;
  } catch (error) {
    console.error("데이터를 가져오는 중 오류가 발생하였습니다:", error);
  }
}

//키보드로 입력받은 값에 따라 처리해주기 (있는 값이면 바꿔주고/ 없는 값이면 시도 횟수만 줄어듦)
function playGame(e) {
  // 소문자, 대문자 입력 상관없이 입력 가능하도록 (모두 대문자로 인식)
  const key = e.key.toUpperCase();

  // 알파벳 이외의 값 입력하지 못하도록
  if (!/^[A-Z]$/.test(key)) {
    window.alert("알파벳을 입력해주세요!");
    return;
  }
  //사용자가 이미 입력했던 값은 처리해주지 않음
  else if (inputList.includes(key)) {
    window.alert(key + "는 이미 입력한 값입니다. 다른 값을 입력하시오.");
    return;
  }

  if (life > 0) {
    let i = 0;
    //키보드 입력 내용 보여주고-> 같은 거 있는 지 검사 후-> 보여주고-> alert
    //입력 내용 사용자에게 보여주기
    inputList.push(key);
    input.textContent = inputList;
    //목숨 하나 줄이기
    life--;
    //quiz 하나씩 돌면서, key값과 같은 경우 바꾸기
    for (i = 0; i < quiz.length; i++) {
      if (quiz[i] === key) {
        madedQuiz[i] = key;
        console.log(madedQuiz);
      }
    }
    //화면에 보여주기 (join해서 다시 화면에 보여줌)
    quizContent.textContent = madedQuiz.join("");
    GussesLeft.textContent = String(life);
    //배열 내에 *가 존재하지 않으면, 게임 승리 모달 띄어주기
    if (!madedQuiz.includes("*")) {
      //&& i === quiz.length - 1
      window.alert("🎉게임 성공🎉");
      e.preventDefault();
    }
  } else {
    // 목숨을 다 쓴 경우이므로, 게임오버 처리하기
    window.alert("게임 실패🥲 목숨을 다 사용하였습니다.");
    e.preventDefault();
  }
}

// 이벤트 적용
resetButton.addEventListener("click", getSentence);
document.addEventListener("keydown", playGame);
