const canvas = document.querySelector('.game-area__ctx')
const ctx = canvas.getContext('2d')

const gridCheckbox = document.querySelector('input[id=toggleGrid]')
let activeElement;
let gameObj;
let areas;
let walls;
let winds;
let groups;


localStorage.setItem('level-1', `{"id":1,"name":"start","groups":[{"id":1,"name":"1","x":10,"y":31,"w":811,"h":6989,"elements":[{"x":82,"y":70,"w":"1","h":"20","id":1,"hide":0,"active":0,"bern":[0,0,1,0],"thru":[0,0,0,0]},{"x":10,"y":31,"w":31,"h":1,"id":2,"hide":0,"active":0,"bern":[0,1,0,1],"thru":[0,0,0,0]}]},{"id":2,"elements":[{"x":79,"y":113,"w":11,"h":7,"id":5,"hide":0,"params":{"x":1,"y":0,"coup":0},"active":0,"color":"rgba(100,220,220, 0.3)"},{"x":90,"y":113,"w":10,"h":7,"id":6,"hide":0,"params":{"x":0,"y":0,"coup":1},"active":0,"color":"rgba(220,70,220, 0.3)"}],"x":79,"y":113,"w":21,"h":7,"name":"2"},{"id":3,"elements":[{"x":36,"y":67,"w":12,"h":1,"id":18,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":48,"y":67,"w":1,"h":15,"id":13,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":49,"y":81,"w":12,"h":1,"id":21,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":60,"y":82,"w":1,"h":14,"id":16,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":61,"y":95,"w":12,"h":1,"id":14,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]}],"x":36,"y":67,"w":37,"h":29,"name":"3"}],"areas":[{"x":25,"y":32,"w":15,"h":15,"id":1,"color":"rgba(100,70,220, 0.3)","params":{"coup":1,"x":1,"y":0},"active":0},{"x":30,"y":47,"w":5,"h":21,"id":3,"hide":0,"params":{"x":0,"y":1,"coup":0},"active":0,"color":"rgba(220,220,100, 0.3)"},{"x":9,"y":68,"w":21,"h":11,"id":4,"hide":0,"params":{"x":0,"y":0,"coup":1},"active":0,"color":"rgba(220,70,220, 0.3)"},{"x":79,"y":113,"w":11,"h":7,"id":5,"hide":0,"params":{"x":1,"y":0,"coup":0},"active":0,"color":"rgba(100,220,220, 0.3)"},{"x":90,"y":113,"w":10,"h":7,"id":6,"hide":0,"params":{"x":0,"y":0,"coup":1},"active":0,"color":"rgba(220,70,220, 0.3)"},{"x":91,"y":74,"w":9,"h":29,"id":7,"hide":0,"params":{"x":0,"y":1,"coup":0},"active":0,"color":"rgba(220,220,100, 0.3)"},{"x":91,"y":33,"w":9,"h":20,"id":8,"hide":0,"params":{"x":0,"y":0,"coup":1},"active":0,"color":"rgba(220,70,220, 0.3)"},{"x":91,"y":53,"w":9,"h":21,"id":9,"hide":0,"params":{"x":0,"y":1,"coup":1},"active":0,"color":"rgba(220,70,100, 0.3)"},{"x":2,"y":19,"w":5,"h":5,"id":10,"color":"rgba(100,70,220, 0.3)","params":{"coup":1,"x":1,"y":0},"hide":0,"active":0,"draggable":null}],"walls":[{"x":82,"y":70,"w":"1","h":"20","id":1,"hide":0,"active":0,"bern":[0,0,1,0],"thru":[0,0,0,0]},{"x":10,"y":31,"w":31,"h":1,"id":2,"hide":0,"active":0,"bern":[0,1,0,1],"thru":[0,0,0,0]},{"x":61,"y":103,"w":1,"h":10,"id":3,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[1,1,1,0]},{"x":9,"y":8,"w":1,"h":24,"id":4,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":35,"y":47,"w":1,"h":21,"id":5,"hide":0,"active":0,"bern":[0,1,1,0],"thru":[0,1,1,0]},{"x":9,"y":39,"w":1,"h":28,"id":6,"hide":0,"active":0,"bern":[1,0,0,1],"thru":[0,1,1,0]},{"x":10,"y":39,"w":15,"h":1,"id":7,"hide":0,"active":1,"bern":[0,0,1,1],"thru":[1,0,1,0]},{"x":40,"y":32,"w":1,"h":15,"id":8,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":9,"y":67,"w":20,"h":1,"id":9,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":24,"y":40,"w":1,"h":7,"id":10,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":95,"y":112,"w":5,"h":1,"id":11,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":36,"y":47,"w":5,"h":1,"id":12,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":48,"y":67,"w":1,"h":15,"id":13,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":61,"y":95,"w":12,"h":1,"id":14,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":41,"y":90,"w":1,"h":14,"id":15,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":60,"y":82,"w":1,"h":14,"id":16,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":9,"y":112,"w":77,"h":1,"id":17,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":36,"y":67,"w":12,"h":1,"id":18,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":0,"y":104,"w":52,"h":1,"id":19,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":85,"y":103,"w":1,"h":9,"id":20,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":49,"y":81,"w":12,"h":1,"id":21,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":29,"y":80,"w":1,"h":10,"id":22,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":29,"y":90,"w":12,"h":1,"id":23,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":0,"y":79,"w":30,"h":1,"id":24,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":29,"y":47,"w":1,"h":21,"id":25,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":74,"y":90,"w":9,"h":1,"id":26,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0],"draggable":null},{"x":24,"y":47,"w":5,"h":1,"id":27,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":90,"y":33,"w":1,"h":70,"id":28,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0],"draggable":null},{"x":73,"y":90,"w":1,"h":15,"id":29,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":85,"y":102,"w":5,"h":1,"id":30,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]}],"winds":[{"x":91,"y":33,"w":9,"h":70,"id":1,"color":"rgba(0,255,255,0.3)","params":{"X":1,"Y":1,"forse":1},"active":0,"draggable":null,"X":0,"Y":-1,"forse":2},{"x":74,"y":91,"w":16,"h":11,"id":2,"params":{"X":0,"Y":0,"forse":0},"color":"rgba(0,255,255,0.3)","active":0,"draggable":null}]}`)
const selectedLevel = JSON.parse(localStorage.getItem('level-1'))

