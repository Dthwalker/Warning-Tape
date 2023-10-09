class WarningTape {

    constructor() {
        this.blocks   = document.querySelectorAll('.wt');
        this.canvases = [];
        this.colors   = { yellow: '#F6B51F',
                          black : '#0A0A0A', }

        this.addCanvas();
        addEventListener('resize', () => {
            this.canvasResize();
        })
    }

    addStyle(block, cnv, div) {
        block.style.display = 'grid';
        cnv.style.cssText = `grid-column: 1;
                             grid-row: 1;
                             background: ${this.colors.yellow};
                             align-self: center;
                             width: 100%`

        div.style.cssText = `grid-column: 1;
                             grid-row: 1;
                             height: min-content;
                             background: ${this.colors.black};
                             color: ${this.colors.yellow};
                             align-self: center;
                             border: 2px solid ${this.colors.yellow};
                             justify-self: center;
                             text-align: center;
                             padding: .5em`
    }

    addCanvas() {
        this.blocks.forEach(block => {
            let text = block.innerHTML;
            let cnv = document.createElement('canvas');
            let inner = document.createElement('span');
            inner.innerHTML = text;

            block.innerHTML = '';
            block.style.display = 'grid';
            block.append(cnv, inner);
            this.addStyle(block, cnv, inner);
            this.canvases.push({cnv:cnv, ctx:cnv.getContext('2d')});
        });
        this.canvasResize()
    }

    canvasResize() {
        this.canvases.forEach(el => {
            let txt = el.cnv.nextElementSibling
            let par = el.cnv.parentElement
            let p = txt.getBoundingClientRect();
            let pp = par.getBoundingClientRect();
            let a = par.className.match(/wtm-\d*/ig);
            let m = a ? a[0].replace(/\D/ig, '') : null;
            let margin = m ? Number(m) : 0;
            el.w = el.cnv.width  = pp.width;
            el.h = el.cnv.height = p.height + margin * 2;
        });
        this.draw()
    }

    draw() {
        this.canvases.forEach(el => {
            el.ctx.clearRect(0,0,el.w,el.h)
            let lineWidth = el.h / 2;
            el.ctx.fillStyle = this.colors.black;
            for (let i = -lineWidth; i < el.w + lineWidth; i += lineWidth*2) {
                el.ctx.beginPath();
                el.ctx.moveTo(i, el.h);
                el.ctx.lineTo(i + lineWidth * 2, 0);
                el.ctx.lineTo(i + lineWidth * 3, 0);
                el.ctx.lineTo(i + lineWidth, el.h);
                el.ctx.closePath();
                el.ctx.fill();
            }
        })
    }

}

let wT = new WarningTape();