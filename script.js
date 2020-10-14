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
    x: 0,
    y: 0,
    start: null,

    edge(c, min, max) {
        return Math.max(min, Math.min(max, c));
    },

    drawRect(x = this.x, y = this.y) {
        game.ctx.fillStyle = "black";
        game.ctx.clearRect(0, 0, 500, 600);
        game.renderGrid()
        game.ctx.fillRect(x, y, this.width, this.height);
    },

    mouseEvent() {
        game.canvas.onmousedown = (e) => {
            this.start = { x: e.offsetX, y: e.offsetY };
            game.canvas.onmousemove = (e) => {
                this.drawRect(
                    this.edge(this.x + e.offsetX - this.start.x, 0, 500 - this.width),
                    this.edge(this.y + e.offsetY - this.start.y, 0, 600 - this.height)
                );
            }
            game.canvas.onmouseup = (e) => {
                if (game.gridCheckbox.checked) {
                    const new_x = game.squareWidth * Math.round((this.x + e.offsetX - this.start.x) / game.squareWidth);
                    const new_y = game.squareHeight * Math.round((this.y + e.offsetY - this.start.y) / game.squareHeight);
                    this.x = this.edge(new_x, 0, 500 - this.width);
                    this.y = this.edge(new_y, 0, 600 - this.height);
                    this.drawRect(
                        this.edge(this.x, 0, 500 - this.width),
                        this.edge(this.y, 0, 600 - this.height)
                    );
                } else {
                    this.x = this.edge(this.x + e.offsetX - this.start.x, 0, 500 - this.width);
                    this.y = this.edge(this.y + e.offsetY - this.start.y, 0, 600 - this.height);
                }
                game.canvas.onmousemove = null
            }
        }
    },
};

window.addEventListener("DOMContentLoaded", () => {
    game.start();
})
