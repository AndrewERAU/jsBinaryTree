var x = 2000
function myFunction() {
    var tmp = document.getElementById("userNum").value * document.getElementById("userNum").value;
    document.getElementById("output").innerHTML = tmp;
}
function init() {
   document.getElementById("output").innerHTML = x;
}

window.onload = init;
