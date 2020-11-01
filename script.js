const canvas = document.querySelector('.gameCanvas')
const ctx = canvas.getContext('2d')
const canvasWidth = canvas.width
const canvasHeight = canvas.height


let gameObj;
let areas;
let walls;
let winds;
let groups;


localStorage.setItem('level-1', `{"id":1,"name":"start","groups":[{"id":1,"name":"1","x":10,"y":31,"w":811,"h":6989,"elements":[{"x":82,"y":70,"w":"1","h":"20","id":1,"hide":0,"active":0,"bern":[0,0,1,0],"thru":[0,0,0,0]},{"x":10,"y":31,"w":31,"h":1,"id":2,"hide":0,"active":0,"bern":[0,1,0,1],"thru":[0,0,0,0]}]},{"id":2,"elements":[{"x":79,"y":113,"w":11,"h":7,"id":5,"hide":0,"params":{"x":1,"y":0,"coup":0},"active":0,"color":"rgba(100,220,220, 0.3)"},{"x":90,"y":113,"w":10,"h":7,"id":6,"hide":0,"params":{"x":0,"y":0,"coup":1},"active":0,"color":"rgba(220,70,220, 0.3)"}],"x":79,"y":113,"w":21,"h":7,"name":"2"},{"id":3,"elements":[{"x":36,"y":67,"w":12,"h":1,"id":18,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":48,"y":67,"w":1,"h":15,"id":13,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":49,"y":81,"w":12,"h":1,"id":21,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":60,"y":82,"w":1,"h":14,"id":16,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":61,"y":95,"w":12,"h":1,"id":14,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]}],"x":36,"y":67,"w":37,"h":29,"name":"3"}],"areas":[{"x":25,"y":32,"w":15,"h":15,"id":1,"color":"rgba(100,70,220, 0.3)","params":{"coup":1,"x":1,"y":0},"active":0},{"x":30,"y":47,"w":5,"h":21,"id":3,"hide":0,"params":{"x":0,"y":1,"coup":0},"active":0,"color":"rgba(220,220,100, 0.3)"},{"x":9,"y":68,"w":21,"h":11,"id":4,"hide":0,"params":{"x":0,"y":0,"coup":1},"active":0,"color":"rgba(220,70,220, 0.3)"},{"x":79,"y":113,"w":11,"h":7,"id":5,"hide":0,"params":{"x":1,"y":0,"coup":0},"active":0,"color":"rgba(100,220,220, 0.3)"},{"x":90,"y":113,"w":10,"h":7,"id":6,"hide":0,"params":{"x":0,"y":0,"coup":1},"active":0,"color":"rgba(220,70,220, 0.3)"},{"x":91,"y":74,"w":9,"h":29,"id":7,"hide":0,"params":{"x":0,"y":1,"coup":0},"active":0,"color":"rgba(220,220,100, 0.3)"},{"x":91,"y":33,"w":9,"h":20,"id":8,"hide":0,"params":{"x":0,"y":0,"coup":1},"active":0,"color":"rgba(220,70,220, 0.3)"},{"x":91,"y":53,"w":9,"h":21,"id":9,"hide":0,"params":{"x":0,"y":1,"coup":1},"active":0,"color":"rgba(220,70,100, 0.3)"},{"x":2,"y":19,"w":5,"h":5,"id":10,"color":"rgba(100,70,220, 0.3)","params":{"coup":1,"x":1,"y":0},"hide":0,"active":0,"draggable":null}],"walls":[{"x":82,"y":70,"w":"1","h":"20","id":1,"hide":0,"active":0,"bern":[0,0,1,0],"thru":[0,0,0,0]},{"x":10,"y":31,"w":31,"h":1,"id":2,"hide":0,"active":0,"bern":[0,1,0,1],"thru":[0,0,0,0]},{"x":61,"y":103,"w":1,"h":10,"id":3,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[1,1,1,0]},{"x":9,"y":8,"w":1,"h":24,"id":4,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":35,"y":47,"w":1,"h":21,"id":5,"hide":0,"active":0,"bern":[0,1,1,0],"thru":[0,1,1,0]},{"x":9,"y":39,"w":1,"h":28,"id":6,"hide":0,"active":0,"bern":[1,0,0,1],"thru":[0,1,1,0]},{"x":10,"y":39,"w":15,"h":1,"id":7,"hide":0,"active":1,"bern":[0,0,1,1],"thru":[1,0,1,0]},{"x":40,"y":32,"w":1,"h":15,"id":8,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":9,"y":67,"w":20,"h":1,"id":9,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":24,"y":40,"w":1,"h":7,"id":10,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":95,"y":112,"w":5,"h":1,"id":11,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":36,"y":47,"w":5,"h":1,"id":12,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":48,"y":67,"w":1,"h":15,"id":13,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":61,"y":95,"w":12,"h":1,"id":14,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":41,"y":90,"w":1,"h":14,"id":15,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":60,"y":82,"w":1,"h":14,"id":16,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":9,"y":112,"w":77,"h":1,"id":17,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":36,"y":67,"w":12,"h":1,"id":18,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":0,"y":104,"w":52,"h":1,"id":19,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":85,"y":103,"w":1,"h":9,"id":20,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":49,"y":81,"w":12,"h":1,"id":21,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":29,"y":80,"w":1,"h":10,"id":22,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":29,"y":90,"w":12,"h":1,"id":23,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":0,"y":79,"w":30,"h":1,"id":24,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":29,"y":47,"w":1,"h":21,"id":25,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":74,"y":90,"w":9,"h":1,"id":26,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0],"draggable":null},{"x":24,"y":47,"w":5,"h":1,"id":27,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":90,"y":33,"w":1,"h":70,"id":28,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0],"draggable":null},{"x":73,"y":90,"w":1,"h":15,"id":29,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":85,"y":102,"w":5,"h":1,"id":30,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]}],"winds":[{"x":91,"y":33,"w":9,"h":70,"id":1,"color":"rgba(0,255,255,0.3)","params":{"X":1,"Y":1,"forse":1},"active":0,"draggable":null,"X":0,"Y":-1,"forse":2},{"x":74,"y":91,"w":16,"h":11,"id":2,"params":{"X":0,"Y":0,"forse":0},"color":"rgba(0,255,255,0.3)","active":0,"draggable":null}]}`)
const selectedLevel = JSON.parse(localStorage.getItem('level-1'))

