import {Application} from "pixi.js";

export default class AppModel
{
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------

    //----------------------------------
    //  Public:
    //----------------------------------

    public app:Application | undefined;
    public assets:any;

    //----------------------------------
    //  Private:
    //----------------------------------

    private static _instance: AppModel = new AppModel();

    private _centerX:number = 0;
    private _centerY:number = 0;
    private _curOrientation:string = "landscape";
    private _isHD:boolean = false;
    private _practiceData:any;
    private _resolutionMultiplier:number = 1;
    private _screenHeight:number = 0;
    private _screenWidth:number = 0;
    private _stageHeight:number = 768;
    private _stageWidth:number = 1366;

    public get centerX():number
    {
        if(this._centerX == 0)
        {
            this._centerX = this.app!.screen.width/2;
        }
        return this._centerX;
    }

    public get centerY():number
    {
        if(this._centerY == 0)
        {
            this._centerY = this.app!.screen.height/2;
        }
        return this._centerY;
    }

    public get curOrientation():string
    {
        return this._curOrientation;
    }

    public set curOrientation(value:string)
    {
        this._curOrientation = value;
    }

    public get isHD():boolean
    {
        return this._isHD;
    }

    public set isHD(value:boolean)
    {
        this._isHD = value;
        if(this._isHD)
        {
            this._resolutionMultiplier = 2;
            this._screenHeight*=this._resolutionMultiplier;
            this._stageHeight*=this._resolutionMultiplier;
            this._stageWidth*=this._resolutionMultiplier;
        }
    }

    public get practiceData():any
    {
        return this._practiceData;
    }

    public set practiceData(value:any)
    {
        this._practiceData = value;
    }

    public get screenHeight():number
    {
        if(this._screenHeight == 0)
        {
            this._screenHeight = this.app!.screen.height;
        }
        return this._screenHeight;
    }

    public get screenWidth():number
    {
        if(this._screenWidth == 0)
        {
            this._screenWidth = this.app!.screen.width;
        }
        return this._screenWidth;
    }

    //--------------------------------------------------------------------------
    //
    //  Methods
    //
    //--------------------------------------------------------------------------

    //----------------------------------
    //  Public:
    //----------------------------------

    public static getInstance(): AppModel
    {
        return this._instance;
    }

}