import DisplayContainer from "../components/DisplayContainer.ts";
import { Sprite, Text, Graphics } from "pixi.js";

export default class Winner extends DisplayContainer {
  private bg: Graphics;
  private winner: Text;
  private btn: Sprite;
  constructor() {
    super();
  }

  private createButton() {
    this.btn = Sprite.from("beginBtn");
    this.btn.x = 575;
    this.btn.y = 415;
    this.addChild(this.btn);
    this.btn.eventMode = "static";
    this.btn.cursor = "pointer";

    this.btn.on("pointerdown", () => {
      this.eventDispatcher.dispatchEvent(new CustomEvent("restartGame"));
      console.log("clicked button");
    });
  }

  private createBackground() {
    this.bg = new Graphics();
    this.bg.beginFill(0xffffff);
    this.bg.drawRect(0, 0, 800, 200);
    this.bg.endFill();
    this.bg.x = 550;
    this.bg.y = 230;
    this.addChild(this.bg);
  }

  private createWinner() {
    this.winner = new Text(`Winner`, {
      fontFamily: "Arial",
      fontSize: 150,
      fill: 0x9d00db,
      align: "center",
    });
    this.winner.x = 550;
    this.winner.y = 230;
    this.addChild(this.winner);
  }

  public override create(
    creationCompleteCallback?: Function,
    show = true
  ): void {
    this.createBackground();
    this.createWinner();
    this.createButton();
    super.create();
  }

  public destroy() {
    super.destroy();
  }
}
