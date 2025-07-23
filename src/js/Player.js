export class Player {
  constructor(name) {
    this.name = name;
    this.id = Math.floor(Math.random() * 99);
  }
}
