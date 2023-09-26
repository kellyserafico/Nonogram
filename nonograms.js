const solution = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
let wrongCounter = 100;
var table = document.getElementById("canvasBoard");
createEmptyCells();
let isMouseDown = false;
let isRightClickDown = false;
// document.addEventListener('contextmenu', (e) => e.preventDefault());

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
        // console.log('up')
        
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
        else if(!(cell.classList.contains('activeButton'))){ // if right clicking on a blank button, will add xButton class (make red)
            // cell.classList.add('xButton')
        }
    } 
    else if (isMouseDown && !isRightClickDown ){ // Only toggle on left-click
        if(cell.classList.contains('xButton')){
            cell.classList.remove('xButton')
        }
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
    console.log(wrongCounter);
    if (wrongCounter == 0){
        document.getElementById('text').innerHTML = "yay"
    }
    else{
        document.getElementById('text').innerHTML = "no : ("
    }
}


// checkSolution();
  
  console.log(solution)

// function checkSolution(){
//     let buttons = document.querySelectorAll('.cell button');
//     let isSolutionCorrect = true;

//     buttons.forEach((button, index) => {
//         const row = Math.floor(index / 10);
//         const col = index % 10;

//         button.addEventListener('click', () => {
//             console.log(`Button clicked at Row: ${row}, Column: ${col}`);
//         });

//         const canvasValue = button.classList.contains('activeButton') ? 1 : 0;
//         const solutionValue = solution[row][col];

//         console.log(`Canvas Value: ${canvasValue}, Solution Value: ${solutionValue}`);


//         if (canvasValue !== solutionValue) {
//             isSolutionCorrect = false;
            
//         }

//     });
    
// }