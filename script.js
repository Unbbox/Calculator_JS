const screen = document.getElementById("screen");
const btns = document.querySelectorAll("button");
const clearBtn = document.getElementById("resetBtn");
const resultBtn = document.getElementById("resultBtn");
const eraseBtn = document.getElementById("eraseBtn");

let currentInput = "";

// 연산자 구별 정규식
const operatorRegex = /^(\d+|\*\*|[+\-*/])$/;
// 숫자 구별 정규식
const numberRegex = /[0-9]/g;

// input 태그 화면에 숫자 또는 연산자를 추가하는 함수
function appendToScreen(value) {
  screen.value += value;
}

// 화면을 초기화하는 함수
function clearScreen() {
  screen.value = "";
}

// 연산 수행 함수
function calculate(operator, numbers) {
  // nubmers에 배열로 된 데이터를 넣을 예정(숫자와 연산자)
  // numbers.map(Number) => numbers 안에 있는 배열데이터들을 전부 숫자화시켜달라.
  const [num1, num2] = numbers.map(Number);

  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num2 !== 0 ? num1 / num2 : "Error";
    default:
      return "";
  }
}

function handleButtonClick(e) {
  // 새로고침 방지
  e.preventDefault();

  const buttonText = e.currentTarget.value;

  if (numberRegex.test(buttonText) == true) {
    appendToScreen(buttonText);
  } else if (operatorRegex.test(buttonText) == true) {
    appendToScreen(buttonText);
  }
}

// 버튼 클릭 이벤트 리스너 등록 함수
function initializeButtonListener() {
  btns.forEach((btn) => {
    let btnCheck = btn.addEventListener("click", handleButtonClick);
    console.log(btnCheck);
  });
}

initializeButtonListener();

// "=" 버튼 클릭 시 계산 결과를 화면에 표시
function handleResultClick() {
  const screenValue = screen.value;

  if (screenValue.includes("+")) {
    const [num1, num2] = screenValue.split("+");
    screen.value = calculate("+", [num1, num2]);
  } else if (screenValue.includes("-")) {
    const [num1, num2] = screenValue.split("-");
    screen.value = calculate("-", [num1, num2]);
  } else if (screenValue.includes("*")) {
    const [num1, num2] = screenValue.split("*");
    screen.value = calculate("*", [num1, num2]);
  } else if (screenValue.includes("/")) {
    const [num1, num2] = screenValue.split("/");
    screen.value = calculate("/", [num1, num2]);
  }
}

// 초기화 버튼 클릭 이벤트 리스너 함수
clearBtn.addEventListener("click", clearScreen);

// "=" 버튼 클릭 이벤트 리스너 함수
resultBtn.addEventListener("click", handleResultClick);

eraseBtn.addEventListener("click", (e) => {
  console.log("erase!:" + screen.value);
  console.log(screen.value.length);
  screen.value = screen.value.slice(0, -1);
});
