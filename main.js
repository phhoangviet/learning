const dataSet = [
  "throw",
  "guard",
  "header",
  "brace",
  "goalie",
  "score",
  "field",
  "strike",
  "lines",
  "derby",
  "owngoal",
];
const alphabets = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
let answerElement = document.getElementById("answer");
let tableAlphabetElement = document.getElementById("tableAlphabet");
let compareData = [];
const listAlphebetElement = document.getElementsByClassName("alphabet");
function renderAnswer(ansWord) {
  for (let i = 0; i < ansWord.length; i++) {
    let answerKey = ansWord[i];
    compareData.push(false);
    let node = document.createElement("div"); //tao the div
    let nodeAnswerValue = document.createTextNode(answerKey); //tao ra chu d
    node.appendChild(nodeAnswerValue); // tao ra the div chua d
    answerElement.appendChild(node); //append nguyen the div vao answer element
    node.setAttribute("id", answerKey);
    node.style.display = "none";

    let nodePreanswer = document.createElement("div");
    nodePreanswer.classList.add("preAnswer");
    answerElement.appendChild(nodePreanswer);
  }
}
let ansCompare = "";
initGame();
function renderAlphabet() {
  for (let i = 0; i < alphabets.length; i++) {
    let character = alphabets[i];
    let node = document.createElement("div");
    let nodeValue = document.createTextNode(character);
    node.appendChild(nodeValue);
    node.classList.add("alphabet");
    node.addEventListener("click", handleClickAlphabet);
    document.getElementById("tableAlphabet").appendChild(node);
  }
}

function isGameFinished(compareData) {
  for (i = 0; i < compareData.length; i++) {
    if (compareData[i] == false) {
      return false;
    }
  }
  return true;
}
function handleClickAlphabet(e) {
  let node = e.srcElement;
  let character = node.innerText;
  console.log(character);
  node.innerText = "";
  maxTime = maxTimeDefault;
  let findCharacter = document.getElementById(character);
  console.log(findCharacter);
  if (findCharacter != null) {
    let xFindCharacter = ansCompare.indexOf(character);
    compareData[xFindCharacter] = true; //chi co 1 ky tu la dung
    console.log(compareData);
    findCharacter.style.display = "block";
    console.log(findCharacter.nextElementSibling);
    findCharacter.nextElementSibling.style.display = "none";
    if (isGameFinished(compareData)) {
      console.log("end");
      clearInterval(interval);
      let nodeResult = document.createElement("p");
      nodeResult.setAttribute("id", "resultWords");
      nodeResult.innerHTML = "You win<br/>" + ansCompare;
      document.getElementById("result").prepend(nodeResult);
      document.getElementById("retry").style.display = "block";

      for (let i = 0; i < listAlphebetElement.length; i++) {
        listAlphebetElement[i].removeEventListener(
          "click",
          handleClickAlphabet
        );
      }
    }
  } else {
    ruleFail++;
    let x = getImageFailByRule(ruleFail);
    imgElement.src = x;
    if (ruleFail == maxFail) {
      ruleFail = 0;
      clearTimer();
      document.getElementById("retry").style.display = "block";
      let nodeResult = document.createElement("p");
      nodeResult.setAttribute("id", "resultWords");
      nodeResult.innerHTML = "You lose<br/> The answer is " + ansCompare;
      document.getElementById("result").prepend(nodeResult);
      for (let i = 0; i < listAlphebetElement.length; i++) {
        listAlphebetElement[i].removeEventListener(
          "click",
          handleClickAlphabet
        );
      }
    }
  }
}

function initGame() {
  let n = Math.floor(Math.random() * dataSet.length);
  let ansWord = dataSet[n];
  ansCompare = ansWord;
  renderAnswer(ansWord);
  renderAlphabet();
  initTimer();
  let imgHangmanDefault = getImageFailByRule(0);
  imgElement.src = imgHangmanDefault;
  ruleFail = 0;
}
function handleRetry() {
  handleClearData();
  initGame();
  document.getElementById("retry").style.display = "none";
  document.getElementById("resultWords").remove();
}
function handleClearData() {
  answerElement.innerHTML = "";
  tableAlphabetElement.innerHTML = "";
  clearTimer();
  compareData = [];
  ansCompare = "";
}
