import DisplayContainer from "../components/DisplayContainer.ts";
import {Sprite} from "pixi.js";

export default class Menu extends DisplayContainer
{
    private bg:Sprite
    constructor() {
        super();
    }

    private createBackground() {
        this.bg = Sprite.from("bg_menu");
        this.addChild(this.bg);
    }

    public create(creationCompleteCallback?:Function, show=true):void {

        super.create();
    }

    public destroy() {

        super.destroy();
    }
}