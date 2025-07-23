const ASSETS = "../assets";
const BACKGROUND = ASSETS + "/images/background";

const CAT = BACKGROUND + "/cat.png";

export const DUSTMITES = BACKGROUND + "/dustMites.png";

export const HAPPY = BACKGROUND + "/happy.png";

export const TRAIN = BACKGROUND + "/train.png";

export const CARDS = ASSETS + "/images/cards";

export const SALMON_AUDIO = ASSETS + "/audio/SalmonLikeTheFish.mp3";

export const HTMLElements = {
  cardsContainer: document.querySelector("#cards-container"),
  timeLeft: document.querySelector("#time-left"),
  players: {
    player1Info: document.querySelector("#player1-info"),
    player2Info: document.querySelector("#player2-info"),
    player1Name: document.querySelector("#player1-name"),
    player2Name: document.querySelector("#player2-name"),
    player1Score: document.querySelector("#player1-score"),
    player2Score: document.querySelector("#player2-score"),
    player1InputField: document.querySelector("#player1"),
    player2InputField: document.querySelector("#player2"),
  },
  screens: {
    gameLogicScreen: document.querySelector("#game-third-screen"),
    gameEndScreen: document.querySelector("#game-fourth-screen"),
    playerSelectionScreen: document.querySelector("#game-second-screen"),
    gameIntoScreen: document.querySelector("#game-intro"),
  },
  buttons: {
    resetBtn: document.querySelector("#reset-btn"),
    easyBtn: document.querySelector("#easy"),
    hardBtn: document.querySelector("#hard"),
    startBtn: document.querySelector("#start-button"),
  },
  winnerName: document.querySelector("#winner"),
  loserName: document.querySelector("#loser"),
  winnerTxt: document.querySelector(".winner"),
  loserTxt: document.querySelector(".loser"),
  tieMsg: document.querySelector("#tie-message"),
  audio: document.querySelector("#playSound"),
};

export const EIGHT_CARDS = 8;
export const TWELVE_CARDS = 12;
export const FOUR_COLUMNS = 4;
export const SIX_COLUMNS = 6;

export const FIFTEEN_SECONDS = 15;
