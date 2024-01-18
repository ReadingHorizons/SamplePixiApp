import DisplayContainer from "../components/DisplayContainer.ts";
import { Sprite } from "pixi.js";

export default class Game extends DisplayContainer {
  private tac: Sprite;
  isDestroyed = false;
  constructor() {
    super();
  }

  private createTac() {
    this.tac = Sprite.from("tac");
    this.addChild(this.tac);
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
