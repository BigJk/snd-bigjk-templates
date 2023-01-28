import * as PF from 'pathfinding'

let canvas = document.querySelector(window.dungeonGenTarget ?? "#app canvas");
let ctx = canvas.getContext("2d");

// high dpi fix
let canvasWidth = window.config.printWidth;
let canvasHeight = (canvasWidth / window.config.width) * window.config.height;

if (window.devicePixelRatio > 1) {
    canvas.width = canvasWidth * window.devicePixelRatio;
    canvas.height = canvasHeight * window.devicePixelRatio;
    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";

    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

// debug
const DEBUG = false;

// gen
const GEN_WIDTH = window.config.width;
const GEN_HEIGHT = window.config.height;

console.log(GEN_WIDTH, GEN_HEIGHT)

// sizing
const PER_TILE = canvasWidth / GEN_WIDTH
const WALL_WIDTH = 2.5;
const GRID_WIDTH = 1.5;

// hatching
const HATCHING_SCALE = 1;
const HATCHING_LINE_WIDTH = 1.5;

console.log(PER_TILE);

function drawHatching(x, y, rotation, scale, lines) {
    const WIDTH = 15;
    const SPACING = 6;

    let rotate = (x, y, rot) => {
        x -= (WIDTH * scale) / 2;
        y -= (WIDTH * scale) / 2;

        return [
            (x * Math.cos(rot) - y * Math.sin(rot)) + (WIDTH * scale) / 2,
            (x * Math.sin(rot) + y * Math.cos(rot)) + (WIDTH * scale) / 2
        ]
    }

    let points = new Array(lines).fill(null).map((_, i) => {
        return [
            rotate(0, SPACING * scale * i, rotation),
            rotate(WIDTH * scale, SPACING * scale * i, rotation)
        ]
    });

    if (DEBUG) {
        ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
        ctx.beginPath();
        ctx.rect(x, y, WIDTH * scale, WIDTH * scale);
        ctx.stroke();
    }

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = HATCHING_LINE_WIDTH * scale;
    points.forEach((p) => {
        ctx.beginPath();
        ctx.moveTo(p[0][0] + x, p[0][1] + y);
        ctx.lineTo(p[1][0] + x, p[1][1] + y);
        ctx.stroke();
    })
}

function hatchArea(x, y, width, height, scale, lines, filter) {
    let p = new PoissonDiskSampling({
        shape: [width, height],
        minDistance: 13 * HATCHING_SCALE,
        maxDistance: 18 * HATCHING_SCALE,
        tries: 10
    });
    p.fill().forEach((p) => {
        if (filter && !filter(p)) {
            return;
        }
        drawHatching(x + p[0], y + p[1], Math.PI * 2 * Math.random(), scale, lines)
    })
}

function hatchRoom(x, y, width, height, scale, lines) {
    let p = new PoissonDiskSampling({
        shape: [width + 45, height + 45],
        minDistance: 13 * HATCHING_SCALE,
        maxDistance: 18 * HATCHING_SCALE,
        tries: 10
    });
    p.fill().forEach((p) => {
        drawHatching(x - 30 + p[0], y - 30 + p[1], Math.PI * 2 * Math.random(), scale, lines)
    })
}

function drawRoom(x, y, width, height, lineWidthWall, lineWidthGrid) {
    lineWidthWall = lineWidthWall ?? WALL_WIDTH;
    lineWidthGrid = lineWidthGrid ?? GRID_WIDTH;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x * PER_TILE, y * PER_TILE, width * PER_TILE, height * PER_TILE);

    ctx.lineWidth = lineWidthGrid;
    ctx.strokeStyle = "black";
    ctx.setLineDash([0, PER_TILE / 4, PER_TILE / 4]);
    for (let gx = 1; gx < width; gx++) {
        ctx.beginPath();
        ctx.moveTo(x * PER_TILE + gx * PER_TILE, y * PER_TILE);
        ctx.lineTo(x * PER_TILE + gx * PER_TILE, y * PER_TILE + height * PER_TILE);
        ctx.stroke();
    }

    for (let gy = 1; gy < height; gy++) {
        ctx.beginPath();
        ctx.moveTo(x * PER_TILE, y * PER_TILE + gy * PER_TILE);
        ctx.lineTo(x * PER_TILE + width * PER_TILE, y * PER_TILE + gy * PER_TILE);
        ctx.stroke();
    }
    ctx.setLineDash([]);

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = lineWidthWall;
    ctx.beginPath();
    ctx.rect(x * PER_TILE, y * PER_TILE, width * PER_TILE, height * PER_TILE);
    ctx.stroke();
}

