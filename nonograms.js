const solution = createSolution();

console.log(solution)
let wrongCounter = 100;
let rowCounter = [];
var table = document.getElementById("canvasBoard");
createEmptyCells();
let isMouseDown = false;
let isRightClickDown = false;
let xButtonRemoveMode = false;
document.addEventListener('contextmenu', (e) => e.preventDefault());

function createEmptyCells() {
    for (let i = 0; i < 11; i++) {
        let tr = table.appendChild(document.createElement('tr')); // row

        for (let j = 0; j < 11; j++) {
            let cell = tr.appendChild(document.createElement('td'));

            if ((i == 0) && (j == 0)) {
                cell.innerHTML = " ";
            } else if ((i == 0) || (j == 0)) { // creates headers
                if(i == 0){
                    cell.innerHTML = rowHeaders(solution)[j - 1];
                }
                if(j == 0){
                    cell.innerHTML = columnHeaders(solution)[i - 1];
                    
                }
                
                cell.classList.add("nums");
            } else {
                createClickableButtons(cell, solution[i-1][j-1]);
            }
        }
    }
}

function createClickableButtons(cell, correctValue) {
    const button = document.createElement('button');
    button.value = correctValue;
    if (correctValue == 0){
        wrongCounter -= 1;
    }
    
    button.addEventListener('mousedown', function (event) {
        if((isMouseDown) && (isRightClickDown) && (cell.classList.contains('xButton'))){
            xButtonRemoveMode = true;
            deletexButton(cell);
        }
        else if (event.button === 0) { // Left mouse button
            isMouseDown = true;
            isRightClickDown = false;
            toggleButton(button);
        } 
        else if(xButtonRemoveMode == false && (!(cell.classList.contains('activeButton'))) && (event.button === 2) && (!(cell.classList.contains('xButton')))){ // help
            cell.classList.add('xButton')
            xButtonRemoveMode = false;
            isRightClickDown = true;
            isMouseDown = true;
        }
        else if(event.button === 2){ // right mouse button
            isMouseDown = true;
            isRightClickDown = true;
            toggleButton(button);
        }
        
    });
    button.addEventListener('click', function(){
        if(isMouseDown && (isRightClickDown) && !(button.parentElement.classList.contains('activeButton'))){
            cell.classList.add('xButton');
            // console.log('2')
        }
        else{
            toggleButton(button);
        }


    });

    button.addEventListener('mousemove', function () {
        
            if((isMouseDown) && (isRightClickDown) && (cell.classList.contains('xButton'))){
                xButtonRemoveMode = true
                deletexButton(cell);
                console.log("nope")
                
            }
            else if(xButtonRemoveMode == false && (isMouseDown) && (isRightClickDown) && (!(cell.classList.contains('activeButton')))){
                cell.classList.add('xButton');
                // console.log('3');
            }
            else if(isMouseDown){
                toggleButton(button);
            }
        
        
        
    });

    table.addEventListener('mouseup', function(event) {
        isRightClickDown = false;
        isMouseDown = false;
        // toggleButton(button)
        console.log('up')
        xButtonRemoveMode = false;
        
    });

    button.addEventListener('contextmenu', function (){
        cell = button.parentElement;

        if(cell.classList.contains('activeButton')){
            cell.classList.remove('activeButton');
        }
        isMouseDown = false;
        isRightClickDown = false;
        // console.log("hai");
    });

    cell.appendChild(button);
    cell.classList.add("cell");
}

function deletexButton(cell){ ///////////////////////////////////////////////////////////////////////////////////////
    cell.classList.remove('xButton')
}

function toggleButton(button) {
    const cell = button.parentElement;

    if (isRightClickDown && isMouseDown) {
        if (cell.classList.contains('activeButton')) {  //if right clicking on activeButton
            cell.classList.remove('activeButton');
            // console.log("removed");
            if (button.value == 0){
                wrongCounter -= 1;
            }else{
                wrongCounter += 1;
            }
        }
        else if((cell.classList.contains('xButton'))){ 
            cell.classList.remove('xButton')
        }
    } 
    else if (isMouseDown && !isRightClickDown ){ // Only toggle on left-click
        if (!cell.classList.contains('activeButton')){
            cell.classList.add('activeButton');
            if (button.value == 1){
                wrongCounter -= 1;
            }else{
                wrongCounter += 1;
            }
        }
        // console.log("added");

    }
    // console.log(wrongCounter);
    if (wrongCounter == 0){
        document.getElementById('text').innerHTML = "yay"
    }
    else{
        document.getElementById('text').innerHTML = "no : ("
    }
}



function columnHeaders(solution){
    // console.log(solution[0][0])
    var header = [];
    var individualHeader = [];
    for(let i = 0; i < 10; i++){
        var count = 0;
        for(let j = 0; j < 10; j++){
            if(solution[i][j] == 1){
                count++
                if(j == 9){
                    individualHeader.push(count)
                }
            }
            else if(solution[i][j] == 0){
                if(j > 0){
                    if(solution[i][j - 1] != 0){
                        individualHeader.push(count)
                    }
                }
                
                count = 0;
            }
        }
        header.push(individualHeader);
        individualHeader = [];
    }
    // console.log(header)
    return header;
}

function rowHeaders(solution){
    
    var header = [];
    var individualHeader = [];
    for(let i = 0; i < 10; i++){
        var count = 0;
        for(let j = 0; j < 10; j++){
            if(solution[j][i] == 1){
                count++
                if(j == 9){
                    individualHeader.push(count)
                }
            }
            else if(solution[j][i] == 0){
                if(j > 0){
                    if(solution[j - 1][i] != 0){
                        individualHeader.push(count)
                    }
                }
                
                count = 0;
            }
        }
        header.push(individualHeader);
        individualHeader = [];
    }
    // console.log(header)
    return header;
}
function createSolution(){
    let solution = [];
    for(let i = 0; i < 10; i++){
        let rowSolution = [];
        for(let j = 0; j < 10; j++){
            rowSolution.push(Math.floor(Math.random() * 2))
        }
        solution.push(rowSolution);
    }
    return solution;
}