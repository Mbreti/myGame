let game = {
    gridSettings: {
        squaresHorizontal: 100,
        squaresVertical: 120,
    },
    canvas: null,
    ctx: null,
    squat: null,
    walls: null,
    w: null,
    h: null,
    squareWidth: null,
    squareHeight: null,
    gridCheckbox: null,

    init() {
        this.canvas = document.querySelector("#canvas");
        this.ctx = canvas.getContext("2d");

        this.w = canvas.width
        this.h = canvas.height
        this.squareWidth = this.w / this.gridSettings.squaresHorizontal
        this.squareHeight = this.h / this.gridSettings.squaresVertical

        this.gridCheckbox = document.querySelector('input[id=toggleGrid]')
    },

    render() {
        this.squat.drawRect();
        this.squat.mouseEvent();
    },

    start() {
        this.init();
        this.render();
    },

    renderGrid() {
        if (this.gridCheckbox.checked) {
            this.ctx.beginPath()
            this.ctx.strokeStyle = '#bdbdbd'
            this.ctx.lineWidth = 0.4
            for (let x = this.squareWidth; x < this.w; x += this.squareWidth) this.ctx.strokeRect(x, 0, 0.1, this.h)
            for (let y = this.squareHeight; y < this.h; y += this.squareHeight) this.ctx.strokeRect(0, y, this.w, 0.1)
            this.ctx.fill()
            this.ctx.closePath()
        }
        return false
    }

};


game.squat = {
    height: 25,
    width: 25,
    rectPos: {
        x: 0,
        y: 0,
    },
    currPos: {
        x: 0,
        y: 0,
    },
    start: null,

    edge(c, min, max) {
        return Math.max(min, Math.min(max, c));
    },

    drawRect(x = this.rectPos.x, y = this.rectPos.y) {
        game.ctx.fillStyle = "black";
        game.ctx.clearRect(0, 0, 500, 600);
        game.renderGrid()
        game.ctx.fillRect(x, y, this.width, this.height);
    },

    mouseEvent() {
        game.canvas.onmousedown = (e) => {
            this.start = { x: e.offsetX, y: e.offsetY };
            game.canvas.onmousemove = (e) => {
                this.currPos.x = game.squareWidth * Math.round((this.rectPos.x + e.offsetX - this.start.x) / game.squareWidth);
                this.currPos.y = game.squareHeight * Math.round((this.rectPos.y + e.offsetY - this.start.y) / game.squareHeight);
                this.currPos.x = this.edge(this.currPos.x, 0, 500 - 34);
                this.currPos.y = this.edge(this.currPos.y, 0, 600 - 40);

                this.drawRect(this.currPos.x, this.currPos.y);
            }
            game.canvas.onmouseup = (e) => {
                this.rectPos.x = this.currPos.x;
                this.rectPos.y = this.currPos.y;
                game.canvas.onmousemove = null
            }
        }
    },
};

window.addEventListener("DOMContentLoaded", () => {
    game.start();
})
