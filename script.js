let tileContainer = document.querySelector(".tile-container");

// REQUIRES: numSquares is non-negative
// EFFECTS: initializes a numSquares x numSquares grid on the screen
function createGrid(numSquares) {
  for (let k = 0; k < numSquares; k++) {
    let row = document.createElement("div");
    row.classList.add("row");
    addColumns(row, numSquares);
    tileContainer.appendChild(row);
  }
}

// REQUIRES: numSquares is non-negative and row is a valid div
// EFFECTS: adds numSquare tiles to row
function addColumns(row, numSquare) {
    for (let k = 0; k < numSquare; k++) {
        let tile = document.createElement("div");
        tile.classList.add("tile");
        row.appendChild(tile);
    }
}