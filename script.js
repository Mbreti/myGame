const canvas = document.querySelector('.game-area__ctx')
const ctx = canvas.getContext('2d')
const panelWalls = document.querySelector('.game-panel-walls')
const panelAreas = document.querySelector('.game-panel-areas')
const panelWinds = document.querySelector('.game-panel-winds')
const panelLevels = document.querySelector('.game-panel-levels')
const panelGroups = document.querySelector('.game-panel-groups')
const gridCheckbox = document.querySelector('input[id=toggleGrid]')
const hideWallsCheckbox = document.querySelector('input[id=hideWalls]')
const hideAreasCheckbox = document.querySelector('input[id=hideAreas]')
const hideWindsCheckbox = document.querySelector('input[id=hideWinds]')
const showAllElementsCheckbox = document.querySelector('input[id=showAllElements]')
const switchTabCheckbox = document.querySelector('input[id=switchTab]')
const bumpElementCheckbox = document.querySelector('input[id=bumpElement]')
let selectedPanelItem = null
let selectedPanelTab = null
let selectedElements = null
let draggableElement;
let activeElement;
let gameObj;
let areas;
let walls;
let winds;
let groups;

const gridSettings = {
    squareWidth: 100,
    squareHeight: 120,
}

const w = canvas.width
const h = canvas.height
const squareWidth = w / gridSettings.squareWidth
const squareHeight = h / gridSettings.squareHeight



