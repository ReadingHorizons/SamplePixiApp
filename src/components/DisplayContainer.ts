import {Container} from "pixi.js";
import ConjugationModel from "../models/AppModel.ts";
import AppModel from "../models/AppModel.ts";

export default class DisplayContainer extends Container implements IDisplayContainer
{
    //--------------------------------------------------------------------------
    //
    //  Properties
    //
    //--------------------------------------------------------------------------

    //----------------------------------
    //  Protected:
    //----------------------------------

    protected appModel:AppModel;
    protected eventDispatcher:EventTarget = new EventTarget();

    //--------------------------------------------------------------------------
    //
    //  Constructor
    //
    //--------------------------------------------------------------------------

    constructor()
    {
        super();
        this.name = "DisplayContainer"
        this.visible = false;
        this.appModel = ConjugationModel.getInstance();
    }

    //--------------------------------------------------------------------------
    //
    //  Methods
    //
    //--------------------------------------------------------------------------

    //----------------------------------
    //  Public:
    //----------------------------------

    public addEvtListener(type:string, listener:EventListenerOrEventListenerObject, options?:boolean | AddEventListenerOptions):void
    {
        this.eventDispatcher.addEventListener(type, listener, options);
    }

    public create(creationCompleteCallback?:Function, show=true):void
    {
        if(show)
        {
            this.show();
        }
        //console.log(`${this.name} created`);
    }

    public destroy():void
    {
        let curChild:any;
        const len = this.children.length;
        for(let i:number=0; i<len; i++)
        {
            curChild = this.getChildAt(i);
            if(curChild.removeAllListeners != undefined)
            {
                curChild.removeAllListeners();
            }
            if(curChild.removeChildren != undefined)
            {
                curChild.removeChildren();
            }
            curChild = null;
        }
        this.removeAllListeners();
        this.removeChildren();
        this.appModel = null;
        //console.log(`${this.name} destroyed`);
    }

    public hide():void
    {
        this.visible = false;
    }

    public removeEvtListener(type:string, listener:EventListenerOrEventListenerObject, options?:boolean | EventListenerOptions):void
    {
        this.eventDispatcher.removeEventListener(type, listener, options);
    }

    public show():void
    {
        this.visible = true;
    }
}