const sizeSettings = {
    canvasWidth: 100,
    canvasHeight: 120,
    playerSize: 5,
}

const getXPixelRatio = canvas.width / sizeSettings.canvasWidth
const getYPixelRatio = canvas.height / sizeSettings.canvasHeight

const xCoordsToPixels = coords => coords * getXPixelRatio
const yCoordsToPixels = coords => coords * getYPixelRatio

const player = {
    w: xCoordsToPixels(sizeSettings.playerSize),
    h: yCoordsToPixels(sizeSettings.playerSize),
    x: 0,
    y: 0,
}

let girdDisplay = true
let moveHelper = {
    x: 0,
    y: 0,
    move: false
}

function renderGrid() {
    ctx.beginPath()
    ctx.strokeStyle = '#bdbdbd'
    ctx.lineWidth = 0.3
    for (let x = getXPixelRatio; x < canvasWidth; x += getXPixelRatio) ctx.strokeRect(x, 0, 0.1, canvasHeight)
    for (let y = getYPixelRatio; y < canvasHeight; y += getYPixelRatio) ctx.strokeRect(0, y, canvasWidth, 0.1)
    ctx.fill()
    ctx.closePath()
}

const loadLevels = () => {
    gameObj = JSON.parse(localStorage.getItem(`level-${selectedLevel.id}`))
    if (!gameObj) return
    walls = gameObj.walls.map((el) => (new WallObj(el)))
    areas = gameObj.areas
    winds = gameObj.winds
    groups = gameObj.groups
}

const drawElement = element => {
    ctx.save()
    let fillColor = '#fae'

    ctx.beginPath()
    ctx.rect(
        xCoordsToPixels(element.x),
        yCoordsToPixels(element.y),
        xCoordsToPixels(element.w),
        yCoordsToPixels(element.h)
    )

    ctx.fillStyle = element.color || 'black'

    ctx.fill()
    ctx.closePath()
    ctx.restore()
}

const drawPlayer = () => {
    ctx.save()
    ctx.fillStyle = "black";
    ctx.fillRect(player.x, player.y, player.w, player.h);
    ctx.restore()
}

function edge(c, min, max) {
    return Math.max(min, Math.min(max, c));
}

// returns true iff the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
function lineLineIntersects(a, b, c, d, p, q, r, s) {
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
    }
}

