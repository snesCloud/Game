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

let player_count = 1;
const players = []
let player_index;

let sleep = (milliseconds) => {
 return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function diceroller(elem) {
	elem.innerHTML = ".";
	await sleep(150);
	elem.innerHTML = "..";
	await sleep(150);
	elem.innerHTML = "...";
	await sleep(150);
	let min = Math.ceil(1);
	let max = Math.floor(6);
	return Math.floor(Math.random() * (max-min) + min);
}

document.getElementById('2').onclick = () => {
	player_count = 1;
	document.getElementById('player1').style.visibility = "visible";
	document.getElementById('player2').style.visibility = "visible";
	document.getElementById('player3').style.visibility = "hidden";
	document.getElementById('player4').style.visibility = "hidden";
	document.getElementById('playerCount').innerHTML = player_count;
}
document.getElementById('3').onclick = () => {
	player_count = 2;
	document.getElementById('player1').style.visibility = "visible";
	document.getElementById('player2').style.visibility = "visible";
	document.getElementById('player3').style.visibility = "visible";
	document.getElementById('player4').style.visibility = "hidden";
	document.getElementById('playerCount').innerHTML = player_count;
}
document.getElementById('4').onclick = () => {
	player_count = 3;
	document.getElementById('player1').style.visibility = "visible";
	document.getElementById('player2').style.visibility = "visible";
	document.getElementById('player3').style.visibility = "visible";
	document.getElementById('player4').style.visibility = "visible";
	document.getElementById('playerCount').innerHTML = player_count;
}

document.getElementById('dicecb').onclick = () => {
	(async () => {
        let dice_result = await diceroller(document.getElementById('diceval'));
		document.getElementById('diceval').innerHTML = dice_result;
	})()
}

document.getElementById('eventcb').onclick = () => {
	(async () => {
		await diceroller(document.getElementById('specialcard'));
	 	let index = Math.floor(Math.random() * event_cards.length);
		document.getElementById('specialcard').innerHTML = event_cards[index];
	})()
}

document.getElementById('start').onclick = () => {
	player_index = 1;
	document.getElementById('p1plc').innerHTML = " (dran)";
    for(i = 0; i < player_count; i++) {
        let prep_string = `p${i}`;
        players.push(prep_string);
    }
}

document.getElementById('nextround').onclick = () => {
    for(i = 0; i < player_count+1; i++) {
        document.getElementById(`p${i+1}plc`).innerHTML = "";
    }
    document.getElementById(`p${player_index+1}plc`).innerHTML = " (dran)";
    (player_count === player_index) ? player_index = 0 : player_index++;
}

document.getElementById('player1').setAttribute("width", screen.width);
document.getElementById('player2').setAttribute("width", screen.width);
document.getElementById('player3').setAttribute("width", screen.width);
document.getElementById('player4').setAttribute("width", screen.width);