function drawCorridor(x, y, openings) {
    drawRoom(x, y, 1, 1);

    if (openings["north"]) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x * PER_TILE + WALL_WIDTH / 2, y * PER_TILE - WALL_WIDTH, PER_TILE - WALL_WIDTH, WALL_WIDTH * 2);

        ctx.lineWidth = GRID_WIDTH;
        ctx.setLineDash([0, PER_TILE / 4, PER_TILE / 4]);
        ctx.beginPath();
        ctx.moveTo(x * PER_TILE, y * PER_TILE);
        ctx.lineTo(x * PER_TILE + PER_TILE, y * PER_TILE);
        ctx.stroke();
    }

    if (openings["south"]) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x * PER_TILE + WALL_WIDTH / 2, (y + 1) * PER_TILE - WALL_WIDTH, PER_TILE - WALL_WIDTH, WALL_WIDTH * 2);

        ctx.lineWidth = GRID_WIDTH;
        ctx.setLineDash([0, PER_TILE / 4, PER_TILE / 4]);
        ctx.beginPath();
        ctx.moveTo(x * PER_TILE, (y + 1) * PER_TILE);
        ctx.lineTo(x * PER_TILE + PER_TILE, (y + 1) * PER_TILE);
        ctx.stroke();
    }

    if (openings["east"]) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x * PER_TILE + PER_TILE - WALL_WIDTH, y * PER_TILE + WALL_WIDTH / 2, WALL_WIDTH * 2, PER_TILE - WALL_WIDTH);

        ctx.lineWidth = GRID_WIDTH;
        ctx.setLineDash([0, PER_TILE / 4, PER_TILE / 4]);
        ctx.beginPath();
        ctx.moveTo(x * PER_TILE + PER_TILE, y * PER_TILE);
        ctx.lineTo(x * PER_TILE + PER_TILE, y * PER_TILE + PER_TILE);
        ctx.stroke();
    }

    if (openings["west"]) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x * PER_TILE - WALL_WIDTH, y * PER_TILE + WALL_WIDTH / 2, WALL_WIDTH * 2, PER_TILE - WALL_WIDTH);

        ctx.lineWidth = GRID_WIDTH;
        ctx.setLineDash([0, PER_TILE / 4, PER_TILE / 4]);
        ctx.beginPath();
        ctx.moveTo(x * PER_TILE, y * PER_TILE);
        ctx.lineTo(x * PER_TILE, y * PER_TILE + PER_TILE);
        ctx.stroke();
    }
}

let faces = {
    "north": [[0, 0], [PER_TILE, 0]],
    "east": [[PER_TILE, 0], [PER_TILE, PER_TILE]],
    "south": [[0, PER_TILE], [PER_TILE, PER_TILE]],
    "west": [[0, 0], [0, PER_TILE]],
}

function faceCenter(face) {
    return [
        (face[0][0] + face[1][0]) / 2,
        (face[0][1] + face[1][1]) / 2,
    ]
}

function drawDoor(x, y, orientation, type, lineWidthWall) {
    const doorSymbolSize = 3; // higher => smaller

    lineWidthWall = lineWidthWall ?? WALL_WIDTH;

    let face = faces[orientation];
    let center = faceCenter(face);

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = lineWidthWall;
    ctx.beginPath();
    ctx.moveTo(x * PER_TILE + face[0][0], y * PER_TILE + face[0][1]);
    ctx.lineTo( x * PER_TILE + face[1][0], y * PER_TILE + face[1][1]);
    ctx.stroke();

    switch (type) {
        default:
        case 'open':
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(
                x * PER_TILE + center[0] - PER_TILE / (2 * doorSymbolSize),
                y * PER_TILE + center[1] - PER_TILE / (2 * doorSymbolSize), PER_TILE / doorSymbolSize, PER_TILE / doorSymbolSize
            );
            break;
        case 'closed':
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(
                x * PER_TILE + center[0] - PER_TILE / (2 * doorSymbolSize),
                y * PER_TILE + center[1] - PER_TILE / (2 * doorSymbolSize), PER_TILE / doorSymbolSize, PER_TILE / doorSymbolSize
            );
            ctx.beginPath();
            ctx.rect(
                x * PER_TILE + center[0] - PER_TILE / (2 * doorSymbolSize),
                y * PER_TILE + center[1] - PER_TILE / (2 * doorSymbolSize), PER_TILE / doorSymbolSize, PER_TILE / doorSymbolSize
            );
            ctx.stroke();
            break;
        case 'locked':
            ctx.beginPath();
            ctx.rect(
                x * PER_TILE + center[0] - PER_TILE / (2 * doorSymbolSize),
                y * PER_TILE + center[1] - PER_TILE / (2 * doorSymbolSize), PER_TILE / doorSymbolSize, PER_TILE / doorSymbolSize
            );
            ctx.stroke();
            break;
        case 'secret':
            ctx.fillStyle = "#000000";
            ctx.strokeStyle = "#ffffff";
            ctx.font = "16px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.strokeText("S", x * PER_TILE + center[0], y * PER_TILE + center[1]);
            ctx.fillText("S", x * PER_TILE + center[0], y * PER_TILE + center[1]);
            break;
        case 'trapped':
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(
                x * PER_TILE + center[0] - PER_TILE / (2 * doorSymbolSize),
                y * PER_TILE + center[1] - PER_TILE / (2 * doorSymbolSize), PER_TILE / doorSymbolSize, PER_TILE / doorSymbolSize
            );
            ctx.beginPath();
            ctx.rect(
                x * PER_TILE + center[0] - PER_TILE / (2 * doorSymbolSize),
                y * PER_TILE + center[1] - PER_TILE / (2 * doorSymbolSize), PER_TILE / doorSymbolSize, PER_TILE / doorSymbolSize
            );
            ctx.stroke();
            ctx.fillStyle = "#000000";
            ctx.strokeStyle = "#ffffff";
            ctx.font = "17px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("-", x * PER_TILE + center[0], y * PER_TILE + center[1]);
            break;
    }
}

