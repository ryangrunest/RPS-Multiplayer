var config = {
    apiKey: "AIzaSyC7wfU9766B6uFtYp03lzdaYCxVlbYYTFQ",
    authDomain: "rockpaperscissors-91926.firebaseapp.com",
    databaseURL: "https://rockpaperscissors-91926.firebaseio.com",
    projectId: "rockpaperscissors-91926",
    storageBucket: "",
    messagingSenderId: "440817442575"
  };
  firebase.initializeApp(config);


  var player;
  var p1 = firebase.database().ref('player1');
  var p2 = firebase.database().ref('player2');

function loadPlayerDiv() {
	$('.load-character').text('');
	let mainJumbo = $('<div>').attr('class', 'jumbotron text-center');
	let playerHeader = $('<h2>').text(`Player ${player}`);
	let buttonsDiv = $('<div>').attr('class', 'buttons-div');
	let rockButton = $('<button>').attr('id', 'rock').html('<i class="fas fa-hand-rock"></i>').attr('class', 'player-choice');
	let paperButton = $('<button>').attr('id', 'paper').html('<i class="fas fa-hand-paper"></i>').attr('class', 'player-choice');
	let scissorsButton = $('<button>').attr('id', 'scissors').html('<i class="fas fa-hand-scissors"></i>').attr('class', 'player-choice');
	buttonsDiv.append(rockButton, paperButton, scissorsButton);
	mainJumbo.append(playerHeader, buttonsDiv);
	$('.load-character').append(mainJumbo);
}

// Picking player functionality 
$('#player-pick-1').on('click', function() {
	// alert('clicked ' + $(this).attr('id'));
	$(this).html('<div class="lds-ripple"><div></div><div></div></div>');
	player = '1';
	setTimeout(loadPlayerDiv, 2000);
})
$('#player-pick-2').on('click', function() {
	// alert('clicked ' + $(this).attr('id'));
	$(this).html('<div class="lds-ripple"><div></div><div></div></div>');
	player = '2';
	setTimeout(loadPlayerDiv, 2000);
})


$(document).on('click', '.player-choice', function() {
	let selection = $(this).attr('id');
	if (player === '1') {
		alert(player + selection);
		p1.set({
			Choice: selection
		})

	} else if (player === '2') {
		alert(player + selection);
		p2.set({
			Choice: selection
		})

	}
});

firebase.database().ref().on('value', function(snapshot) {
	// update ui if players are being used
	if (snapshot.child('player1').exists()) {
		$('#player-pick-1').text('');
		var alreadyPicked = $('<h2>').text('Player 1 is already connected');
		$('#player-pick-1').append(alreadyPicked);
		$('#player-pick-1').off('click');
	}
	if (snapshot.child('player2').exists()) {
		$('#player-pick-2').text('');
		var alreadyPicked = $('<h2>').text('Player 2 is already connected');
		$('#player-pick-2').append(alreadyPicked);
		$('#player-pick-2').off('click');
	}



	if (snapshot.child('player1').exists() && snapshot.child('player2').exists()) {
		if (snapshot.child('player1').val().Choice === 'rock') {
			if (snapshot.child('player2').val().Choice === 'scissors') {
				alert('player 1 is the winner');
			} else if (snapshot.child('player2').val().Choice === 'rock') {
				alert('its a tie');
			} else {
				alert('player 2 is the winner');
			}
		} else if (snapshot.child('player1').val().Choice === 'paper') {
			if (snapshot.child('player2').val().Choice === 'scissors') {
				alert('player 2 is the winner');
			} else if (snapshot.child('player2').val().Choice === 'rock') {
				alert('player 1 is the winner');
			} else {
				alert('tie');
			}

		} else if (snapshot.child('player1').val().Choice === 'scissors') {
			if (snapshot.child('player2').val().Choice === 'scissors') {
				alert('tie');
			} else if (snapshot.child('player2').val().Choice === 'rock') {
				alert('player 2 is the winner');
			} else {
				alert('player 1 is the winner');
			}
		}
		p1.remove();
		p2.remove();
	}
	// console.log(snapshot);
	// console.log(snapshot.child('player1').val().Choice);
})

