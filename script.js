var scores, roundScore, activePlayer, gamePlaying;

init();

//Configure Roll Button
document.querySelector('.btn-roll').addEventListener('click', function () {
 	//Check if the game has been initialized
 	if (gamePlaying) {
		//1. Random Number For Both Dice
		var dice0 = Math.floor(Math.random() * 6) + 1;
		var dice1 = Math.floor(Math.random() * 6) + 1;

		//2. Display Dice Result
		document.querySelector('.dice-0').style.display = 'block';
		document.querySelector('.dice-1').style.display = 'block';
		document.querySelector('.dice-0').src = 'dice-' + dice0 + '.png';
		document.querySelector('.dice-1').src = 'dice-' + dice1 + '.png';
		document.querySelector('#roll-'+ activePlayer).textContent = `Last Roll: ${dice0} + ${dice1}`;

		//3. Update the round score IF the rolled number was not a 1
		if (dice0 === 1 && dice1 === 1) {
				scores[activePlayer] = 0;
				document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
				nextPlayer();
		} else if (dice0 === 1 || dice1 === 1) {
			nextPlayer();
		} else {
			//Add score
			roundScore += dice0 + dice1;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}
	}
});

//Configure Hold Button
document.querySelector('.btn-hold').addEventListener('click', function () {
	//Check if the game has been initialized
	if(gamePlaying){
		//1. Add current score to global score
		scores[activePlayer] += roundScore;

		//2. Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		//3. Get the winning score
		var input = document.getElementById('w-score').value;
		var winningScore;

		if(input) {
			winningScore = input;
		} else {
			document.getElementById('w-score').value = 100;
			winningScore = 100;
		}

		//4. Check if player won the game
		if (scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice-0').style.display = 'none';
			document.querySelector('.dice-1').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			//Next Player
			nextPlayer();
		}
	}
});

//Jump to the next player
function nextPlayer () {
	//1. Change player and reset round score
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	document.getElementById('current-0').textContent ='0';
	document.getElementById('current-1').textContent ='0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.querySelector('.dice-0').style.display = 'none';
	document.querySelector('.dice-1').style.display = 'none';
}

//Configure New Game button to reinitialize game
document.querySelector('.btn-new').addEventListener('click', init);

//Initialize the game by resetting all scores
function init() {
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	document.querySelector('.dice-0').style.display = 'none';
	document.querySelector('.dice-1').style.display = 'none';

	document.querySelector('#roll-0').textContent = `Last Roll:`;
	document.querySelector('#roll-1').textContent = `Last Roll:`;
	
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.getElementById('w-score').value = 100;

	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}