localStorage.setItem('level-1', `{"id":1,"name":"start","groups":[{"id":1,"name":"1","x":10,"y":31,"w":811,"h":6989,"elements":[{"x":82,"y":70,"w":"1","h":"20","id":1,"hide":0,"active":0,"bern":[0,0,1,0],"thru":[0,0,0,0]},{"x":10,"y":31,"w":31,"h":1,"id":2,"hide":0,"active":0,"bern":[0,1,0,1],"thru":[0,0,0,0]}]},{"id":2,"elements":[{"x":79,"y":113,"w":11,"h":7,"id":5,"hide":0,"params":{"x":1,"y":0,"coup":0},"active":0,"color":"rgba(100,220,220, 0.3)"},{"x":90,"y":113,"w":10,"h":7,"id":6,"hide":0,"params":{"x":0,"y":0,"coup":1},"active":0,"color":"rgba(220,70,220, 0.3)"}],"x":79,"y":113,"w":21,"h":7,"name":"2"},{"id":3,"elements":[{"x":36,"y":67,"w":12,"h":1,"id":18,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":48,"y":67,"w":1,"h":15,"id":13,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":49,"y":81,"w":12,"h":1,"id":21,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":60,"y":82,"w":1,"h":14,"id":16,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":61,"y":95,"w":12,"h":1,"id":14,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]}],"x":36,"y":67,"w":37,"h":29,"name":"3"}],"areas":[{"x":25,"y":32,"w":15,"h":15,"id":1,"color":"rgba(100,70,220, 0.3)","params":{"coup":1,"x":1,"y":0},"active":0},{"x":30,"y":47,"w":5,"h":21,"id":3,"hide":0,"params":{"x":0,"y":1,"coup":0},"active":0,"color":"rgba(220,220,100, 0.3)"},{"x":9,"y":68,"w":21,"h":11,"id":4,"hide":0,"params":{"x":0,"y":0,"coup":1},"active":0,"color":"rgba(220,70,220, 0.3)"},{"x":79,"y":113,"w":11,"h":7,"id":5,"hide":0,"params":{"x":1,"y":0,"coup":0},"active":0,"color":"rgba(100,220,220, 0.3)"},{"x":90,"y":113,"w":10,"h":7,"id":6,"hide":0,"params":{"x":0,"y":0,"coup":1},"active":0,"color":"rgba(220,70,220, 0.3)"},{"x":91,"y":74,"w":9,"h":29,"id":7,"hide":0,"params":{"x":0,"y":1,"coup":0},"active":0,"color":"rgba(220,220,100, 0.3)"},{"x":91,"y":33,"w":9,"h":20,"id":8,"hide":0,"params":{"x":0,"y":0,"coup":1},"active":0,"color":"rgba(220,70,220, 0.3)"},{"x":91,"y":53,"w":9,"h":21,"id":9,"hide":0,"params":{"x":0,"y":1,"coup":1},"active":0,"color":"rgba(220,70,100, 0.3)"},{"x":2,"y":19,"w":5,"h":5,"id":10,"color":"rgba(100,70,220, 0.3)","params":{"coup":1,"x":1,"y":0},"hide":0,"active":0,"draggable":null}],"walls":[{"x":82,"y":70,"w":"1","h":"20","id":1,"hide":0,"active":0,"bern":[0,0,1,0],"thru":[0,0,0,0]},{"x":10,"y":31,"w":31,"h":1,"id":2,"hide":0,"active":0,"bern":[0,1,0,1],"thru":[0,0,0,0]},{"x":61,"y":103,"w":1,"h":10,"id":3,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[1,1,1,0]},{"x":9,"y":8,"w":1,"h":24,"id":4,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":35,"y":47,"w":1,"h":21,"id":5,"hide":0,"active":0,"bern":[0,1,1,0],"thru":[0,1,1,0]},{"x":9,"y":39,"w":1,"h":28,"id":6,"hide":0,"active":0,"bern":[1,0,0,1],"thru":[0,1,1,0]},{"x":10,"y":39,"w":15,"h":1,"id":7,"hide":0,"active":1,"bern":[0,0,1,1],"thru":[1,0,1,0]},{"x":40,"y":32,"w":1,"h":15,"id":8,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":9,"y":67,"w":20,"h":1,"id":9,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":24,"y":40,"w":1,"h":7,"id":10,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":95,"y":112,"w":5,"h":1,"id":11,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":36,"y":47,"w":5,"h":1,"id":12,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":48,"y":67,"w":1,"h":15,"id":13,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":61,"y":95,"w":12,"h":1,"id":14,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":41,"y":90,"w":1,"h":14,"id":15,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":60,"y":82,"w":1,"h":14,"id":16,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":9,"y":112,"w":77,"h":1,"id":17,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":36,"y":67,"w":12,"h":1,"id":18,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":0,"y":104,"w":52,"h":1,"id":19,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":85,"y":103,"w":1,"h":9,"id":20,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":49,"y":81,"w":12,"h":1,"id":21,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":29,"y":80,"w":1,"h":10,"id":22,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":29,"y":90,"w":12,"h":1,"id":23,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":0,"y":79,"w":30,"h":1,"id":24,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":29,"y":47,"w":1,"h":21,"id":25,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":74,"y":90,"w":9,"h":1,"id":26,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0],"draggable":null},{"x":24,"y":47,"w":5,"h":1,"id":27,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":90,"y":33,"w":1,"h":70,"id":28,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0],"draggable":null},{"x":73,"y":90,"w":1,"h":15,"id":29,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":85,"y":102,"w":5,"h":1,"id":30,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]}],"winds":[{"x":91,"y":33,"w":9,"h":70,"id":1,"color":"rgba(0,255,255,0.3)","params":{"X":1,"Y":1,"forse":1},"active":0,"draggable":null,"X":0,"Y":-1,"forse":2},{"x":74,"y":91,"w":16,"h":11,"id":2,"params":{"X":0,"Y":0,"forse":0},"color":"rgba(0,255,255,0.3)","active":0,"draggable":null}]}`)
const selectedLevel = JSON.parse(localStorage.getItem('level-1'))

