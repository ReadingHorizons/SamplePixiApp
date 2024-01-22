import { Application, Assets, Container, settings, Sprite } from "pixi.js";
import AppModel from "../models/AppModel.ts";
import Menu from "../scenes/Menu.ts";
import Game from "../scenes/Game.ts";
import Winner from "../scenes/Winner.ts";

export default class TicTacToe {
  private ASSETS_PATH = "/assets";

  private _assetResolution: string;
  private app: Application | undefined;
  private menu: Menu;
  private game: Game;
  private winner: Winner;
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
    this.game.addEvtListener("gameTie", () => {
      console.log("game tie");
      this.destroyGame();
      this.createGame();
    });

    this.game.addEvtListener("gameWinner", (event: CustomEvent) => {
      console.log("game won", event.detail);
      this.createWinner();
    });

    this.app.stage.addChild(this.game);
    this.game.create();
  }

  private createWinner(): void {
    this.winner = new Winner();
    this.app.stage.addChild(this.winner);
    this.winner.create();
    this.winner.addEvtListener("restartGame", () => {
      console.log("restart game");
      this.destroyGame();
      this.destroyWinner();
      this.createGame();
    });
  }

  private destroyMenu(): void {
    this.menu.destroy();
  }

  private destroyGame(): void {
    this.game.destroy();
  }

  private destroyWinner(): void {
    this.winner.destroy();
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
              name: "grid",
              srcs: `${this.ASSETS_PATH}/images/grid@${this._assetResolution}.png`,
            },
            {
              name: "o",
              srcs: `${this.ASSETS_PATH}/images/o@${this._assetResolution}.png`,
            },
            {
              name: "x",
              srcs: `${this.ASSETS_PATH}/images/x@${this._assetResolution}.png`,
            },
            {
              name: "logo_game",
              srcs: `${this.ASSETS_PATH}/images/logo_game@${this._assetResolution}.png`,
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
