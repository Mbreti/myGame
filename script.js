let game = {
    canvas: null,
    ctx: null,
    squat: null,
    blocks: [],
    walls: null,
    gridSettings: {
        squareWidth: 100,
        squareHeight: 120,
    },
    init() {
        this.canvas = document.querySelector("#canvas");
        this.ctx = canvas.getContext("2d");
    },
    // run() {
    //     window.requestAnimationFrame(() => {
    //         this.render();
    //     });
    // },

    render() {
        this.squat.drawRect();
        this.squat.mouseEvent();
        this.squat.collide(this.walls)
        this.walls.createWalls();
        this.renderGrid();
    },
    start() {
        this.init();
        this.render();
    },
    renderGrid() {
        this.ctx.beginPath()
        const w = this.canvas.width
        const h = this.canvas.height
        const squareWidth = w / this.gridSettings.squareWidth
        const squareHeight = h / this.gridSettings.squareHeight
        this.ctx.strokeStyle = '#bdbdbd'
        this.ctx.lineWidth = 0.1
        for (var x = squareWidth; x < w; x += squareWidth) this.ctx.strokeRect(x, 0, 0.1, h)
        for (var y = squareHeight; y < h; y += squareHeight) this.ctx.strokeRect(0, y, w, 0.1)
        this.ctx.fill()
        this.ctx.closePath()
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
        // game.ctx.clearRect(0, 0, 600, 500);
        game.ctx.fillRect(x, y, this.width, this.height);
    },
    mouseEvent() {
        game.canvas.onmousedown = (e) => {
            this.start = { x: e.offsetX, y: e.offsetY };
            game.canvas.onmousemove = (e) => {
                this.drawRect(
                    this.edge(this.x + e.offsetX - this.start.x, 0, 600 - this.width),
                    this.edge(this.y + e.offsetY - this.start.y, 0, 500 - this.height)
                );
            }
            game.canvas.onmouseup = (e) => {
                this.x = this.edge(this.x + e.offsetX - this.start.x, 0, 600 - this.width);
                this.y = this.edge(this.y + e.offsetY - this.start.y, 0, 500 - this.height);
                game.canvas.onmousemove = null
            }
        }
        return this.x, this.y
    },
    collide(element) {
        console.log(this.x, this.y,)
        if (
            this.x + this.width > element.x &&
            this.x < element.x + element.width &&
            this.y + this.height > element.y &&
            this.y < element.y + element.height
        ) {
            console.log("ss")
        }
    }
};

game.walls = {
    width: 100,
    height: 20,
    x: 50,
    y: 10,
    createWalls() {
        game.ctx.fillStyle = "red";
        game.ctx.fillRect(this.x, this.y, this.width, this.height)
    }
};

window.addEventListener("DOMContentLoaded", () => {
    game.start();
})