const getElementById = id => selectedElements.find(el => el.id === id)
const getWallById = id => walls.find(el => el.id === id)
const getXPixelRatio = canvas.width / gridSettings.squareWidth
const getYPixelRatio = canvas.height / gridSettings.squareHeight
const xCoordsToPixels = coords => coords * getXPixelRatio
const yCoordsToPixels = coords => coords * getYPixelRatio
const canvasWidthInSquares = gridSettings.squareWidth
const canvasHeightInSquares = gridSettings.squareHeight
const clearAllPanels = () => {
    [...document.querySelectorAll(`.game-panel-item`)].forEach(e => e.remove());
}
const generateElementId = () => {
    let id = 1
    while (selectedElements.find(e => e.id === id))
        id += 1
    return id
}
const generateLevelId = () => {
    let level = 1
    while (localStorage.getItem('level-' + level)) {
        level += 1
    }
    return level
}
/*END OF HELP FUNCTIONS */

const deleteElementOnGroups = elementId => {
    const element = getElementById(elementId)
    groups.forEach(g => {
        const index = g.elements.indexOf(element)
        if (index >= 0) {
            g.elements.splice(index, 1)
        }
    })
}

const toggleElementOnGroup = (select, elementId) => {
    const element = getElementById(elementId)
    deleteElementOnGroups(elementId)
    if (select.value !== '') {
        const selectedGroup = groups.find(g => g.id === +select.value)
        selectedGroup.elements.push(element)
    }
    clearAllPanels()
    renderAll()
}

const hideElement = (e, elementId) => {
    e.classList.toggle('active')
    const element = selectedElements.find(element => element.id === elementId)
    element.hide = !element.hide
    renderAll()
}

const copyElement = elementId => {

    const copiedElement = selectedElements.filter(element => element.id === elementId)
    let element;

    element = {
        ...copiedElement[0],
        id: generateElementId()
    }

    if (selectedElements === winds || selectedElements === areas) {
        element = {
            ...copiedElement[0],
            params: { ...copiedElement[0].params },
            id: generateElementId()
        }
    }

    if (selectedElements === groups) {
        let newObj = JSON.parse(JSON.stringify(element));
        selectedElements.push(newObj)
    }

    selectedElements.push(element)
    renderAll()
}

const deleteElement = elementId => {
    const index = selectedElements.findIndex(element => element.id === elementId)
    selectedElements.splice(index, 1)
    document.querySelector(`#${selectedPanelTab}-${elementId}`).remove()
    renderAll()
}


const setSelectedTab = e => {
    if (e.id === 'settings') {
        selectedElements = null
        selectedPanelTab = null
    }
    else if (e.id === 'walls') {
        selectedElements = walls
        selectedPanelTab = 'wall'
    }
    else if (e.id === 'areas') {
        selectedElements = areas
        selectedPanelTab = 'area'
    }
    else if (e.id === 'winds') {
        selectedElements = winds
        selectedPanelTab = 'wind'
    }
    else if (e.id === 'levels') {
        selectedPanelTab = 'level'
        selectedElements = null
    }
    else if (e.id === 'groups') {
        selectedElements = groups
        selectedPanelTab = 'group'
    }
}


const updateWallPanel = element => {
    if (!selectedElements) return
    const panelElement = document.querySelector(`#wall-${element.id}`)
    for (let prop in element) {
        if (panelElement.querySelector(`input[name=${prop}]`)) {
            panelElement.querySelector(`input[name=${prop}]`).value = element[prop]
        }
    }
}

const setSelectedPanelItem = e => {
    if (e === null) {
        selectedPanelItem.classList.remove('active')
        selectedPanelItem = null
        return
    }
    if (selectedPanelItem) {
        selectedPanelItem.classList.remove('active')
    }
    if (activeElement) {
        selectedPanelItem = document.querySelector(`#${selectedPanelTab}-${activeElement.id}`)
        selectedPanelItem.classList.add('active')
    }
}

const removeSelectedItem = () => {
    activeElement = null
    renderAll()
}

const setSelectedElement = e => {
    activeElement = selectedElements.find(element =>
        e.id === `${selectedPanelTab}-${element.id}`
    )
    setSelectedPanelItem(e)
    renderAll()
}