function intersectSquareWall(targetPos, currPos, square, wall) {
    const isSquareCantMove = lineLineIntersects(
        targetPos.x, targetPos.y,
        currPos.x, currPos.y,
        getXPixelRatio * wall.x, getXPixelRatio * wall.y,
        getYPixelRatio * (wall.x + wall.w), getYPixelRatio * (wall.y + wall.h)
    );

    const isTouchWall = !(
        getXPixelRatio * wall.x >= targetPos.x + square.w ||
        getXPixelRatio * (wall.x + wall.w) <= targetPos.x ||
        getYPixelRatio * wall.y >= targetPos.y + square.h ||
        getYPixelRatio * (wall.y + wall.h) <= targetPos.y
    );

    return isTouchWall || isSquareCantMove;
}



class WallObj {
    constructor(obj) {//x, y, w, h, bern ,thru) {
        this.x = obj.x
        this.y = obj.y
        this.w = obj.w
        this.h = obj.h
        this.bern = obj.bern
        this.thru = obj.thru
        this.hide = obj.hide
        this.id = obj.id
    }

    collusionWall(startPosition, endPosition) {
        var xS = startPosition[0]
        var x = endPosition[0]

        // console.log(xS - x < 0)
        if (xS - x > 0)
            if (x)
                // if wall behind point
                if (this.x < startPosition[0])
                    return endPosition;
                else if (this.x + this.w < x)
                    return endPosition

        return endPosition

        // return [this.x, endPosition[1]]
    }
}

function wallsCollusion(x, mass) {
    return x = Math.round(x < mass[0] || x > mass[1] - pointSiz ? x < mass[0] ? mass[0] : mass[1] - pointSiz : x);
}

function collusion(startPosition, endPosition,) {

    console.log(startPosition, endPosition, 'collusion');
    let x, y;
    let pN = startPosition
    let pK = endPosition

    walls.forEach((wall) => {
        x = wall.collusionWall(pN, pK)[0]
        y = wall.collusionWall(pN, pK)[1]
    })

    console.log("X:" + x + " Y:" + y);

    return screenWals(x, y)
}

function screenWals(x, y) {
    return [x, y]
}

function initEvents() {
    // handleMouseMove
    // Mouse events for computer
    canvas.addEventListener('mousedown', startHandler)
    canvas.addEventListener('mousemove', moveHandler)
    canvas.addEventListener('mouseup', endHandler)

    // Touch events for mobile
    canvas.addEventListener('touchstart', startHandler)
    canvas.addEventListener('touchmove', moveHandler)
    canvas.addEventListener('touchend', endHandler)
}

const rectPos = { x: 0, y: 0 };

function startHandler(e) {
    moveHelper.x = e.offsetX
    moveHelper.y = e.offsetY
    player.old = {
        x: player.x,
        y: player.y
    }
    moveHelper.move = true
    // player.

}
function moveHandler(e) {

    if (moveHelper.move) {
        // let x, y
        // x = player.old.x - start.x + e.offsetX
        // y = player.old.y - start.y + e.offsetY

        // console.log(player, moveHelper, e.offsetX, e.offsetY, 'MouseMove')
        // const position = collusion([player.x, player.y], [x, y])
        // player.x = position[0]
        // player.y = position[1]
        const targetPos = {
            x: getXPixelRatio * Math.round((rectPos.x + e.offsetX - moveHelper.x) / getXPixelRatio),
            y: getYPixelRatio * Math.round((rectPos.y + e.offsetY - moveHelper.y) / getYPixelRatio)
        }

        if (walls.some((wall) => intersectSquareWall(targetPos, player, player, wall))) {
            return;
        }

        player.x = edge(rectPos.x + e.offsetX - moveHelper.x, 0, canvas.width - player.w)
        player.y = edge(rectPos.y + e.offsetY - moveHelper.y, 0, canvas.height - player.h)

    }
    renderAll();
}
function endHandler(e) {
    rectPos.x = edge(rectPos.x + e.offsetX - moveHelper.x, 0, canvas.width - player.w);
    rectPos.y = edge(rectPos.y + e.offsetY - moveHelper.y, 0, canvas.height - player.h);
    moveHelper.move = false
}

const renderWalls = () => { walls.forEach(e => drawElement(e)) };
const renderAreas = () => { areas.forEach(e => drawElement(e)) }

const renderAll = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    if (girdDisplay) renderGrid()
    renderAreas()
    renderWalls()
    drawPlayer()
}

window.addEventListener("DOMContentLoaded", () => {
    loadLevels()
    renderAll()

    initEvents()
})

function gridEnable() {
    girdDisplay = this.checked
}