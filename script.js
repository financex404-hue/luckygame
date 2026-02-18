// Dice Game JavaScript Code
// खुशनसीब पासे का खेल

// Game Variables
let player1Score = 0;
let player2Score = 0;
let player1Rolls = 0;
let player2Rolls = 0;
let lastResult = '';

// DOM Elements
const dice1 = document.getElementById('dice1');
const dice2 = document.getElementById('dice2');
const rollBtn1 = document.getElementById('rollBtn1');
const rollBtn2 = document.getElementById('rollBtn2');
const resetBtn = document.getElementById('resetBtn');
const rulesBtn = document.getElementById('rulesBtn');
const closeBtn = document.getElementById('closeBtn');
const rulesModal = document.getElementById('rulesModal');
const resultText = document.getElementById('result-text');
const resultDetail = document.getElementById('result-detail');
const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');
const rolls1 = document.getElementById('rolls1');
const rolls2 = document.getElementById('rolls2');

// Initialize Game
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
});

// Roll Dice Function
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Animate Dice
function animateDice(diceElement, finalValue) {
    diceElement.classList.add('rolling');
    
    let rotations = 0;
    const interval = setInterval(() => {
        const randomNumber = rollDice();
        diceElement.querySelector('.dice-face').textContent = randomNumber;
        rotations++;
        
        if (rotations >= 8) {
            clearInterval(interval);
            diceElement.classList.remove('rolling');
            diceElement.querySelector('.dice-face').textContent = finalValue;
        }
    }, 80);
}

// Player 1 Roll
rollBtn1.addEventListener('click', function() {
    if (rollBtn1.disabled) return;
    
    rollBtn1.disabled = true;
    rollBtn2.disabled = false;
    
    const result = rollDice();
    player1Score = result;
    player1Rolls++;
    
    animateDice(dice1, result);
    
    setTimeout(() => {
        updateDisplay();
        checkWinner();
        rollBtn1.disabled = true;
    }, 600);
});

// Player 2 Roll
rollBtn2.addEventListener('click', function() {
    if (rollBtn2.disabled) return;
    
    rollBtn2.disabled = true;
    rollBtn1.disabled = false;
    
    const result = rollDice();
    player2Score = result;
    player2Rolls++;
    
    animateDice(dice2, result);
    
    setTimeout(() => {
        updateDisplay();
        checkWinner();
        rollBtn1.disabled = false;
    }, 600);
});

// Check Winner
function checkWinner() {
    if (player1Rolls > 0 && player2Rolls > 0) {
        if (player1Score > player2Score) {
            resultText.textContent = '🎉 Player 1 जीता! (Player 1 Wins!)';
            resultText.style.color = '#f5576c';
            resultDetail.textContent = `Player 1: ${player1Score} | Player 2: ${player2Score}`;
            lastResult = 'Player 1 Wins!';
        } else if (player2Score > player1Score) {
            resultText.textContent = '🎉 Player 2 जीता! (Player 2 Wins!)';
            resultText.style.color = '#667eea';
            resultDetail.textContent = `Player 1: ${player1Score} | Player 2: ${player2Score}`;
            lastResult = 'Player 2 Wins!';
        } else {
            resultText.textContent = '🤝 ड्रॉ! (Draw!)';
            resultText.style.color = '#f5af19';
            resultDetail.textContent = `दोनों को: ${player1Score} मिला (Both got: ${player1Score})`;
            lastResult = 'Draw!';
        }
        
        // Reset rolls for next round
        player1Rolls = 0;
        player2Rolls = 0;
        
        // Enable both buttons for next round
        setTimeout(() => {
            rollBtn1.disabled = false;
            rollBtn2.disabled = false;
        }, 1000);
    }
}

// Update Display
function updateDisplay() {
    score1.textContent = player1Score;
    score2.textContent = player2Score;
    rolls1.textContent = player1Rolls;
    rolls2.textContent = player2Rolls;
}

// Reset Game
resetBtn.addEventListener('click', function() {
    player1Score = 0;
    player2Score = 0;
    player1Rolls = 0;
    player2Rolls = 0;
    lastResult = '';
    
    dice1.querySelector('.dice-face').textContent = '1';
    dice2.querySelector('.dice-face').textContent = '1';
    
    resultText.textContent = 'खेल शुरू करो! (Start Playing!)';
    resultText.style.color = '#333';
    resultDetail.textContent = '';
    
    rollBtn1.disabled = false;
    rollBtn2.disabled = false;
    
    updateDisplay();
});

// Rules Modal
rulesBtn.addEventListener('click', function() {
    rulesModal.style.display = 'block';
});

closeBtn.addEventListener('click', function() {
    rulesModal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === rulesModal) {
        rulesModal.style.display = 'none';
    }
});

// Start with Player 1
rollBtn1.disabled = false;
rollBtn2.disabled = true;