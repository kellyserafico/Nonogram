var table = document.getElementById("canvasBoard");
createEmptyCells();

let isMouseDown = false;
let isRightClickDown = false;

document.addEventListener('contextmenu', (e) => e.preventDefault());

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

    button.addEventListener('mousedown', function (event) {
        if (event.button === 0) { // Left mouse button
            isMouseDown = true;
            isRightClickDown = false;
        } 
        else if(event.button === 2){
            isMouseDown = true;
            isRightClickDown = true;
        }
        toggleButton(button);
        
    });
    button.addEventListener('click', function(){
        toggleButton(button);
    });
    button.addEventListener('mousemove', function () {
        if (isMouseDown) {
            toggleButton(button);
        }
        
    });

    table.addEventListener('mouseup', function(event) {
        isRightClickDown = false;
        isMouseDown = false;
        // toggleButton(button)
        console.log('up')
    });

    button.addEventListener('contextmenu', function (){
        cell = button.parentElement;

        if(cell.classList.contains('activeButton')){
            cell.classList.remove('activeButton');
        }
        isMouseDown = false;
        isRightClickDown = false;
        console.log("hai");
    });

    cell.appendChild(button);
    cell.classList.add("cell");
}


function toggleButton(button) {
    const cell = button.parentElement;

    if (isRightClickDown && isMouseDown) {
        if (cell.classList.contains('activeButton')) {
            cell.classList.remove('activeButton');
            console.log("removed");
        }
    } 
    else if (isMouseDown && !isRightClickDown ){ // Only toggle on left-click

        cell.classList.add('activeButton');
        console.log("added");

    }

}

