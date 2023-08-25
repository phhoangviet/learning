let timerElement = document.getElementById("timer");

let imgElement = document.getElementById("hangman");
let ruleFail = 0;
const maxFail = 6;

let interval = null;

const levelSelectedByUser = localStorage.getItem("level");

if (!levelSelectedByUser) {
  window.location.href = "index.html";
}
let maxTimeDefault = getMaxTimeByLevel(levelSelectedByUser);
let maxTime = maxTimeDefault;

function getMaxTimeByLevel(levelSelectedByUser) {
  switch (+levelSelectedByUser) {
    case 1:
      return 30;
    case 2:
      return 15;
    case 3:
      return 5;
    default:
      return 30;
  }
}

function getImageFailByRule(fail) {
  switch (fail) {
    case 1:
      return "images/hangman_fail1.png";
    case 2:
      return "images/hangman_fail2.png";
    case 3:
      return "images/hangman_fail3.png";
    case 4:
      return "images/hangman_fail4.png";
    case 5:
      return "images/hangman_fail5.png";
    case 6:
      return "images/hangman_fail6.png";
    default:
      return "images/hangman_entry1.png";
  }
}

function updateTimer() {
  timerElement.innerText = maxTime;
  maxTime = maxTime - 1;
  if (maxTime < 0) {
    //sau 10 giay ma khong nhap chu = fail + 1
    maxTime = maxTimeDefault;
    ruleFail++;
    let imgHangman = getImageFailByRule(ruleFail);

    imgElement.src = imgHangman;
    if (ruleFail == maxFail) {
      clearTimer();
      localStorage.removeItem("level");
      document.getElementById("retry").style.display = "block";
      const listAlphebetElement = document.getElementsByClassName("alphabet");
      for (let i = 0; i < listAlphebetElement.length; i++) {
        listAlphebetElement[i].removeEventListener(
          "click",
          handleClickAlphabet
        );
      }
      let nodeResult = document.createElement("p");
      nodeResult.setAttribute("id","resultWords");
      nodeResult.innerHTML = "You win<br/>" + ansCompare;
      document.getElementById("result").prepend(nodeResult);
    }
  }
}
function initTimer() {
  updateTimer();
  interval = setInterval(updateTimer, 1000);
}
function clearTimer() {
  clearInterval(interval);
  interval = null;
}
