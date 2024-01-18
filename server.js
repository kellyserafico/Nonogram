const solution = createSolution();
console.log(solution)
let wrongCounter = 100;
let rowCounter = [];



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

class Board{
    constructor(){
        this.table = document.createElement('table');
        this.text = document.createElement('p');
        
        //giving the text an id
        this.text.setAttribute('id', 'winStatus')
        document.body.appendChild(this.text)
        //set this.text to docu get elembyDI
        // this.text = document.getElementById('winStatus')

        this.createEmptyCells();
        this.table.addEventListener('contextmenu', (e) => e.preventDefault());

        document.body.appendChild(this.table) //smth like this.
        document.body.appendChild(this.text) //smth like this.
    }

    createEmptyCells() {
        for (let i = 0; i < 11; i++) {
            let tr = this.table.appendChild(document.createElement('tr')); // row
    
            for (let j = 0; j < 11; j++) {
                let cell = tr.appendChild(document.createElement('td'));
    
                if ((i == 0) && (j == 0)) { //corner cell
                    cell.innerHTML = " ";
                } else if ((i == 0) || (j == 0)) { // creates headers
                    if(i == 0){
                        cell.innerHTML = this.rowHeaders(solution)[j - 1];
                    }
                    if(j == 0){
                        cell.innerHTML = this.columnHeaders(solution)[i - 1];
                        
                    }
                    
                    cell.classList.add("nums");
                } else {
                    this.createClickableButtons(cell, solution[i-1][j-1]); //let newButton = this... newButton add id = i, j
                }
            }
        }
    }

    createClickableButtons(cell, correctValue){
        const button = document.createElement('button');
        button.value = correctValue;
        if(correctValue == 0){
            wrongCounter--;
        }
    
        button.addEventListener('mousedown', function(event){
            if(event.button === 0){ // Left Mouse Button                ////////////////////////////////////////////////////////////////////   
                if(!button.parentElement.classList.contains('activeButton')){

                    // console.log(button);                                 
                    button.parentElement.classList.add('activeButton');

                }


                if(button.parentElement.classList.contains('xButton')){
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
                document.getElementById('winStatus').innerHTML = "yay"
            }
            else{
                document.getElementById('winStatus').innerHTML = "no : ("
            }
            
        });
    
    
        cell.appendChild(button);
        cell.classList.add("cell");
    
    }
    
    columnHeaders(solution){
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
    
     rowHeaders(solution){
        
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

    
}








// Dependencies

var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/static/index.html'));
});

// // Serve the socket.io.js file with the correct MIME type
// app.get('/socket.io/socket.io.js', function(request, response) {
//   response.sendFile(path.join(__dirname, '/node_modules/socket.io/client-dist/socket.io.js'));
// });

// New connection
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('myCustomEvent', (data) => {
    console.log("Received data from client: ", data);
  });

  socket.on('createaNewBoard', (board = new Board) => {
    let b = board;
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});



// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on localhost:5000');
});


