let isMouseDown = false;
let isEraser = false;
let isSketchMode = false;
let showGridLines = false;

createGrid(16);
initializeTiles();
initializeMouseWatcher();
initializeButtons();

function initializeBoard() {
  let numSquares;
  do {
    numSquares = +prompt("Choose the size (MAX 100 x 100) of the board: ");
  } while (!numSquares || numSquares > 100);
  createGrid(numSquares);
  initializeTiles();
}

// MODIFIES: this
// EFFECTS: adds appropriate event listeners to all tiles
function initializeTiles() {
  const allTiles = document.querySelectorAll(".tile");

  allTiles.forEach((tile) => {
    tile.addEventListener("mouseover", (e) => {
      if (isMouseDown) updateShade(e);
    });
  });

  allTiles.forEach((tile) => {
    tile.addEventListener("mousedown", updateShade);
  });
}

// MODIFIES: this, isMouseDown
// EFFECTS: adds event listeners to watch for when the mouse is pressed down
function initializeMouseWatcher() {
  document.addEventListener("mousedown", (e) => {
    if (e.button === 0) {
      isMouseDown = true;
    }
  });

  document.addEventListener("mouseup", function (e) {
    if (e.button === 0) {
      isMouseDown = false;
    }
  });
}

// MODIFIES: this
// EFFECTS: intializes buttons
function initializeButtons() {
  const buttonToggle = document.querySelector(".toggle-button");
  const buttonEraser = document.querySelector(".eraser-button");
  const buttonResize = document.querySelector(".resize-button");
  const buttonLines = document.querySelector(".grid-button");

  buttonToggle.addEventListener("click", () => {
    isSketchMode ? (isSketchMode = false) : (isSketchMode = true);
  });

  buttonEraser.addEventListener("click", () => {
    if (isEraser) {
      isEraser = false;
      buttonEraser.style.backgroundColor = "#d1001f";
    } else {
      isEraser = true;
      buttonEraser.style.backgroundColor = "green";
    }
  });

  buttonResize.addEventListener("click", () => {
    clearRows();
    initializeBoard();
  });

  buttonLines.addEventListener("click", () => {
    showGridLines ? (showGridLines = false) : (showGridLines = true);
    toggleGridlines();
  });
}

// REQUIRES: numSquares is non-negative
// MODIFIES: this
// EFFECTS: initializes a numSquares x numSquares grid on the screen
function createGrid(numSquares) {
  const tileContainer = document.querySelector(".tile-container");
  for (let k = 0; k < numSquares; k++) {
    let row = document.createElement("div");
    row.classList.add("row");
    addColumns(row, numSquares);
    tileContainer.appendChild(row);
  }
}

// REQUIRES: numSquares is non-negative and row is a valid div
// MODIFIES: row
// EFFECTS: adds numSquare tiles to row
function addColumns(row, numSquare) {
  for (let k = 0; k < numSquare; k++) {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    row.appendChild(tile);
  }
}

// REQUIRES: e is a tile
// MODIFIES: e
// EFFECTS: colours the tile
function updateShade(e) {
  if (isEraser) {
    e.target.style.backgroundColor = "wheat";
    e.target.style.opacity = "0";
  } else if (isSketchMode) {
    e.target.style.backgroundColor = "black";
    e.target.style.opacity = `${+e.target.style.opacity + 0.1}`;
  } else {
    e.target.style.backgroundColor = "black";
    e.target.style.opacity = "1";
  }
}

// MODIFIES: this
// EFFECTS: toggles the grid lines on screen
function toggleGridlines() {
  const allTiles = document.querySelectorAll(".tile");

  if (showGridLines) {
    allTiles.forEach((tile) => {
      tile.style.border = "1px solid lightgray";
    });
  } else {
    allTiles.forEach((tile) => {
      tile.style.border = "0px solid lightgray";
    });
  }
}

function clearRows() {
  let parent = document.querySelector(".tile-container");
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