const gridSettings = {
    squareWidth: 100,
    squareHeight: 120,
}

const square = {
    w: 25,
    h: 25
}

const w = canvas.width
const h = canvas.height

const getXPixelRatio = canvas.width / gridSettings.squareWidth
const getYPixelRatio = canvas.height / gridSettings.squareHeight

const xCoordsToPixels = coords => coords * getXPixelRatio
const yCoordsToPixels = coords => coords * getYPixelRatio


const renderGrid = () => {
    ctx.beginPath()
    ctx.strokeStyle = '#bdbdbd'
    ctx.lineWidth = 0.3
    for (let x = getXPixelRatio; x < w; x += getXPixelRatio) ctx.strokeRect(x, 0, 0.1, h)
    for (let y = getYPixelRatio; y < h; y += getYPixelRatio) ctx.strokeRect(0, y, w, 0.1)
    ctx.fill()
    ctx.closePath()
}

const loadLevels = () => {
    gameObj = JSON.parse(localStorage.getItem(`level-${selectedLevel.id}`))
    if (!gameObj) return
    walls = gameObj.walls
    areas = gameObj.areas
    winds = gameObj.winds
    groups = gameObj.groups
}

const drawElement = element => {
    let fillColor = '#2c8fdb'

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
}

const drawRect = (x = 0, y = 0, w = square.w, h = square.h) => {
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, w, h);
}

function edge(c, min, max) {
    return Math.max(min, Math.min(max, c));
}

const rectPos = { x: 0, y: 0 };
const currPos = { x: 0, y: 0 };
const start = { x: 0, y: 0 };

const handleMouseDown = (e) => {
    start.x = e.offsetX
    start.y = e.offsetY
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (e) => {
    currPos.x = getXPixelRatio * Math.round((rectPos.x + e.offsetX - start.x) / getXPixelRatio);
    currPos.y = getYPixelRatio * Math.round((rectPos.y + e.offsetY - start.y) / getYPixelRatio);
    currPos.x = edge(currPos.x, 0, w - 25);
    currPos.y = edge(currPos.y, 0, h - 25);
    renderAll()
    drawRect(currPos.x, currPos.y);
}

const handleMouseUp = (e) => {
    rectPos.x = currPos.x;
    rectPos.y = currPos.y;
    canvas.removeEventListener('mousemove', handleMouseMove)
    canvas.removeEventListener('mouseup', handleMouseUp)
}

const renderAreas = () => { areas.forEach(e => drawElement(e)) };
const renderWalls = () => { walls.forEach(e => drawElement(e)) };

const renderAll = () => {
    ctx.clearRect(0, 0, w, h)

    canvas.addEventListener('mousedown', handleMouseDown)


    if (gridCheckbox.checked) {
        renderGrid()
    }

    renderWalls()
    renderAreas()
}

window.addEventListener("DOMContentLoaded", () => {
    loadLevels()
    renderAll()
    drawRect()
})


