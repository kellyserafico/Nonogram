var table = document.getElementById("canvasBoard");
createEmptyCells();

function createEmptyCells(){
    for(let i = 0; i < 11; i++){
        let tr = table.appendChild(document.createElement('tr'));
        
        for(let j = 0; j < 11; j++){
            let cell = tr.appendChild(document.createElement('td'));

            if((i == 0) && (j == 0)){
                cell.innerHTML = " ";
            }
            else if((i == 0) || (j == 0)){
                cell.innerHTML = ": 3";
                cell.classList.add("cell");

            }
            
            else{
                cell.innerHTML = "<button>";
                
                cell.onclick = function(){
                    // cell.classList.add("clickedCell")
                    cellClicked(cell);
                }
            }


            
        }
    }
}

function cellClicked(cell){
    if(!(cell.classList.contains("activeButton"))){
        cell.classList.add("activeButton");
    }
    else{
        console.log("undo")
        cell.classList.remove("activeButton");
    }
}