var table = document.getElementById("canvasBoard");
createEmptyCells();

let isMouseDown = false;
let isRightClickDown = false;

window.addEventListener('mousedown', function (event) {
    if (event.button === 0) { // Left mouse button
        isMouseDown = true;
        isRightClickDown = false;
    } else if (event.button === 2) { // Right mouse button
        isMouseDown = true;
        isRightClickDown = true;
    }
});

window.addEventListener('mouseup', function () {
    isMouseDown = false;
    isRightClickDown = false;
});

function createEmptyCells() {
    for (let i = 0; i < 11; i++) {
        let tr = table.appendChild(document.createElement('tr')); // row

        for (let j = 0; j < 11; j++) {
            let cell = tr.appendChild(document.createElement('td'));

            if ((i == 0) && (j == 0)) {
                cell.innerHTML = " ";
            } else if ((i == 0) || (j == 0)) { // creates headers
                cell.innerHTML = ": 3";
                cell.classList.add("nums");
            } else {
                createClickableButtons(cell);
            }
        }
    }
}

function createClickableButtons(cell) {
    const button = document.createElement('button');

    button.addEventListener('mousedown', function () {
        toggleButton(button);
    });

    button.addEventListener('mousemove', function (event) {
        if (isMouseDown) {
            toggleButton(button);
        }
    });

    cell.appendChild(button);
    cell.classList.add("cell");
}


function toggleButton(button) {
    const cell = button.parentElement;
    if (isRightClickDown) {
        if (cell.classList.contains('activeButton')) {
            cell.classList.remove('activeButton');
        }
    } else {
        if (!cell.classList.contains('activeButton')) {
            cell.classList.add('activeButton');
        }
    }
    // cellClicked(cell);
}

// function cellClicked(cell) {
//     if (cell.classList.contains("activeButton")) {
//         console.log("undo");
//     } else {
//         cell.classList.add("activeButton");
//     }
// }

