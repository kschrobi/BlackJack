//Card Variables
var suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
var values = ["Ace", "King", "Queen", "Jack",
    "Ten", "Nine", "Eight", "Seven", "Six", "Five",
    "Four", "Three", "Two"];


//Dom Variables
var textArea = document.getElementById("text-area");
var newGameButton = document.getElementById("new-game-button");
var hitButton = document.getElementById("hit-button");
var stayButton = document.getElementById("stay-button");

//Game Variables
var gameStarted = false,
	gameOver = false,
	playerWon = false,
	dealerCards = [],
	playerCards = [],
	dealerScore = 0,
	playerScore = 0,
	deck = [];

hitButton.style.display = "none";
stayButton.style.display = "none";
showStatus();


newGameButton.addEventListener("click",function() {
	gameStarted = true;
	gameOver = false;
	playerWon = false;
	
	deck = createDeck();
	playerCards = [drawCard(deck.length), drawCard(deck.length)];
	dealerCards = [drawCard(deck.length), drawCard(deck.length)];
	
	newGameButton.style.display = "none";
	hitButton.style.display = "inline";
	stayButton.style.display = "inline";
	showStatus();
	
	var playerCardsString = "";
	for(var p = 0; p < playerCards.length; p++){
		playerCardsString = playerCardsString + getCardString(playerCards[p]) + "\n";
	}
	
	var dealerCardsString = "";
	for(var d = 0; d < dealerCards.length; d++){
		dealerCardsString = dealerCardsString + getCardString(dealerCards[d]) + "\n";
	}
	
	updateScores();
	
	textArea.innerText = 
		"Dealer has:\n" +
		dealerCardsString +
		"(Score: " + dealerScore + ")\n\n" +
		
		"Player has:\n" +
		playerCardsString +
		"(Score: " + playerScore + ")\n\n";
	
	if (gameOver){
		if(playerWon){
			textArea.innerText += "You Win!";
		}
		else{
			textArea.innerText += "Dealer Wins!";
		}
		newGameButton.style.display = "inline";
		hitButton.style.display = "inline";
		stayButton.style.display = "inline";
	}
			
});

function createDeck(){
	var deck = [];
	for (var i = 0; i < suits.length; i++){
  		for (var a = 0; a < values.length; a++){
			var card = {
				suit: suits[i],
				value: values[a]
			};
	  		deck.push(card);
  		}
	}
	return deck;
}

function drawCard(maxLength){
	var randomNumber = Math.floor(Math.random() * maxLength);
	deck.splice(randomNumber, 1);
	return deck[randomNumber];
	
}

function getCardString(card){
	return card.value + " of " + card.suit;
}

function getScore(cards){
	var score = 0;
	for(var c = 0; c < cards.length; c++){
		var card = cards[c];
				
		if (card.value === "King" || card.value === "Queen" || card.value === "Jack" || card.value === "Ten"){
			score = score + 10;
		}
		else if(card.value === "Ace"){
			if(score + 11 > 21){
				score = score + 1;
			}
			else{
				score = score + 11;
			}
		}
		else{
			score = score + getNumericValue(card); 
		}			
	}
	return score;
}

function getNumericValue(card){
	switch(card.value){
		case "Two":
			return 2;
		case "Three":
			return 3;
		case "Four":
			return 4;
		case "Five":
			return 5;	
		case "Six":
			return 6;
		case "Seven":
			return 7;
		case "Eight":
			return 8;
		case "Nine":
			return 9;
	}
}


function updateScores(){
	dealerScore = getScore(dealerCards);
	playerScore = getScore(playerCards);
}

function showStatus(){
	if(!gameStarted){
		textArea.innerText = 'Welcome to BlackJack!'
	}
}					   