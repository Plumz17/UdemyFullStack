var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;
document.querySelector(".img1").setAttribute("src", "images/dice"+randomNumber1+".png");
document.querySelector(".img2").setAttribute("src", "images/dice"+randomNumber2+".png");
var winText = "";
if (randomNumber1 > randomNumber2) {
    winText = "Player 1 Wins!";
} 
else if (randomNumber2 > randomNumber1) {
    winText = "Player 2 Wins!";
}
else {
    winText = "It's a tie!";
}
document.querySelector("h1").textContent = winText