const addWallToPanel = wall => {
    if (document.querySelector(`#wall-${wall.id}`)) return
    panelWalls.insertAdjacentHTML('beforeend',
        `<div 
        class="game-panel-walls__item game-panel-item"
        id="wall-${wall.id}"
        onmousedown="setSelectedElement(this)"
    >
        <div class="game-panel-item__coords">
            <span>x:</span>
            <input name="x" oninput="elementChange(this)" value="${wall.x}">
            <span>y:</span>
            <input name="y" oninput="elementChange(this)" value="${wall.y}">
        </div>
        <div class="game-panel-item__size">
            <span>width:</span>
            <input oninput="elementChange(this)" name="w" value="${wall.w}">
            <span>height:</span>
            <input oninput="elementChange(this)" name="h" value="${wall.h}">
        </div>
        <div class="game-item-panel__params">
            <span>Group:</span>
            <select name="group-select" onChange="toggleElementOnGroup(this, ${wall.id})">
            <option></option>
                ${groups.map(g =>
            `<option ${g.elements.includes(wall) ? 'selected' : ''}>${g.id}</option>`)
        }
            </select>
        </div>
        <button class="game-panel-item__copy" onClick="copyElement(${wall.id})">Copy</button>
        <button class="game-panel-item__bern">
            bern
            <div class="game-panel-item__bern-settings">
                <span class="${wall.bern[0] ? 'active' : ''}" id="bern" onClick="toggleWallSettings(this, ${wall.id}, 0)">↑</span>
                <div>
                    <span class="${wall.bern[1] ? 'active' : ''}" id="bern" onClick="toggleWallSettings(this, ${wall.id}, 1)">←</span>
                    <span class="${wall.bern[2] ? 'active' : ''}" id="bern" onClick="toggleWallSettings(this, ${wall.id}, 2)">→</span>
                </div>
                <span class="${wall.bern[3] ? 'active' : ''}" id="bern" onClick="toggleWallSettings(this, ${wall.id}, 3)">↓</span>
            </div>
        </button>
        <button class="game-panel-item__thru">
            thru
            <div class="game-panel-item__thru-settings">
                <span class="${wall.thru[0] ? 'active' : ''}" id="thru" onClick="toggleWallSettings(this, ${wall.id}, 0)">↑</span>
                <div>
                    <span class="${wall.thru[1] ? 'active' : ''}" id="thru" onClick="toggleWallSettings(this, ${wall.id}, 1)">←</span>
                    <span class="${wall.thru[2] ? 'active' : ''}" id="thru" onClick="toggleWallSettings(this, ${wall.id}, 2)">→</span>
                </div>
                <span class="${wall.thru[3] ? 'active' : ''}" id="thru" onClick="toggleWallSettings(this, ${wall.id}, 3)">↓</span>
            </div>
        </button>
        <button class="game-panel-item__hide" onClick="hideElement(this, ${wall.id})">
            Toggle hide
        </button>
        <button class="game-panel-item__delete" onClick="deleteElement(${wall.id})">
            Delete
        </button>
    </div>`
    )
}

const toggleWallSettings = (el, wallId, paramIndex) => {
    el.classList.toggle('active')
    const wall = getWallById(wallId)
    wall[el.id][paramIndex] = Number(!wall[el.id][paramIndex])
    renderAll()
}

