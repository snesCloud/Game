const event_cards = [];
event_cards.push(
	"Du hast Lobosch die Hand aufgelegt und wurdest erwischt! Setze eine Runde aus. Dein Zug ist beendet.",
	"Du bist bei der Arbeit des Gevatters zusammengebrochen und musst dich ausruhen! Setze eine Runde aus. Dein Zug ist beendet.",
	"Die Osternacht ist gekommen und du gehst mit einem anderen Gesellen zu „Bäumels Tod“. Gehe zum dir nächsten Spieler nach vorne oder zurück.",
	"Witko benötigt Hilfe bei der Arbeit! Zeige diese Karte einem beliebigen Spieler. Dieser wird in der nächsten Runde aussetzen müssen.",
	"Die Neujahrsnacht kommt und alle sind ängstlich. Du darfst bis zum Ende dieses Jahres bei einer 3 nicht nochmal würfeln.",
	"Der Meister lässt euch nur in der Nacht arbeiten! Du bist erschöpft und musst eine Runde aussetzen. Dein Zug ist beendet.",
	"Du strengst dich beim Erlernen der schwarzen Künste an! Du darfst noch einmal würfeln.",
	"Der Meister hat dir frei gegeben! Gehe 5 Felder nach vorn.",
	"Du und die anderen Gesellen ärgern die Anwerber! Jeder Spieler rückst zwei Felder nach vorne.",
	"Das Mühlrad muss ersetzt werden! Zeige diese Karte einem anderen Spieler. Dieser muss 4 Felder zurück gehen.",
	"Der Meister nimmt dich mit nach Dresden und zeigt dir einen neuen Zauberspruch, durch den du viel schneller Arbeiten kannst. Rücke 5 Felder nach vorne.",
	"Pumphutt hat den Meister überlistet und alle kriegen mehr Essen. Alle Spieler dürfen 3 Felder nach vorne rücken.",
	"Du musst die Geschichte des Meisters und Jirko nachspielen. Dabei wirst du von der Munition verletzt und musst dich für eine Weile ausruhen. Gehe zum Anfang des Jahres zurück.",
	"Du bist mit deinen Gedanken nur noch bei der Kantorka und kannst dich nicht mehr richtig auf die Arbeit konzentrieren. Du darfst bis zum Ende des Jahres bei einer 3 nicht mehr würfeln.",
	"Der Meister will, dass du die Mühle übernimmst. Du lehnst jedoch ab und bekommst eine Woche Gedenkzeit, in der du keine Magie verwenden kannst. Setze eine Runde aus. Dein Zug ist beendet.",
	"Du hast einen praktischen Zauber erlernt. Suche dir einen Token aus und nehme in zu dir.",
);

let player_count = 1;
let player_index;
let dice_result;
let i;

let tombstones = [
	true,
	true,
	true
];

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

