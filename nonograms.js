// var table = document.getElementById("canvasBoard");
// createEmptyCells();

// function createEmptyCells(){
//     for(let i = 0; i < 11; i++){
//         let tr = table.appendChild(document.createElement('tr')); //row
        
//         for(let j = 0; j < 11; j++){
//             let cell = tr.appendChild(document.createElement('td'));

//             if((i == 0) && (j == 0)){
//                 cell.innerHTML = " ";
//             }
//             else if((i == 0) || (j == 0)){ //creates headers
//                 cell.innerHTML = ": 3";
//                 cell.classList.add("nums");
//                 // console.log(cell)
//             }
            
//             else{
//                 createClickableButtons(cell);
//             }
//         }
//     }
// }

// function createClickableButtons(cell){
//     cell.innerHTML = "<button>";
//     cell.classList.add("cell");
    
//     const buttons = document.querySelectorAll('.cell');
//     let isMouseDown = false;
    
//     buttons.forEach(function(button) {
//       button.addEventListener('mousedown', function() {
//         isMouseDown = true;
//         toggleButton(button);
//       });
    
//       button.addEventListener('mouseup', function() {
//         isMouseDown = false;
//       });
    
//       button.addEventListener('mouseenter', function() {
//         if (isMouseDown) {
//           toggleButton(button);
//         }
//       });
//     });
    
//     function toggleButton(button) {
//       if (button.classList.contains('active')) {
//         button.classList.remove('active');
//         // Add your desired action here when the button is deactivated
//       } else {
//         button.classList.add('active');
//         cellClicked(cell)
//       }
//     }



// }


// function cellClicked(cell){
//     if(!(cell.classList.contains("activeButton"))){
//         cell.classList.add("activeButton");
//     }
//     else{
//         console.log("undo")
//         cell.classList.remove("activeButton");
//     }
// }



var table = document.getElementById("canvasBoard");
createEmptyCells();

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
    button.addEventListener('mouseenter', function () {
        if (isMouseDown) {
            toggleButton(button);
        }
    });

    cell.appendChild(button);
    cell.classList.add("cell");
}

let isMouseDown = false;

window.addEventListener('mousedown', function () {
    isMouseDown = true;
});

window.addEventListener('mouseup', function () {
    isMouseDown = false;
});

function toggleButton(button) {
    if (button.classList.contains('active')) {
        button.classList.remove('active');
        cellClicked(button.parentElement);
    } else {
        button.classList.add('active');
        cellClicked(button.parentElement);
    }
}

function cellClicked(cell) {
    if (!(cell.classList.contains("activeButton"))) {
        cell.classList.add("activeButton");
    } else {
        cell.classList.remove("activeButton");
    }
}