const drawWallSides = wall => {
    let x = xCoordsToPixels(wall.x),
        y = yCoordsToPixels(wall.y),
        w = xCoordsToPixels(wall.w),
        h = yCoordsToPixels(wall.h),
        bernWidth = 4
    thruWidth = 2

    ctx.beginPath()
    if (wall.bern[0]) {
        ctx.rect(x, y - bernWidth / 2, w, bernWidth);
    }

    if (wall.bern[1]) {
        ctx.rect(x - bernWidth / 2, y, bernWidth, h);
    }

    if (wall.bern[2]) {
        ctx.rect(x + w - bernWidth / 2, y, bernWidth, h);
    }

    if (wall.bern[3]) {
        ctx.rect(x, y + h - bernWidth / 2, w, bernWidth);
    }

    ctx.fillStyle = '#ffc012';
    ctx.fill()
    ctx.closePath()

    ctx.beginPath()

    if (wall.thru[0]) {
        ctx.rect(x, y - 1, w, thruWidth)
    }

    if (wall.thru[1]) {
        ctx.rect(x - 1, y, thruWidth, h);
    }

    if (wall.thru[2]) {
        ctx.rect(x + w - 1, y, thruWidth, h);
    }

    if (wall.thru[3]) {
        ctx.rect(x, y + h - 1, w, thruWidth);
    }

    ctx.fillStyle = "#a6aaad"
    ctx.fill()
    ctx.closePath()

}

const renderGrid = () => {
    ctx.beginPath()
    const w = canvas.width
    const h = canvas.height
    const squareWidth = w / gridSettings.squareWidth
    const squareHeight = h / gridSettings.squareHeight
    ctx.strokeStyle = '#bdbdbd'
    ctx.lineWidth = 0.3
    for (var x = squareWidth; x < w; x += squareWidth) ctx.strokeRect(x, 0, 0.1, h)
    for (var y = squareHeight; y < h; y += squareHeight) ctx.strokeRect(0, y, w, 0.1)
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

    renderAll()
}

const drawElement = element => {
    let fillColor = '#2c8fdb'
    if (!showAllElementsCheckbox.checked) {
        if (element.hide) return
    }
    ctx.beginPath()
    ctx.rect(
        xCoordsToPixels(element.x),
        yCoordsToPixels(element.y),
        xCoordsToPixels(element.w),
        yCoordsToPixels(element.h)
    )
    //не стена
    if (element === activeElement && element.color) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3
        ctx.stroke();
    }
    ctx.fillStyle = element.color || 'black'
    //стена
    if (element === activeElement && !element.color) {
        ctx.fillStyle = fillColor
    }
    ctx.fill()
    ctx.closePath()
}


function drawRect(x = 0, y = 0) {
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, 25, 25);
}

function edge(c, min, max) {
    return Math.max(min, Math.min(max, c));
}

const rectPos = { x: 0, y: 0 };
const currPos = { x: 0, y: 0 };

function mouseEvent() {
    canvas.onmousedown = (e) => {
        const start = { x: e.offsetX, y: e.offsetY };
        canvas.onmousemove = (e) => {
            currPos.x = squareWidth * Math.round((rectPos.x + e.offsetX - start.x) / squareWidth);
            currPos.y = squareHeight * Math.round((rectPos.y + e.offsetY - start.y) / squareHeight);
            currPos.x = edge(currPos.x, 0, 500 - 25);
            currPos.y = edge(currPos.y, 0, 600 - 25);

            renderAll()
            drawRect(currPos.x, currPos.y);
        }
        document.onmouseup = (e) => {
            rectPos.x = currPos.x;
            rectPos.y = currPos.y;
            canvas.onmousemove = null
        }
    }
}

//Очистка + загрузка ареи

const renderAll = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //сохранение каждого изменения
    mouseEvent()
    if (gridCheckbox.checked) {
        renderGrid()
    }


    if (!hideWallsCheckbox.checked) {
        walls.forEach(e => {
            addWallToPanel(e)
            updateWallPanel(e)
            drawElement(e)
            drawWallSides(e)
        }
        )
    }
}

loadLevels()
renderAll()
drawRect()

const elementChange = e => {
    activeElement[e.name] = e.value
    renderAll()
}

const createWall = () => {
    const element = {
        x: canvasHeightInSquares / 2,
        y: canvasWidthInSquares / 2,
        w: 1,
        h: 15,
        id: generateElementId(),
        bern: [0, 0, 0, 0],
        thru: [0, 0, 0, 0]
    }
    selectedElements.push(element)
    renderAll()
}


