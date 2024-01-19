import DisplayContainer from "../components/DisplayContainer.ts";
import { Sprite } from "pixi.js";

export default class Game extends DisplayContainer {
  private grid: Sprite;
  private Mark: Sprite;
  private logo_game: Sprite;
  private board: { quadrant: number; fill: boolean; player: string }[] = [
    { quadrant: 1, fill: false, player: "" },
    { quadrant: 2, fill: false, player: "" },
    { quadrant: 3, fill: false, player: "" },
    { quadrant: 4, fill: false, player: "" },
    { quadrant: 5, fill: false, player: "" },
    { quadrant: 6, fill: false, player: "" },
    { quadrant: 7, fill: false, player: "" },
    { quadrant: 8, fill: false, player: "" },
    { quadrant: 9, fill: false, player: "" },
  ];
  private turn: string = "x";
  constructor() {
    super();
  }

  private createTac() {
    this.grid = Sprite.from("grid");
    this.addChild(this.grid);
    this.grid.x = 300;
    this.grid.y = 150;
    this.grid.eventMode = "static";
    this.grid.cursor = "pointer";
    this.grid.on("pointerdown", (e) => {
      console.log(e.data.global.x, e.data.global.y);
      this.checkQuadrant(e.data.global.x, e.data.global.y);
    });
    // check for wins
    this.grid.on("pointerdown", () => {
      if (
        // rows
        (this.board[0].player === this.board[1].player &&
          this.board[1].player === this.board[2].player &&
          this.board[0].fill) ||
        (this.board[3].player === this.board[4].player &&
          this.board[4].player === this.board[5].player &&
          this.board[3].fill) ||
        (this.board[6].player === this.board[7].player &&
          this.board[7].player === this.board[8].player &&
          this.board[6].fill) ||
        // cols
        (this.board[0].player === this.board[3].player &&
          this.board[3].player === this.board[6].player &&
          this.board[0].fill) ||
        (this.board[1].player === this.board[4].player &&
          this.board[4].player === this.board[7].player &&
          this.board[1].fill) ||
        (this.board[2].player === this.board[5].player &&
          this.board[5].player === this.board[8].player &&
          this.board[2].fill) ||
        // diagonals
        (this.board[0].player === this.board[4].player &&
          this.board[4].player === this.board[8].player &&
          this.board[0].fill) ||
        (this.board[2].player === this.board[4].player &&
          this.board[4].player === this.board[6].player &&
          this.board[2].fill)
      ) {
        this.eventDispatcher.dispatchEvent(
          new CustomEvent("gameWinner", { detail: this.board[0].player })
        );
        this.grid.removeAllListeners();
        this.grid.cursor = "default";
      } else if (
        this.board[0].fill &&
        this.board[1].fill &&
        this.board[2].fill &&
        this.board[3].fill &&
        this.board[4].fill &&
        this.board[5].fill &&
        this.board[6].fill &&
        this.board[7].fill &&
        this.board[8].fill
      ) {
        this.eventDispatcher.dispatchEvent(new CustomEvent("gameTie"));
        this.grid.removeAllListeners();
        this.grid.cursor = "default";
      }
    });
    this.createLogo();
  }

  private;

  private checkQuadrant(x: number, y: number) {
    switch (true) {
      case x > 213 && x < 500 && y > 108.5 && y < 312 && !this.board[0].fill:
        this.createMark(375, 200, 0);
        break;
      case x > 510 && x < 740 && y > 108.5 && y < 312 && !this.board[1].fill:
        this.createMark(650, 200, 1);
        break;
      case x > 750 && x < 940 && y > 108.5 && y < 312 && !this.board[2].fill:
        this.createMark(925, 200, 2);
        break;
      case x > 213 && x < 500 && y > 322 && y < 500 && !this.board[3].fill:
        this.createMark(375, 425, 3);
        break;
      case x > 510 && x < 740 && y > 322 && y < 500 && !this.board[4].fill:
        this.createMark(650, 425, 4);
        break;
      case x > 750 && x < 940 && y > 322 && y < 500 && !this.board[5].fill:
        this.createMark(925, 425, 5);
        break;
      case x > 213 && x < 500 && y > 510 && y < 750 && !this.board[6].fill:
        this.createMark(375, 625, 6);
        break;
      case x > 510 && x < 740 && y > 510 && y < 750 && !this.board[7].fill:
        this.createMark(650, 625, 7);
        break;
      case x > 750 && x < 940 && y > 510 && y < 750 && !this.board[8].fill:
        this.createMark(925, 625, 8);
        break;
    }
  }

  private createMark(xCoord: number, yCoord: number, quadrant: number) {
    this.Mark = Sprite.from(`${this.turn}`);
    this.addChild(this.Mark);
    this.Mark.x = xCoord;
    this.Mark.y = yCoord;
    this.board[quadrant].fill = true;
    this.board[quadrant].player = this.turn;
    console.log(this.board);
    if (this.turn === "x") {
      this.turn = "o";
    } else {
      this.turn = "x";
    }
  }

  private createLogo() {
    this.logo_game = Sprite.from("logo_game");
    this.logo_game.x = 400;
    this.logo_game.y = 10;
    this.addChild(this.logo_game);
  }

  public override create(
    creationCompleteCallback?: Function,
    show = true
  ): void {
    // creates the game
    this.createTac();
    super.create();
  }

  public destroy() {
    super.destroy();
  }
}
