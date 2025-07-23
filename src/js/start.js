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

function renderGameLogic(difficulty) {
  HTMLElements.screens.playerSelectionScreen.style.display = "none";
  HTMLElements.screens.gameLogicScreen.style.display = "flex";

  document.body.style.backgroundImage = `url("${TRAIN}")`;

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