function takeDraggableElement(e) {
    xStartFoDrug = e.clientX - canvas.offsetTop;
    yStartFoDrug = e.clientY - canvas.offsetLeft;

    removeSelectedItem()

    let elements = selectedElements

    if (switchTabCheckbox.checked)
        elements = [...walls, ...areas, ...winds]

    if (!elements) return

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].hide)
            continue
        const elXStart = xCoordsToPixels(elements[i].x) - window.pageXOffset
        const elXEnd = elXStart + xCoordsToPixels(elements[i].w)
        const elYStart = yCoordsToPixels(elements[i].y) - window.pageYOffset
        const elYEnd = elYStart + yCoordsToPixels(elements[i].h)
        if (xStartFoDrug > elXStart &&
            xStartFoDrug < elXEnd &&
            yStartFoDrug > elYStart &&
            yStartFoDrug < elYEnd) {
            if (elements[i].elements) {
                draggableElement = elements[i].elements
                activeElement = elements[i]
                elements[i].elements.forEach(e => {
                    e.xStatr = e.x
                    e.yStatr = e.y
                })
                break
            }
            activeElement = elements[i]
            draggableElement = [elements[i]]
            elements[i].xStatr = elements[i].x
            elements[i].yStatr = elements[i].y
            break
        }
    }
}

function xPixelsToCoords(xPx) { return Math.round(xPx / getXPixelRatio) }
function yPixelsToCoords(yPx) { return Math.round(yPx / getYPixelRatio) }

function dragElement(e) {

    const xActualDrug = e.clientX - canvas.offsetTop;
    const yActualDrug = e.clientY - canvas.offsetLeft;

    if (draggableElement) {
        draggableElement.forEach(element => {
            let newX = xPixelsToCoords(xActualDrug - xStartFoDrug)
            let newY = yPixelsToCoords(yActualDrug - yStartFoDrug)

            const xMax = canvasWidthInSquares - element.w
            const YMax = canvasHeightInSquares - element.h
            const xMin = 0
            const YMin = 0

            element.x = Math.min(element.xStatr + newX, xMax)
            element.y = Math.min(element.yStatr + newY, YMax)

            element.x = Math.max(element.x, xMin)
            element.y = Math.max(element.y, YMin)
        })
        renderAll()
    }

}

function dropDraggableElement() {
    if (draggableElement) {
        draggableElement.forEach(el => {
            delete el.xStatr
            delete el.yStatr
        })
        draggableElement = null
    }
}

canvas.addEventListener('mousedown', takeDraggableElement)

canvas.addEventListener('mousemove', dragElement)

document.addEventListener('mouseup', dropDraggableElement)


// function renderAll() {
//     squat.drawRect();
//     squat.mouseEvent();
// }

// function renderGrid() {
//     if (gridCheckbox.checked) {
//         ctx.beginPath()
//         ctx.strokeStyle = '#bdbdbd'
//         ctx.lineWidth = 0.4
//         for (let x = squareWidth; x < w; x += squareWidth) ctx.strokeRect(x, 0, 0.1, h)
//         for (let y = squareHeight; y < h; y += squareHeight) ctx.strokeRect(0, y, w, 0.1)
//         ctx.fill()
//         ctx.closePath()
//     }
//     return false;
// }

// function start() {
//     renderAll();
// }


// const squat = {
//     height: 25,
//     width: 25,
//     rectPos: {
//         x: 0,
//         y: 0,
//     },
//     currPos: {
//         x: 0,
//         y: 0,
//     },
//     start: null,

//     edge(c, min, max) {
//         return Math.max(min, Math.min(max, c));
//     },

//     drawRect(x = this.rectPos.x, y = this.rectPos.y) {
//         ctx.fillStyle = "black";
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         renderGrid()
//         ctx.fillRect(x, y, this.width, this.height);
//     },

