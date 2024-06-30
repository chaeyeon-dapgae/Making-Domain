//숫자 맞추기 게임

// 1. 랜덤 번호 지정
// 2. 유저가 번호를 입력 후 go 버튼 클릭
// 3. "맞췄습니다" / "Down" / "Up"
// 4. reset버튼 클릭시 게임 리셋
// 5. 5번의 기회를 다쓰면 게임이 끝난다 => 버튼이 disable
// 6. 유저가 1~100 밖의 숫자를 입력시 "다시 입력하세요." (기회 X )
// 6. 유저가 같은 숫자를 입력시 "다른 값을 입력하세요." (기회 X )

let randomNum = 0;
let playButton = document.getElementById("playbtn");
let userInput = document.querySelector("#user-input");
let resultArea = document.querySelector("#result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = []


//함수도 매개변수로 넘길 수 있다
playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
  userInput.value = "";
});

function pickRandomNum () {
  randomNum = Math.floor(Math.random()*100 + 1);
}

function play () {
  let userValue = userInput.value;

  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1 ~ 100 사이의 숫자를 입력하세요!";
    //return을 지우면 왜 위 코드가 실행이 안될까?
    return;
  }

  if (history.includes(userValue)) {
    resultArea.textContent = "이미 입력한 숫자입니다! 다른 숫자를 입력하세요!";
    return;
  }

  chances --;
  chanceArea.textContent = "남은 기회 : " + chances + "번"
  
  if (userValue < randomNum) {
    resultArea.textContent = "UP!";
  } else if (userValue > randomNum) {
    resultArea.textContent = "DOWN!";
  } else {
    resultArea.textContent = "You Win the game!";
  }
  
  history.push(userValue);
  
  if (chances < 1) {
    gameOver = true;
    resultArea.textContent = "You Lose the game..";
    chanceArea.textContent = "모든 기회를 사용하였습니다!";
  }

  if (gameOver == true) {
    playButton.disabled = true;
  }
}

function reset () {
  userInput.value = "";
  pickRandomNum ();
  resultArea.textContent = "Up? Down?";
  chances = 5;
  chanceArea.textContent = "남은 기회 : " + chances + "번"
  playButton.disabled = false;
  history = []
}

pickRandomNum ();