let player_move = (proc_player, newfield, type) => {
	if(type === 0) {
		pfd[proc_player - 1]["field"] = newfield;
        document.getElementById(`p${proc_player}field`).innerHTML = newfield;
	}
	else if(type === 1) {
        pfd[player_count + 1]["field"] = newfield;
        document.getElementById(`p${player_count + 1}field`).innerHTML = newfield;
    }
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
			if(pfd[player_index-1]["field"] + dice_result <= 53) {
				pfd[player_index-1]["field"] += dice_result;
				document.getElementById(`p${player_index}field`).innerHTML = pfd[player_index-1]["field"];
				// Tombstones
				if(document.getElementById(`p${player_index}field`).innerHTML === "8") {
					if(tombstones[0]) {
						pfd[player_index-1]["tokens"] += 1;
						document.getElementById(`p${player_index}tokens`).innerHTML = pfd[player_index-1]["tokens"];
					}
					document.getElementById('tomb1').innerHTML = "&#215;";
					tombstones[0] = false;
				}
				if(document.getElementById(`p${player_index}field`).innerHTML === "23") {
					if(tombstones[1]) {
						pfd[player_index-1]["tokens"] += 1;
						document.getElementById(`p${player_index}tokens`).innerHTML = pfd[player_index-1]["tokens"];
					}
					document.getElementById('tomb2').innerHTML = "&#215;";
					tombstones[1] = false;
				}
				if(document.getElementById(`p${player_index}field`).innerHTML === "42") {
					if(tombstones[2]) {
						pfd[player_index-1]["tokens"] += 1;
						document.getElementById(`p${player_index}tokens`).innerHTML = pfd[player_index-1]["tokens"];
					}
					document.getElementById('tomb3').innerHTML = "&#215;";
					tombstones[2] = false;
				}
				if(pfd[player_index-1]["field"] === 53) {
					document.getElementById('dicecb').style.visibility = "hidden";
					document.getElementById('eventcb').style.visibility = "hidden";
					alert(`Spieler ${player_index} hat das Spiel gewonnen!`);
				}
				// Ladders and sliedes
				switch(pfd[player_index-1]["field"]) {
					// Ladders
					case 6:
						player_move(player_index, 16, 0);
					    break;
					case 21:
						player_move(player_index, 28, 0);
						break;
					case 32:
						player_move(player_index, 44, 0);
						break;

					// Slides
					case 19:
						player_move(player_index, 3, 0);
                        break;
					case 34:
						player_move(player_index, 14, 0);
						break;
					case 52:
						player_move(player_index, 40, 0);
						break;
					default:
						break;
				}
			}	
        } else {
			if(pfd[player_count+1]["field"] + dice_result <= 53) {
				pfd[player_count+1]["field"] += dice_result;
				document.getElementById(`p${player_count+1}field`).innerHTML = pfd[player_count+1]["field"];
				if(document.getElementById(`p${player_count+1}field`).innerHTML === "8") {
					if(tombstones[0]) {
						pfd[player_count+1]["tokens"] += 1;
						document.getElementById(`p${player_count+1}tokens`).innerHTML = pfd[player_count+1]["tokens"];
					}
					document.getElementById('tomb1').innerHTML = "&#215;";
					tombstones[0] = false;
				}
				if(document.getElementById(`p${player_count+1}field`).innerHTML === "23") {
					if(tombstones[1]) {
						pfd[player_count+1]["tokens"] += 1;
						document.getElementById(`p${player_count+1}tokens`).innerHTML = pfd[player_count+1]["tokens"];
					}
					document.getElementById('tomb2').innerHTML = "&#215;";
					tombstones[1] = false;
				}
				if(document.getElementById(`p${player_count+1}field`).innerHTML === "42") {
					if(tombstones[2]) {
						pfd[player_count+1]["tokens"] += 1;
						document.getElementById(`p${player_count+1}tokens`).innerHTML = pfd[player_count+1]["tokens"];
					}
					document.getElementById('tomb3').innerHTML = "&#215;";
					tombstones[2] = false;
				}
			} else if (pfd[player_count+1]["field"] === 53) {
				document.getElementById('dicecb').style.visibility = "hidden";
				document.getElementById('eventcb').style.visibility = "hidden";
				alert(`Spieler ${player_count+1} hat das Spiel gewonnen!`);
			}
			// Ladders and sliedes
			switch(pfd[player_count + 1]["field"]) {
				// Ladders
				case 6:
					player_move(player_index, 16, 1);
					break;
				case 21:
					player_move(player_index, 28, 1);
					break;
				case 32:
					player_move(player_index, 44, 1);
					break;

				// Slides
				case 19:
					player_move(player_index, 3, 1);
					break;
				case 34:
					player_move(player_index, 14, 1);
					break;
				case 52:
					player_move(player_index, 40, 1);
					break;
				default:
					break;
			}
        }
	})()
}

document.getElementById('eventcb').onclick = () => {
	(async () => {
		await diceroller(document.getElementById('specialcard'));
	 	let index = Math.floor(Math.random() * event_cards.length);
		alert(event_cards[index]);
		document.getElementById('specialcard').innerHTML = "Ereigniskarte";
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
