import {Application, Assets, Container, settings} from "pixi.js";
import AppModel from "../models/AppModel.ts";
import Menu from "../scenes/Menu.ts";

export default class TicTacToe
{
    private ASSETS_PATH = "/assets";

    private _assetResolution:string;
    private app:Application | undefined;
    private menu:Menu;
    private model:AppModel;

    constructor(isHD:boolean = false)
    {
        this._init(isHD);
    }

    private _init(isHD:boolean):void
    {
        this.model = AppModel.getInstance();
        this.model.isHD = isHD;
    }

    private createApp():void
    {
        if(this.model.isHD)
        {
            settings.RESOLUTION = 2;
        }
        const pixiAppConfig = {
            antialias: true,
            background: '#363636',
            width: 1366,
            height: 768,
            view: document.getElementById('pixi-canvas') as HTMLCanvasElement
        };
        this.app = new Application(pixiAppConfig);
        this.app.renderer.events.cursorStyles.hover = "pointer";
        this.model.app = this.app;

        this.preloadAssets().then(() => {
            //Create the menu

        });
    }

    private createMenu():void
    {

    }

    private onLoadProgress = (progress:Number):void =>
    {
        console.log("onLoadProgress: "+progress+"%");
    }

    private async preloadAssets():Promise<void>
    {
        if(this.model.isHD)
        {
            this._assetResolution = "2x";
        }
        else
        {
            this._assetResolution = "1x";
        }
        const manifest = {
            bundles: [
                {
                    name: "tic-tac-toe",
                    assets: [
                        {
                            name: "bg_menu",
                            srcs: `${this.ASSETS_PATH}/images/bg_menu@${this._assetResolution}.png`
                        }
                    ],
                }
            ]
        };
        await Assets.init({ manifest });
        this.model.assets = await Assets.loadBundle('tic-tac-toe', this.onLoadProgress);
    }

    public create():void
    {
        this.createApp();
    }

    public getStage():Container
    {
        return this.app.stage;
    }

}