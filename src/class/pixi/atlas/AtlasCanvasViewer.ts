/**
 * BaseTexture 의 canvas 에 drawing이 잘 되는지 확인하기 위한 debug 클라스.
 */

let style = (viewerHeight:number)=>{return `<style>
    .atlas-canvas-container {
        position: absolute;
        width: 100%;
        pointer-events: none;
        display: none;
    }
    .atlas-canvas {
        width: auto; height: ${viewerHeight}px; float: right; border: 1px solid red;
    }
</style>`;
};

let dom = `<div class='atlas-canvas-container'></div>`;

declare let $:any;
export class AtlasCanvasViewer {

    private $style:any;
    private $container:any;
    private attached:boolean;

    constructor(viewerHeight:number=200) {
        this.$style = $(style(viewerHeight));
        this.$container = $(dom);
    }

    private attachToBody() {
        if(this.attached) return;
        this.attached = true;
        setTimeout(()=>{
            this.$container.click(function(){return false;});
            $("head").append(this.$style);
            $("body").append(this.$container);
        }, 500);
    }

    add(c:HTMLCanvasElement) {
        var isCanvas = c instanceof HTMLCanvasElement;
        if(!isCanvas) return;
        this.attachToBody();
        var cc = $(c);
        this.$container.append(cc);
        cc.addClass("atlas-canvas");
    }

    removeCanvas(c:HTMLCanvasElement) {
        if(!c) return;
        $(c).remove();
    }

    empty() {
        this.$container.empty();
    }

    toggleVisible() {
        this.$container.toggle();
    }
}