//
// GENERATOR
//

function roomsOverlap(roomA, roomB) {
    if (roomA.x < roomB.x + roomB.width && roomB.x < roomA.x + roomA.width && roomA.y < roomB.y + roomB.height)
        return roomB.y < roomA.y + roomA.height;
    else
        return false;
}

let exits = {
    "north": [Math.ceil(GEN_WIDTH / 2), 0],
    "east": [GEN_WIDTH - 1, Math.ceil(GEN_HEIGHT / 2)],
    "south": [Math.ceil(GEN_WIDTH / 2), GEN_HEIGHT - 1],
    "west": [0, Math.ceil(GEN_HEIGHT / 2)],
}

let areas = [];

function getTypeOn(x, y, type) {
    return areas.find(a =>
        a.type === type &&
        x >= a.x &&
        y >= a.y &&
        x < a.x + a.width &&
        y < a.y + a.height
    );
}

/*

    Place Exits

 */

Object.keys(exits).forEach((k) => {
    let exit = exits[k];
    areas.push({ x: exit[0], y: exit[1], width: 1, height: 1, type: 'exit', orientation: k });
})

/*

    Place Rooms

 */

function placeRoomRandomly() {
    for (let i = 0; i < 5; i++) {
        let width = 3 + Math.floor(Math.random() * 3);
        let height = 3 + Math.floor(Math.random() * 3);

        let x = 1 + Math.floor((GEN_WIDTH - width - 2) * Math.random());
        let y = 1 + Math.floor((GEN_HEIGHT - height - 2) * Math.random());

        let room = { x, y, width, height, type: 'room' };

        if (areas.some(r => roomsOverlap({ x: x - 1, y: y - 1, width: width + 2, height: height + 2, type: 'room' }, r))) {
            continue;
        }

        areas.push(room);
    }
}

for (let i = 0; i < 10; i++) {
    placeRoomRandomly();
}

/*

    Pathfinding

 */

let g = new jsgraphs.WeightedGraph(areas.length * areas.length);

areas.forEach((ra, i) => {
    areas.forEach((rb, j) => {
        if (i === j)
            return;

        let dist = Math.sqrt(Math.pow(ra.x - rb.x, 2) + Math.pow(ra.y - rb.y, 2));
        g.addEdge(new jsgraphs.Edge(i, j, dist));
    })
});

let prim = new jsgraphs.LazyPrimMST(g);
let mst = prim.mst;
for(let i = 0; i < mst.length; ++i) {
    let e = mst[i];
    let v = e.either();
    let w = e.other(v);
    console.log('(' + v + ', ' + w + '): ' + e.weight);

    let from = areas[v];
    let to = areas[w];

    let grid = new PF.Grid(GEN_WIDTH, GEN_HEIGHT);

    /*areas.filter((_, i) => i !== v && i !== w && areas.type !== 'corridor').forEach(a => {
        for (let xi = 0; xi < a.width; xi++) {
            for (let yi = 0; yi < a.height; yi++) {
                grid.setWalkableAt(xi + a.x, yi + a.y, true);
            }
        }
    })*/

    let path = new PF.AStarFinder().findPath(
        Math.floor(from.x + from.width / 2), Math.floor(from.y + from.height / 2),
        Math.floor(to.x + to.width / 2), Math.floor(to.y + to.height / 2),
        grid
    );

    console.log(path);

    path.forEach((p, i) => {
        if (getTypeOn(p[0], p[1], 'room')) {
            areas[areas.length - 1].needDoor = true;
        }

        areas.push({ x: p[0], y: p[1], width: 1, height: 1, type: 'corridor', needDoor: (i > 0 && !!getTypeOn(path[i-1][0], path[[i-1]][1], 'room')) });
    })
}

