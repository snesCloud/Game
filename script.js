let player_count = 2;


document.getElementById('2').onclick = () => {
	player_count = 2;
	document.getElementById('playerCount').innerHTML = player_count;
}
document.getElementById('3').onclick = () => {
	player_count = 3;
	document.getElementById('playerCount').innerHTML = player_count;
}
document.getElementById('4').onclick = () => {
	player_count = 4;
	document.getElementById('playerCount').innerHTML = player_count;
}
