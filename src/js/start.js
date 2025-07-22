window.onload = function () {
  const sound = document.querySelector("#playSound");
  sound.addEventListener("click", toggleMusic);
  const music = new Audio(SALMON_AUDIO);
  music.loop = true;
  let isPlaying = false;
  function toggleMusic() {
    if (isPlaying === false) {
      music.play();
      isPlaying = true;
    } else {
      music.pause();
      music.currentTime = 0;
      isPlaying = false;
    }
  }

  const startButton = document.querySelector("#start-button");
  startButton.addEventListener("click", showSecondScreen);
  function showSecondScreen() {
    document.querySelector("#game-intro").style.display = "none";
    document.querySelector("#game-second-screen").style.display = "flex";
    document.body.style.backgroundImage = `url("${DUSTMITES}")`;
  }

  const easyButton = document.querySelector("#easy");
  easyButton.addEventListener("click", () => showThirdScreen("easy"));

  const mediumButton = document.querySelector("#hard");
  mediumButton.addEventListener("click", () => showThirdScreen("hard"));

  //Function to show third scren
  function showThirdScreen(difficulty) {
    document.querySelector("#game-second-screen").style.display = "none";
    document.querySelector("#game-third-screen").style.display = "flex";

    document.body.style.backgroundImage = `url("${TRAIN}")`;

    // Get Playernames from second screen
    let player1Name = document.querySelector("#player1").value; //Value will be filled in automatically as user enters
    let player2Name = document.querySelector("#player2").value;

    //Create Player Objects
    let player1 = new Player(player1Name);
    let player2 = new Player(player2Name);

    let noOfCards = difficulty === "easy" ? 8 : 12;

    //manipulating the grid to accomodate increasing number of cards
    const grid = document.querySelector("#cards-container");
    const columns = noOfCards === 8 ? 4 : 6;
    grid.style.gridTemplateColumns = `repeat(${columns}, 200px)`;

    //Create Cards Object
    let cards = [];

    //Create 4 or 6 cards
    for (let i = 0; i < noOfCards / 2; i++) {
      const id = `c${i}`;
      let card = new Card(id, CARDS + `/${i}.png`);
      cards.push(card);
    }
    // Duplicate cards
    cards = [...cards, ...cards];

    //Create Game Object
    let game = new Game(player1, player2, cards);

    //Start the game
    game.startGame();
  }
};