/*

    Drawing

 */

let solids = new Array(GEN_WIDTH).fill(null).map(() => new Array(GEN_HEIGHT).fill(false));
areas.forEach((a) => {
    for (let xi = 0; xi < a.width; xi++) {
        for (let yi = 0; yi < a.height; yi++) {
            solids[xi + a.x][yi + a.y] = true;
        }
    }
})

// filter corridors that are inside rooms and exits
areas = areas.filter(a => {
    if (a.type === 'corridor') {
        return !(!!getTypeOn(a.x, a.y, 'room') || !!getTypeOn(a.x, a.y, 'exit'))
    }

    return true;
})

function handleArea(a) {
    switch (a.type) {
        case 'exit':
            drawRoom(a.x, a.y, a.width, a.height);
            drawDoor(a.x, a.y, a.orientation, 'door');

            ctx.fillStyle = "#000000";
            ctx.strokeStyle = "#ffffff";
            ctx.font = "20px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            let arrows = {
                "north": "↑",
                "east": "→",
                "south": "↓",
                "west": "←",
            }

            ctx.strokeText(arrows[a.orientation], a.x * PER_TILE + PER_TILE / 2, a.y * PER_TILE + PER_TILE / 2);
            ctx.fillText(arrows[a.orientation], a.x * PER_TILE + PER_TILE / 2, a.y * PER_TILE + PER_TILE / 2);
            break;
        case 'corridor':
            drawCorridor(a.x, a.y, {
                "north": !!getTypeOn(a.x, a.y - 1, 'corridor') || !!getTypeOn(a.x, a.y - 1, 'exit'),
                "east": !!getTypeOn(a.x + 1, a.y, 'corridor') || !!getTypeOn(a.x + 1, a.y, 'exit'),
                "south": !!getTypeOn(a.x, a.y + 1, 'corridor') || !!getTypeOn(a.x, a.y + 1, 'exit'),
                "west": !!getTypeOn(a.x - 1, a.y, 'corridor') || !!getTypeOn(a.x - 1, a.y, 'exit'),
            })
            break;
        case 'room':
            drawRoom(a.x, a.y, a.width, a.height);
            break;
    }
}

hatchArea(0, 0, GEN_WIDTH * PER_TILE, GEN_HEIGHT * PER_TILE, HATCHING_SCALE, 3, (p) => {
    let x = Math.floor(p[0] / PER_TILE);
    let y = Math.floor(p[1] / PER_TILE);

    if (x < 0 || x >= GEN_WIDTH || y < 0 || y >= GEN_HEIGHT) return false;

    if (solids[x][y]) return true;
    if (x + 1 < GEN_WIDTH && solids[x + 1][y]) return true;
    if (x - 1 >= 0 && solids[x - 1][y]) return true;
    if (y + 1 < GEN_HEIGHT && solids[x][y + 1]) return true;
    if (y - 1 >= 0 && solids[x][y - 1]) return true;

    return false;
})

areas.filter(a => a.type === 'corridor' || a.type === 'exit').forEach(handleArea);
areas.filter(a => a.type !== 'corridor' && a.type !== 'exit').forEach(handleArea);
areas.filter(a => a.type === 'corridor' && a.needDoor === true).forEach((a) => {
    let types = ['open', 'closed'];

    if (getTypeOn(a.x + 1, a.y, 'room')) {
        drawDoor(a.x, a.y, 'east', types[Math.floor(Math.random()*types.length)]);
    }
    if (getTypeOn(a.x - 1, a.y, 'room')) {
        drawDoor(a.x, a.y, 'west', types[Math.floor(Math.random()*types.length)]);
    }
    if (getTypeOn(a.x, a.y + 1, 'room')) {
        drawDoor(a.x, a.y, 'south', types[Math.floor(Math.random()*types.length)]);
    }
    if (getTypeOn(a.x, a.y - 1, 'room')) {
        drawDoor(a.x, a.y, 'north', types[Math.floor(Math.random()*types.length)]);
    }
})