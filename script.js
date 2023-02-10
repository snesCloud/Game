const event_cards = [];
event_cards.push(
	"Du hast Lobosch die Hand aufgelegt und wurdest erwischt! Gehe zurück zum letzten Checkpoint. Dein Zug ist beendet.",
	"Du bemühst dich beim erlernen der schwarzen Magie! Rücke 5 Felder vor.",
	"Du brichst bei der Arbeit des Gevatters zusammen! Setze eine runde aus. Dein Zug ist beendet.",
	"Der Meister lässt dich nur Nachts arbeiten, wenn es anstrengender ist! Wenn du eine drei Würfelst, darfst du nicht erneut Würfeln.",
	"Du und die Gesellen ärgern die Anwerber des sächsichen Kurfürsten und habt viel Spaß dabei! Würfle erneut.",
	"Witko braucht Hilfe bei der Arbeit! Zeige diese Karte einem anderen Spieler. Dieser wird in der nächsten Runde aussezen müssen.",
	"Das Grundeis muss entfernt werden! Zeige diese Karte einem anderen Spieler. Dieser muss 10 Felder zurück.",
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
let player_index;
let dice_result;
let i;

let pfd = [
    {field: 0, tokens: 0}, // Player 0
    {field: 0, tokens: 0}, // Player 1
    {field: 0, tokens: 0}, // Player 2
    {field: 0, tokens: 0}, // Player 3
    {field: 0, tokens: 0}  // Player Buffer
];

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
	document.getElementById('playerCount').innerHTML = (player_count + 1).toString();
}
document.getElementById('3').onclick = () => {
	player_count = 2;
	document.getElementById('player1').style.visibility = "visible";
	document.getElementById('player2').style.visibility = "visible";
	document.getElementById('player3').style.visibility = "visible";
	document.getElementById('player4').style.visibility = "hidden";
    document.getElementById('playerCount').innerHTML = (player_count + 1).toString();
}
document.getElementById('4').onclick = () => {
	player_count = 3;
	document.getElementById('player1').style.visibility = "visible";
	document.getElementById('player2').style.visibility = "visible";
	document.getElementById('player3').style.visibility = "visible";
	document.getElementById('player4').style.visibility = "visible";
    document.getElementById('playerCount').innerHTML = (player_count + 1).toString();
}

document.getElementById('dicecb').onclick = () => {
	(async () => {
        dice_result = await diceroller(document.getElementById('diceval'));
		document.getElementById('diceval').innerHTML = dice_result;
        if(player_index !== 0) {
            pfd[player_index-1]["field"] += dice_result;
            document.getElementById(`p${player_index}field`).innerHTML = pfd[player_index-1]["field"];
        } else {
            pfd[player_count+1]["field"] += dice_result;
            document.getElementById(`p${player_count+1}field`).innerHTML = pfd[player_count+1]["field"];
        }
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
	document.getElementById('playerselect').remove();
}

document.getElementById('nextround').onclick = () => {
    for(i = 0; i < player_count+1; i++) {
        document.getElementById(`p${i+1}plc`).innerHTML = "";
    }
    i = 0;
    document.getElementById(`p${player_index+1}plc`).innerHTML = " (dran)";
    (player_count === player_index) ? player_index = 0 : player_index++;
}

document.getElementById('player1').setAttribute("width", (screen.width).toString());
document.getElementById('player2').setAttribute("width", (screen.width).toString());
document.getElementById('player3').setAttribute("width", (screen.width).toString());
document.getElementById('player4').setAttribute("width", (screen.width).toString());
