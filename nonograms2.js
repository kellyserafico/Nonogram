var table = document.getElementById("canvasBoard");
createEmptyCells();
let isMouseDown = false;
let isRightClickDown = false;
// document.addEventListener('contextmenu', (e) => e.preventDefault());

function createEmptyCells(){
    for(let i = 0; i < 11; i++){
        let tr = table.appendChild(document.createElement('tr'));
        for(let j = 0; j < 11; j++){
            let cell = tr.appendChild(document.createElement('td'));

            if((i == 0) && (j == 0)){  //table corner
                cell.innerHTML = " ";
            }
            else if((i == 0) || (j == 0)) {//creates headers
                cell.innerHTML = (": 3");
                cell.classList.add("nums");
            }
            else{
                createClickableCells(cell);
            }
        }
    }
}

// function createClickableCells(cell){
//     const clickableCell = 
// }