var socket = io();


let inp = document.getElementById('hai')

inp.addEventListener("keypress", (event) => {
    if (event['key'] == 'Enter'){
        let text = inp.value
        socket.emit('peepee', inp.value);
        // socket.emit('peepee2', inp.value + 'KELLY');
    }
});

socket.on("hello", (msg) => {
    console.log(msg);
});