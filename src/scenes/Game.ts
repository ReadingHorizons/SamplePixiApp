import DisplayContainer from "../components/DisplayContainer.ts";
import { Sprite } from "pixi.js";

export default class Game extends DisplayContainer {
  private grid: Sprite;
  // private Mark: Sprite;
  private Mark: { xSprite: Sprite; oSprite: Sprite; quadrant: number };
  private logo_game: Sprite;
  private board: {
    quadrant: number;
    fill: boolean;
    player: string;
    coordinates: { x: number; y: number };
  }[] = [
    { quadrant: 1, fill: false, player: "", coordinates: { x: 375, y: 200 } },
    { quadrant: 2, fill: false, player: "", coordinates: { x: 650, y: 200 } },
    { quadrant: 3, fill: false, player: "", coordinates: { x: 950, y: 200 } },
    { quadrant: 4, fill: false, player: "", coordinates: { x: 375, y: 425 } },
    { quadrant: 5, fill: false, player: "", coordinates: { x: 650, y: 425 } },
    { quadrant: 6, fill: false, player: "", coordinates: { x: 950, y: 425 } },
    { quadrant: 7, fill: false, player: "", coordinates: { x: 375, y: 650 } },
    { quadrant: 8, fill: false, player: "", coordinates: { x: 650, y: 650 } },
    { quadrant: 9, fill: false, player: "", coordinates: { x: 950, y: 650 } },
  ];
  private turn: string = "x";
  constructor() {
    super();
  }

  private createTac() {
    this.grid = Sprite.from("grid");
    this.addChild(this.grid);
    this.grid.anchor.set(0.5);
    this.grid.x = this.width - 100;
    this.grid.y = this.height / 2 + 150;
    this.grid.eventMode = "static";
    this.grid.cursor = "pointer";
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
          new CustomEvent("gameWinner", { detail: this.turn })
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
  }

  private scoreMark(quadrant: number) {
    this.board[quadrant].fill = true;
    this.board[quadrant].player = this.turn;
    console.log(this.board);
    if (this.turn === "x") {
      this.turn = "o";
    } else {
      this.turn = "x";
    }
  }

  private createMark() {
    for (let i = 0; i < 9; i++) {
      this.Mark = {
        xSprite: Sprite.from("x"),
        oSprite: Sprite.from("o"),
        quadrant: i,
      };
      this.addChild(this.Mark.xSprite);
      this.addChild(this.Mark.oSprite);
      this.Mark.xSprite.x = this.board[i].coordinates.x;
      this.Mark.xSprite.y = this.board[i].coordinates.y;
      this.Mark.oSprite.x = this.board[i].coordinates.x;
      this.Mark.oSprite.y = this.board[i].coordinates.y;
      this.Mark.xSprite.eventMode = "static";
      this.Mark.oSprite.eventMode = "static";
      this.Mark.xSprite.cursor = "pointer";
      this.Mark.oSprite.cursor = "pointer";
      this.Mark.xSprite.visible = false;
      this.Mark.oSprite.visible = false;
      this.Mark.xSprite.addEventListener("click", () => {
        this.scoreMark(this.Mark.quadrant);
        this.Mark.xSprite.visible = true;
      });
      this.Mark.oSprite.addEventListener("pointerdown", () => {
        this.scoreMark(this.Mark.quadrant);
        this.Mark.oSprite.visible = true;
      });
    }
  }

  private createLogo() {
    this.logo_game = Sprite.from("logo_game");
    this.logo_game.x = this.width / 2;
    this.logo_game.y = 10;
    this.addChild(this.logo_game);
  }

  public override create(
    creationCompleteCallback?: Function,
    show = true
  ): void {
    // creates the game
    this.createTac();
    this.createLogo();
    this.createMark();
    super.create();
  }

  public destroy() {
    super.destroy();
  }
}