//     mouseEvent() {
//         canvas.onmousedown = (e) => {
//             this.start = { x: e.offsetX, y: e.offsetY };
//             canvas.onmousemove = (e) => {
//                 this.currPos.x = squareWidth * Math.round((this.rectPos.x + e.offsetX - this.start.x) / squareWidth);
//                 this.currPos.y = squareHeight * Math.round((this.rectPos.y + e.offsetY - this.start.y) / squareHeight);
//                 this.currPos.x = this.edge(this.currPos.x, 0, 500 - this.height);
//                 this.currPos.y = this.edge(this.currPos.y, 0, 600 - this.width);

//                 this.drawRect(this.currPos.x, this.currPos.y);
//             }
//             document.onmouseup = (e) => {
//                 this.rectPos.x = this.currPos.x;
//                 this.rectPos.y = this.currPos.y;
//                 canvas.onmousemove = null
//             }
//         }
//     },
// };


// window.addEventListener("DOMContentLoaded", () => {
//     start();
// })


// let game = {
// gridSettings: {
//     squaresHorizontal: 100,
//     squaresVertical: 120,
// },
// canvas: null,
// ctx: null,
// squat: null,
// walls: null,
// w: null,
// h: null,
// squareWidth: null,
// squareHeight: null,
// gridCheckbox: null,

// init() {
//     this.canvas = document.querySelector("#canvas");
//     this.ctx = canvas.getContext("2d");

//     this.w = canvas.width
//     this.h = canvas.height
//     this.squareWidth = this.w / this.gridSettings.squaresHorizontal
//     this.squareHeight = this.h / this.gridSettings.squaresVertical

//     this.gridCheckbox = document.querySelector('input[id=toggleGrid]')
// },

//     render() {
//         this.squat.drawRect();
//         this.squat.mouseEvent();
//     },

//     start() {
//         this.init();
//         this.render();
//     },

//     renderGrid() {
//         if (this.gridCheckbox.checked) {
//             this.ctx.beginPath()
//             this.ctx.strokeStyle = '#bdbdbd'
//             this.ctx.lineWidth = 0.4
//             for (let x = this.squareWidth; x < this.w; x += this.squareWidth) this.ctx.strokeRect(x, 0, 0.1, this.h)
//             for (let y = this.squareHeight; y < this.h; y += this.squareHeight) this.ctx.strokeRect(0, y, this.w, 0.1)
//             this.ctx.fill()
//             this.ctx.closePath()
//         }
//         return false
//     }

// };


// game.squat = {
//     height: 25,
//     width: 25,
//     rectPos: {
//         x: 0,
//         y: 0,
//     },
//     currPos: {
//         x: 0,
//         y: 0,
//     },
//     start: null,

//     edge(c, min, max) {
//         return Math.max(min, Math.min(max, c));
//     },

//     drawRect(x = this.rectPos.x, y = this.rectPos.y) {
//         game.ctx.fillStyle = "black";
//         game.ctx.clearRect(0, 0, 500, 600);
//         game.renderGrid()
//         game.ctx.fillRect(x, y, this.width, this.height);
//     },

//     mouseEvent() {
//         game.canvas.onmousedown = (e) => {
//             this.start = { x: e.offsetX, y: e.offsetY };
//             game.canvas.onmousemove = (e) => {
//                 this.currPos.x = game.squareWidth * Math.round((this.rectPos.x + e.offsetX - this.start.x) / game.squareWidth);
//                 this.currPos.y = game.squareHeight * Math.round((this.rectPos.y + e.offsetY - this.start.y) / game.squareHeight);
//                 this.currPos.x = this.edge(this.currPos.x, 0, 500 - 34);
//                 this.currPos.y = this.edge(this.currPos.y, 0, 600 - 40);

//                 this.drawRect(this.currPos.x, this.currPos.y);
//             }
//             game.canvas.onmouseup = (e) => {
//                 this.rectPos.x = this.currPos.x;
//                 this.rectPos.y = this.currPos.y;
//                 game.canvas.onmousemove = null
//             }
//         }
//     },
// };

// window.addEventListener("DOMContentLoaded", () => {
//     game.start();
// })
