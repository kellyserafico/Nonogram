const solution = createSolution();
console.log(solution);

let wrongCounter = 100;
let rowCounter = [];
let table = document.getElementById("canvasBoard");
createEmptyCells();
table.addEventListener('contextmenu', (e) => e.preventDefault());


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

function createEmptyCells() {
    for (let i = 0; i < 11; i++) {
        let tr = table.appendChild(document.createElement('tr')); // row

        for (let j = 0; j < 11; j++) {
            let cell = tr.appendChild(document.createElement('td'));

            if ((i == 0) && (j == 0)) { //corner cell
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

//create buttons

function createClickableButtons(cell, correctValue){
    const button = document.createElement('button');
    button.value = correctValue;
    if(correctValue == 0){
        wrongCounter--;
    }

    button.addEventListener('mousedown', function(event){
        if(event.button === 0){ // Left Mouse Button
            if(!button.parentElement.classList.contains('activeButton')){
                button.parentElement.classList.add('activeButton');
                if(button.value ==1){
                    wrongCounter--;
                }
                else{
                    wrongCounter++;
                }
            }
            else if(button.parentElement.classList.contains('xButton')){
                button.parentElement.classList.remove('xButton');
            }
        }

        if(event.button === 2){
            if(!button.parentElement.classList.contains('activeButton') && !button.parentElement.classList.contains('xButton')){
                button.parentElement.classList.add('xButton');
            }
            else if(button.parentElement.classList.contains('activeButton')){
                button.parentElement.classList.remove('activeButton');
                if(button.value == 0){
                    wrongCounter--;
                }
                else{
                    wrongCounter++;
                }
            }
            else if(button.parentElement.classList.contains('xButton')){
                button.parentElement.classList.remove('xButton');
            }
        }

        if (wrongCounter == 0){
            document.getElementById('text').innerHTML = "yay"
        }
        else{
            document.getElementById('text').innerHTML = "no : ("
        }
        
    });


    cell.appendChild(button);
    cell.classList.add("cell");

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