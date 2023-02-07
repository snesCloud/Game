const event_cards = [];
event_cards.push(
"Karte 0",
"Karte 1",
"Karte 2",
"Karte 3",
"Karte 4",
"Karte 5",
"Karte 6",
"Karte 7",
"Karte 8",
"Karte 9",
"Karte 10",
"Karte 11",
"Karte 12",
"Karte 13",
"Karte 14",
"Karte 15",
"Karte 16",
"Karte 17",
"Karte 18",
"Karte 19"
);




let player_count = 2;
let screen_width = screen.width;

let diceroller = () => {
	return Math.floor(Math.random() * 6) + 1;
}

document.getElementById('2').onclick = () => {
	player_count = 2;
	document.getElementById('player1').style.visibility = "visible";
	document.getElementById('player2').style.visibility = "visible";
	document.getElementById('player3').style.visibility = "hidden";
	document.getElementById('player4').style.visibility = "hidden";
	document.getElementById('playerCount').innerHTML = player_count;
}
document.getElementById('3').onclick = () => {
	player_count = 3;
	document.getElementById('player1').style.visibility = "visible";
	document.getElementById('player2').style.visibility = "visible";
	document.getElementById('player3').style.visibility = "visible";
	document.getElementById('player4').style.visibility = "hidden";
	document.getElementById('playerCount').innerHTML = player_count;
}
document.getElementById('4').onclick = () => {
	player_count = 4;
	document.getElementById('player1').style.visibility = "visible";
	document.getElementById('player2').style.visibility = "visible";
	document.getElementById('player3').style.visibility = "visible";
	document.getElementById('player4').style.visibility = "visible";
	document.getElementById('playerCount').innerHTML = player_count;
}

document.getElementById('dicecb').onclick = () => {
	document.getElementById('diceval').innerHTML = diceroller();
}

document.getElementById('eventcb').onclick = () => {
	let index = Math.floor(Math.random() * event_cards.length);
	document.getElementById('specialcard').innerHTML = event_cards[index];
}

document.getElementById('player1').setAttribute("width", screen.width);
document.getElementById('player2').setAttribute("width", screen.width);
document.getElementById('player3').setAttribute("width", screen.width);
document.getElementById('player4').setAttribute("width", screen.width);
