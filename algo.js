console.log(data)
var currentP = data[0];
var theWay = [];
var end = data.find(element => element.posY == 12 && element.posX == 2)
currentP.visited = true;
currentP.noWay = false;

createGrid()
// dfs();
bfs();


let queue = [];

// Faire une fonction qui donne les cases voisines
function get_neighbour() {
    for (var j = 0; j < currentP.walls.length; j++) {
        if (currentP.walls[j] === false) {
            if (j == 0) {
                if (data.find(element => element.posY == currentP.posY - 1 && element.posX == currentP.posX).visited !== true) {
                    queue.push(data.find(element => element.posY == currentP.posY - 1 && element.posX == currentP.posX))
                }
            } else if (j == 1) {
                if (data.find(element => element.posY == currentP.posY && element.posX == currentP.posX + 1).visited !== true) {
                    queue.push(data.find(element => element.posY == currentP.posY && element.posX == currentP.posX + 1))
                }
            } else if (j == 2) {
                if (data.find(element => element.posY == currentP.posY + 1 && element.posX == currentP.posX).visited !== true) {
                    queue.push(data.find(element => element.posY == currentP.posY +1 && element.posX == currentP.posX))
                }
            } else if (j == 3) {
                if (data.find(element => element.posY == currentP.posY && element.posX == currentP.posX - 1).visited !== true) {
                    queue.push(data.find(element => element.posY == currentP.posY && element.posX == currentP.posX - 1))
                }
            }
        }
    }
    console.log(queue)
}

function move_bfs() {
    get_neighbour()
    currentP = queue.shift()
    currentP.visited = true;
    color(currentP.posX, currentP.posY)
    return currentP
}

async function bfs() {
    while (currentP != end) {
        let delayres = await delay(100);
        currentP = move_bfs()
    }
}


function get_first_unvisited_neighbour(currentPx, currentPy) {
    for (var j = 0; j < currentP.walls.length; j++) {
        if (currentP.walls[j] === false) {
            if (j == 0) {
                if (data.find(element => element.posY == currentP.posY - 1 && element.posX == currentP.posX).visited !== true) {
                    currentPy = currentP.posY - 1
                    break;
                }
            } else if (j == 1) {
                if (data.find(element => element.posY == currentP.posY && element.posX == currentP.posX + 1).visited !== true) {
                    currentPx = currentP.posX + 1
                    break;
                }
            } else if (j == 2) {
                if (data.find(element => element.posY == currentP.posY + 1 && element.posX == currentP.posX).visited !== true) {
                    currentPy = currentP.posY + 1
                    break;
                }
            } else if (j == 3) {
                if (data.find(element => element.posY == currentP.posY && element.posX == currentP.posX - 1).visited !== true) {
                    currentPx = currentP.posX - 1
                    break;
                }
            }
        }
    }
    return [currentPx, currentPy]
}

//Avance 
function move(currentP) {
    var currentPy = currentP.posY;
    var currentPx = currentP.posX;
    theWay.push(currentP)
    console.log("xy:", currentPx, currentPy);

    [currentPx, currentPy] = get_first_unvisited_neighbour(currentPx, currentPy);

    if ((currentP.posX === currentPx && currentP.posY === currentPy) === true) {
        console.log("impasse")
        currentP.noWay = true
        colorNoWay(currentP.posX, currentP.posY)
        theWay.pop()
        var resultat = theWay.pop()
        currentP = data.find(element => element.posY == resultat.posY && element.posX == resultat.posX)
        return currentP;
    } else {
        currentP = data.find(element => element.posY == currentPy && element.posX == currentPx)
        currentP.visited = true;
        color(currentP.posX, currentP.posY)
        return currentP;
    }
}



// Afficher les intersection.
function intersection() {
    var count = currentP.walls.filter(Boolean).length;
    if (count <= 1) {
        console.log("intersection at " + currentP.posX + "." + currentP.posY)
    }
}

//  DFS
async function dfs() {
    while (currentP != end) {
        let delayres = await delay(100);
        currentP = move(currentP)
    }
}


/* -----------------------------------Affichage-------------------------------- */


// Fonction qui crée un maze en f(data)
function createGrid() {
    var grid = document.getElementById("grid")
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.id = data[i].posX + "." + data[i].posY;
        grid.appendChild(div);
        for (var j = 0; j < data[i].walls.length; j++) {
            if (data[i].walls[j] === true) {
                if (j == 0) {
                    div.classList.add("north");
                } else if (j == 1) {
                    div.classList.add("east");
                } else if (j == 2) {
                    div.classList.add("south");
                } else if (j == 3) {
                    div.classList.add("west");
                }
            }
        }
    }
    setStartEnd()
}

// Color le chemin
function color(currentPx, currentPy) {
    var here = document.getElementById(currentPx + "." + currentPy)
    here.style.backgroundColor = "#e5e5e5"
}

// Color Noway
function colorNoWay(currentPx, currentPy) {
    var here = document.getElementById(currentPx + "." + currentPy)
    here.style.backgroundColor = "#696969"
}

// Color le départ et la fin 
function setStartEnd() {
    var start = document.getElementById("0.0")
    var end = document.getElementById("2.12")
    start.style.backgroundColor = "#FF7F00"
    end.style.backgroundColor = "#008000"
}

// Delay pour l'affichage de la boucle
function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}