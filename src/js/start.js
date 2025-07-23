import { Card } from "./Card.js";
import { Player } from "./Player.js";
import { Game } from "./Game.js";
import {
  SALMON_AUDIO,
  DUSTMITES,
  TRAIN,
  CARDS,
  HTMLElements,
  EIGHT_CARDS,
  TWELVE_CARDS,
  SIX_COLUMNS,
  FOUR_COLUMNS,
} from "./constants.js";

window.onload = function () {
  addAudio();
  renderPlayerSelection();
  addFormValidation();

  const easyButton = HTMLElements.buttons.easyBtn;
  easyButton.addEventListener("click", () => renderGameLogic("easy"));

  const mediumButton = HTMLElements.buttons.hardBtn;
  mediumButton.addEventListener("click", () => renderGameLogic("hard"));
};

function addAudio() {
  const sound = HTMLElements.audio;
  sound.addEventListener("click", toggleMusic);
  const music = new Audio(SALMON_AUDIO);
  music.loop = true;
  let isPlaying = false;
  function toggleMusic() {
    if (isPlaying === false) {
      music.play();
      sound.src = "../assets/images/icons/volume.png";
      isPlaying = true;
    } else {
      music.pause();
      sound.src = "../assets/images/icons/mute.png";
      music.currentTime = 0;
      isPlaying = false;
    }
  }
}

function renderPlayerSelection() {
  const startButton = HTMLElements.buttons.startBtn;
  startButton.addEventListener("click", showSecondScreen);
  function showSecondScreen() {
    HTMLElements.screens.gameIntoScreen.style.display = "none";
    HTMLElements.screens.playerSelectionScreen.style.display = "flex";
    document.body.style.backgroundImage = `url("${DUSTMITES}")`;
  }
}

function addFormValidation() {
  const name1Input = document.querySelector("#player1");
  const error1Text = document.querySelector("#name1-error");
  const name2Input = document.querySelector("#player2");
  const error2Text = document.querySelector("#name2-error");

  name1Input.addEventListener("input", () => {
    nameCheck(name1Input, error1Text);
    toggleDifficulty();
  });
  name2Input.addEventListener("input", () => {
    nameCheck(name2Input, error2Text);
    toggleDifficulty();
  });

  function nameCheck(nameInput, errorText) {
    const nameValue = nameInput.value.trim();
    const namePattern = /^[A-Za-z ]+$/;
    if (nameValue === "") {
      errorText.textContent = "Name is required.";
    } else if (!namePattern.test(nameValue)) {
      errorText.textContent = "Only letters and spaces are allowed.";
    } else {
      errorText.textContent = "";
    }
  }

  function toggleDifficulty() {
    if (
      error1Text.textContent === "" &&
      error2Text.textContent === "" &&
      name1Input.value.trim() !== "" &&
      name2Input.value.trim() !== ""
    ) {
      HTMLElements.buttons.easyBtn.disabled = false;
      HTMLElements.buttons.hardBtn.disabled = false;
    } else {
      HTMLElements.buttons.easyBtn.disabled = true;
      HTMLElements.buttons.hardBtn.disabled = true;
    }
  }
}

function renderGameLogic(difficulty) {
  HTMLElements.screens.playerSelectionScreen.style.display = "none";
  HTMLElements.screens.gameLogicScreen.style.display = "flex";

  document.body.style.backgroundImage = `url("${TRAIN}")`;

  //Create Players
  const [player1, player2] = createPlayers();

  let noOfCards = difficulty === "easy" ? EIGHT_CARDS : TWELVE_CARDS;

  //manipulating the grid to accomodate increasing number of cards
  const grid = HTMLElements.cardsContainer;
  const columns = noOfCards === EIGHT_CARDS ? FOUR_COLUMNS : SIX_COLUMNS;
  grid.style.gridTemplateColumns = `repeat(${columns}, 200px)`;

  const cards = createCards(noOfCards);

  //Create Game Object
  let game = new Game(player1, player2, cards);

  //Start the game
  game.startGame();
}

function createPlayers() {
  // Get Playernames from second screen
  let player1Name = HTMLElements.players.player1InputField.value; //Value will be filled in automatically as user enters
  let player2Name = HTMLElements.players.player2InputField.value;

  //Create Player Objects
  let player1 = new Player(player1Name);
  let player2 = new Player(player2Name);
  return [player1, player2];
}

function createCards(noOfCards) {
  //Create Cards Object
  let cards = [];

  //Create 4 or 6 cards
  for (let i = 0; i < noOfCards / 2; i++) {
    const id = `c${i}`;
    let card = new Card(id, CARDS + `/${i}.png`);
    cards.push(card);
  }
  // Duplicate cards
  return [...cards, ...cards];
}
