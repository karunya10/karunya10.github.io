class Game {
  constructor(player1, player2, cards) {
    this.player1 = player1;
    this.player2 = player2;
    this.cards = cards;
    this.currentPlayer = player1.id;
    this.score = { [player1.id]: 0, [player2.id]: 0 };
    this.remainingTime = 14;
    this.oneFlip = false;
    this.intervalId;
    this.chosenCards = [];
  }
  startGame() {
    this.shuffleCards();
    this.updatePlayerNames();

    //Create (div-> image)
    const cardsContainer = document.querySelector("#cards-container");
    for (let i = 0; i < this.cards.length; i++) {
      const cardContainer = document.createElement("div");

      const imgElement = document.createElement("img");

      imgElement.src = CARDS + "/guess.png";

      cardContainer.appendChild(imgElement);
      cardsContainer.appendChild(cardContainer);

      imgElement.addEventListener("click", () => {
        this.flipCard(this.cards[i], imgElement);
      });
    }
  }
  flipCard(card, imgElement) {
    //Start the timer
    if (this.oneFlip === false) {
      this.startTimer();
    }
    //Update image of card
    imgElement.src = card.image;
    //set isFlipped to true
    card.isFlipped = true;
    this.chosenCards.push(card);
    if (this.oneFlip === true) {
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
          this.flipCardsBack();
          this.resetTimers();
          this.changeCurrentPlayer();
          this.chosenCards = [];
          this.oneFlip = false;
        }, 1000);
      }
    }
    this.oneFlip = !this.oneFlip;
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
  } // Learn how the algo works
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
      const time = document.querySelector("#time-left");
      time.innerText = this.remainingTime--;
      if (this.remainingTime < 0) {
        this.changeCurrentPlayer();
        this.oneFlip = false;

        this.resetTimers();
        this.flipCardsBack();
        clearInterval(this.intervalId);
      }
    }, 500);
  }
  resetTimers() {
    clearInterval(this.intervalId);
    const time = document.querySelector("#time-left");
    this.remainingTime = 15;
    time.innerText = this.remainingTime;
  }
  changeCurrentPlayer() {
    const player1Info = document.querySelector("#player1-info");
    const player2Info = document.querySelector("#player2-info");
    this.currentPlayer =
      this.currentPlayer === this.player1.id
        ? this.player2.id
        : this.player1.id;
    player1Info.classList.toggle("player-info-higlight");
    player2Info.classList.toggle("player-info-higlight");
  }
  updatePlayerNames() {
    const player1Element = document.querySelector("#player1-name");
    const player2Element = document.querySelector("#player2-name");

    player1Element.innerText = this.player1.name;
    player2Element.innerText = this.player2.name;
  }
  updateScore() {
    const currentPlayerId = this.currentPlayer;
    this.score[currentPlayerId] += 1;
    if (currentPlayerId === this.player1.id) {
      const player1ScoreElement = document.querySelector("#player1-score");
      player1ScoreElement.innerText = this.score[currentPlayerId];
    } else {
      const player2ScoreElement = document.querySelector("#player2-score");
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
  showEndScreen() {
    document.querySelector("#game-third-screen").style.display = "none";
    document.querySelector("#game-fourth-screen").style.display = "flex";

    document.body.style.backgroundImage = `url('${HAPPY}')`;
    const winner = document.querySelector("#winner");
    const loser = document.querySelector("#loser");
    this.launchConfetti();
    if (this.score[this.player1.id] > this.score[this.player2.id]) {
      winner.innerText = this.player1.name;
      loser.innerText = this.player2.name;
    } else if (this.score[this.player2.id] > this.score[this.player1.id]) {
      winner.innerText = this.player2.name;
      loser.innerText = this.player1.name;
    } else {
      document.querySelector(".winner").style.display = "none";
      document.querySelector(".loser").style.display = "none";
      document.querySelector("#tie-message").style.display = "block";
    }
    const resetBtn = document.querySelector("#reset-btn");
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
