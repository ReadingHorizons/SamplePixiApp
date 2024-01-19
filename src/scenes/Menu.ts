import DisplayContainer from "../components/DisplayContainer.ts";
import { Sprite } from "pixi.js";

export default class Menu extends DisplayContainer {
  private bg: Sprite;
  private button: Sprite;
  private menu: Sprite;
  constructor() {
    super();
  }

  private createBackground() {
    this.bg = Sprite.from("bg_menu");
    this.addChild(this.bg);
  }

  private createButton() {
    this.button = Sprite.from("beginBtn");
    this.button.x = 575;
    this.button.y = 415;
    this.addChild(this.button);
    this.button.eventMode = "static";
    this.button.cursor = "pointer";

    this.button.on("pointerdown", () => {
      this.eventDispatcher.dispatchEvent(new CustomEvent("gameStart"));
    });
  }

  private createMenu() {
    this.menu = Sprite.from("logo_menu");
    this.menu.x = 350;
    this.menu.y = 230;
    this.addChild(this.menu);
  }

  public override create(
    creationCompleteCallback?: Function,
    show = true
  ): void {
    // creates the background
    this.createBackground();
    this.createButton();
    this.createMenu();
    super.create();
  }

  public destroy() {
    super.destroy();
  }
}
