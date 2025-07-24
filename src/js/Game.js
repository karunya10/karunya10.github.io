import { HAPPY, CARDS, HTMLElements, FIFTEEN_SECONDS } from "./constants.js";

export class Game {
  constructor(player1, player2, cards) {
    this.player1 = player1;
    this.player2 = player2;
    this.cards = cards;
    this.currentPlayer = player1.id;
    this.score = { [player1.id]: 0, [player2.id]: 0 };
    this.remainingTime = FIFTEEN_SECONDS;
    this.firstClick = false;
    this.intervalId;
    this.chosenCards = [];
  }
  startGame() {
    this.shuffleCards();
    this.updatePlayerNames();

    //Create (div container)
    const cardsContainer = HTMLElements.cardsContainer;

    for (let i = 0; i < this.cards.length; i++) {
      const card = this.cards[i];

      // construct div->img
      const cardContainer = document.createElement("div");
      const imgElement = document.createElement("img");
      imgElement.src = CARDS + "/guess.png";

      cardContainer.appendChild(imgElement);
      cardsContainer.appendChild(cardContainer);

      imgElement.addEventListener("click", () => {
        this.flipCardLogic(card, imgElement);
      });
    }
  }
  flipCardLogic(card, imgElement) {
    //Start the timer
    if (this.chosenCards.length === 2) {
      return;
    }
    if (this.firstClick === false) {
      this.startTimer();
    }
    //Update image of card
    imgElement.src = card.image;

    this.chosenCards.push(card);
    if (this.firstClick === true) {
      const result = this.compareCards();
      if (result) {
        this.updateScore();
        if (this.isGameOver()) {
          this.showEndScreen();
          return;
        }
        this.keepCardsVisible();
        this.resetTimers();
        this.chosenCards = [];
      } else {
        setTimeout(() => {
          this.resetCardsGameLogic();
        }, 1000);
      }
    }
    this.firstClick = !this.firstClick;
  }
  flipCardsBack() {
    this.chosenCards.forEach((card) => {
      // img[src = "./images/cards/0.png"]
      const imgElement = document.querySelector(`img[src = "${card.image}"]`); // attribute selector
      imgElement.src = CARDS + "/guess.png";
    });
  }
  compareCards() {
    if (this.chosenCards[0].id === this.chosenCards[1].id) {
      return true;
    }
    return false;
  }
  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // swap
    }
  }
  keepCardsVisible() {
    const card1 = this.chosenCards[0];
    const cardElements = document.querySelectorAll(
      `img[src = "${card1.image}"]`
    );
    cardElements.forEach((element) => {
      element.classList.add("disabled-img");
    });
  }
  startTimer() {
    this.intervalId = setInterval(() => {
      // const time = HTMLElements.timeLeft;
      const { timeLeft: time } = HTMLElements;
      time.innerText = this.remainingTime--;
      if (this.remainingTime < 0) {
        this.resetCardsGameLogic();
        clearInterval(this.intervalId);
      }
    }, 500);
  }
  resetTimers() {
    clearInterval(this.intervalId);
    // const time = HTMLElements.timeLeft;
    const { timeLeft: time } = HTMLElements;
    this.remainingTime = FIFTEEN_SECONDS;
    time.innerText = this.remainingTime;
  }
  changeCurrentPlayer() {
    // const player1Info = HTMLElements.players.player1Info;
    // const player2Info = HTMLElements.players.player2Info;
    const { player1Info, player2Info } = HTMLElements.players;
    this.currentPlayer =
      this.currentPlayer === this.player1.id
        ? this.player2.id
        : this.player1.id;
    player1Info.classList.toggle("player-info-higlight");
    player2Info.classList.toggle("player-info-higlight");
  }
  updatePlayerNames() {
    // const player1Element = HTMLElements.players.player1Name;
    // const player2Element = HTMLElements.players.player2Name;
    const { player1Name: player1Element, player2Name: player2Element } =
      HTMLElements.players;

    player1Element.innerText = this.player1.name;
    player2Element.innerText = this.player2.name;
  }
  updateScore() {
    const currentPlayerId = this.currentPlayer;
    this.score[currentPlayerId] += 1;
    if (currentPlayerId === this.player1.id) {
      // const player1ScoreElement = HTMLElements.players.player1Score;
      const { player1Score: player1ScoreElement } = HTMLElements.players;
      player1ScoreElement.innerText = this.score[currentPlayerId];
    } else {
      // const player2ScoreElement = HTMLElements.players.player2Score;
      const { player2Score: player2ScoreElement } = HTMLElements.players;
      player2ScoreElement.innerText = this.score[currentPlayerId];
    }
  }
  isGameOver() {
    if (
      this.score[this.player1.id] + this.score[this.player2.id] ===
      this.cards.length / 2
    ) {
      return true;
    }
    return false;
  }
  resetCardsGameLogic() {
    this.changeCurrentPlayer();
    this.firstClick = false;
    this.resetTimers();
    this.flipCardsBack();
    this.chosenCards = [];
  }
  showEndScreen() {
    HTMLElements.screens.gameLogicScreen.style.display = "none";
    HTMLElements.screens.gameEndScreen.style.display = "flex";

    document.body.style.backgroundImage = `url('${HAPPY}')`;
    // const winner = HTMLElements.winnerName;
    // const loser = HTMLElements.loserName;
    const { winnerName: winner } = HTMLElements;
    const { loserName: loser } = HTMLElements;
    this.launchConfetti();
    if (this.score[this.player1.id] > this.score[this.player2.id]) {
      winner.innerText = this.player1.name;
      loser.innerText = this.player2.name;
    } else if (this.score[this.player2.id] > this.score[this.player1.id]) {
      winner.innerText = this.player2.name;
      loser.innerText = this.player1.name;
    } else {
      HTMLElements.winnerTxt.style.display = "none";
      HTMLElements.loserTxt.style.display = "none";
      HTMLElements.tieMsg.style.display = "block";
    }
    const resetBtn = HTMLElements.buttons.resetBtn;
    resetBtn.addEventListener("click", () => {
      document.location.reload();
    });
  }
  launchConfetti() {
    confetti({
      particleCount: 500,
      spread: 200,
      origin: { y: 0.3 },
    });
  }
}
