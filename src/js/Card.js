import { CARDS, HTMLElements } from "./constants.js";
export class Card {
  constructor(id, image) {
    this.id = id;
    this.image = image;
    this.isFlipped = false;
  }
  render(flipCardCallback) {
    const cardContainer = document.createElement("div");
    const imgElement = document.createElement("img");
    imgElement.src = CARDS + "/guess.png";
    cardContainer.appendChild(imgElement);

    flipCardCallback(this, imgElement);

    return cardContainer;
  }

  flipCard(imgElement) {
    if (this.isFlipped === false) {
      imgElement.src = this.image;
      this.isFlipped = true;
    } else {
      imgElement.src = CARDS + "/guess.png";
      this.isFlipped = false;
    }
  }
}
