import TicTacToe from "./controllers/TicTacToe.ts";

let app:TicTacToe;
let iOS:boolean;
let defaultWidth = 1366;
let defaultHeight = 768;
let isHD = false;
let stage;

document.addEventListener('DOMContentLoaded', function ():void
{
    iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    defaultWidth = 1366;
    defaultHeight = 768;
    if(window.innerWidth > defaultWidth && window.innerHeight > defaultHeight)
    {
        isHD = true;
    }
    createApp(isHD);
    window.addEventListener('resize', handleResize, false);
    resize();
});

function createApp(isHD:boolean):void
{
    app = new TicTacToe(isHD);
    app.create();
    stage = app.getStage();
}

function handleResize()
{
    resize();
}

function resize()
{
    let curWindowWidth = screen.width < window.innerWidth && !iOS ? screen.width : window.innerWidth;
    let curWindowHeight = screen.height < window.innerHeight && !iOS ? screen.height : window.innerHeight;
    let desiredWidth = (isHD) ? defaultWidth*2 : defaultWidth;
    let desiredHeight = (isHD) ? defaultHeight*2 : defaultHeight;
    let headerAndFooterHeightTotal = 0;
    let padding = 0;
    let targetHeight = defaultHeight;
    let targetScale = 1;
    let targetWidth = defaultWidth
    let usableHeight = curWindowHeight - headerAndFooterHeightTotal - padding;
    let usableWidth = curWindowWidth - padding;

    targetScale = usableWidth / desiredWidth;

    if(targetScale > 1)
    {
        targetScale = 1;
    }
    if(targetScale <= 0)
    {
        targetScale = .001;
    }
    stage.scaleX = stage.scaleY = targetScale;
    targetHeight = desiredHeight * targetScale;
    if(targetHeight > usableHeight)
    {
        targetScale = usableHeight / desiredHeight;
    }

    if(targetScale > 1)
    {
        targetScale = 1;
    }
    if(targetScale <= 0)
    {
        targetScale = .001;
    }
    targetWidth = desiredWidth * targetScale;
    targetHeight = desiredHeight * targetScale;
    document.getElementById("pixi-canvas").setAttribute("width", targetWidth.toString());
    document.getElementById("pixi-canvas").setAttribute("height", targetHeight.toString());
    stage.scale.set(targetScale);
}
