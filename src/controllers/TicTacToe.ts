import { Application, Assets, Container, settings, Sprite } from "pixi.js";
import AppModel from "../models/AppModel.ts";
import Menu from "../scenes/Menu.ts";
import Game from "../scenes/Game.ts";

export default class TicTacToe {
  private ASSETS_PATH = "/assets";

  private _assetResolution: string;
  private app: Application | undefined;
  private menu: Menu;
  private game: Game;
  private model: AppModel;

  constructor(isHD: boolean = false) {
    this._init(isHD);
  }

  private _init(isHD: boolean): void {
    this.model = AppModel.getInstance();
    this.model.isHD = isHD;
  }

  private createApp(): void {
    if (this.model.isHD) {
      settings.RESOLUTION = 2;
    }
    const pixiAppConfig = {
      antialias: true,
      background: "#363636",
      width: 1366,
      height: 768,
      view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
    };
    this.app = new Application(pixiAppConfig);
    this.app.renderer.events.cursorStyles.hover = "pointer";
    this.model.app = this.app;

    this.preloadAssets().then(() => {
      //Create the menu
      this.createMenu();
    });
  }

  private createMenu(): void {
    this.menu = new Menu();
    this.menu.addEvtListener("gameStart", () => {
      console.log("game started");
      this.destroyMenu();
      this.createGame();
    });
    this.app.stage.addChild(this.menu);
    this.menu.create();
  }

  private createGame(): void {
    this.game = new Game();
    this.game.create();
    this.app.stage.addChild(this.game);
  }

  private destroyMenu(): void {
    this.menu.destroy();
  }

  private onLoadProgress = (progress: Number): void => {
    console.log("onLoadProgress: " + progress + "%");
  };

  private async preloadAssets(): Promise<void> {
    if (this.model.isHD) {
      this._assetResolution = "2x";
    } else {
      this._assetResolution = "1x";
    }
    const manifest = {
      bundles: [
        {
          name: "tic-tac-toe",
          assets: [
            {
              name: "bg_menu",
              srcs: `${this.ASSETS_PATH}/images/bg_menu@${this._assetResolution}.png`,
            },
            {
              name: "beginBtn",
              srcs: `${this.ASSETS_PATH}/images/beginBtn@${this._assetResolution}.png`,
            },
            {
              name: "logo_menu",
              srcs: `${this.ASSETS_PATH}/images/logo_menu@${this._assetResolution}.png`,
            },
            {
              name: "tac",
              srcs: `${this.ASSETS_PATH}/images/tac.png`,
            },
          ],
        },
      ],
    };
    await Assets.init({ manifest });
    this.model.assets = await Assets.loadBundle(
      "tic-tac-toe",
      this.onLoadProgress
    );
  }

  public create(): void {
    this.createApp();
  }

  public getStage(): Container {
    return this.app.stage;
  }
}
