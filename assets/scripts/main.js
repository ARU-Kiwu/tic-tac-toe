const gameboardDisplay = document.querySelector('.container')

const Gameboard = (function (){
    let gameboard = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    const checkWin = function(currentPlayer) {
        const winningCriteria = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for(let i = 0; i < winningCriteria.length; i++) {
            const [a, b, c] = winningCriteria[i];
            if(gameboard[a] && gameboard[a] === gameboard[b] && gameboard[b] === gameboard[c]) {
                game.gameOverSound.play()
                game.gameOver = true
                game.players[currentPlayer].score
                game.setGameOver()
                
            } 
        } 
    }

    const displayGameboard = (function() {
            gameboard.forEach((item, i) => {
                item = document.createElement('div')
                item.setAttribute('id', i)
                gameboardDisplay.appendChild(item)
            })
    })();

    const clearGameboardDisplay = function(){
        squares.forEach(square => {
            square.classList.remove('o', 'x')
            square.innerHTML = ''
        })
    }

    const clearGameboard = function() { 
        return gameboard = [
            '','','',
            '','','',
            '','','',
        ]
    }

    const checkBoard = function() {
        if(gameboard.every(item => item != '') && game.gameOver === false) {
            game.gameRestartSound.play()
            game.gameOver = true
            game.setGameOver()
        }
    }

    const squares = document.querySelectorAll('.container > div')
        squares.forEach(square => {
            square.addEventListener('click', ()=> {
                if(game.gameOver) return
                if(square.innerHTML !== '') return
                currentPlayer = players[game.getCurrentPlayer()]
                if(square.innerHTML === '')
                square.innerHTML = currentPlayer.mark
                if(currentPlayer.sound.currentTime >= 0) {
                    currentPlayer.sound.currentTime = 0;
                }
               
                currentPlayer.sound.play()
                
                gameboard[square.id] = square.innerHTML 
                if(square.innerHTML === 'X') {
                    square.classList.add('x')
                } else square.classList.add('o')
                checkWin(currentPlayer)
                checkBoard()
            })
        })

    return {
        squares,
        displayGameboard,
        clearGameboard,
        clearGameboardDisplay
    }
})();

const game = (function(){
   
    const oSound = new Audio('./assets/o-sound.ogg')
    const xSound = new Audio('./assets/x-sound.ogg')
    const gameRestartSound = new Audio('./assets/gameover.ogg')
    const gameOverSound = new Audio('./assets/someone-won.ogg')
    let currentPlayer = 1;
    let gameOver = false;
    const setGameOver = () => {
        gameOver = true
        const restart = setTimeout(() => {
            if(gameOver === true) {
                currentPlayer = currentPlayer === 0 ? 1 : 0;
                Gameboard.clearGameboard()
                Gameboard.clearGameboardDisplay()
                game.gameOver = false
            }
        }, 2000);
       
    };
    const getCurrentPlayer = () => currentPlayer = currentPlayer === 0 ? 1 : 0;

    const createPlayers = function(name, mark, sound, color){
        return {
            name, 
            mark,
            sound,
            color,
            score,
        }
    }
    
    const player1 = document.querySelector('#player1')
    const player2 = document.querySelector('#player2')

    let color1 = '#ff00ff';
    let color2 = '#ffff00';

    let player1Color = document.querySelector('#player1Color')
    player1Color.addEventListener('input', ()=> {
        color1 = player1Color.value
        document.documentElement.style.setProperty("--x-color", `${color1}`)
    })

    let player2Color = document.querySelector('#player2Color')
    player2Color.addEventListener('input', ()=> {
        color2 = player2Color.value
        document.documentElement.style.setProperty("--o-color", `${color2}`)      
    })

    players = [createPlayers(player1.value, 'X', xSound), createPlayers(player2.value, 'O', oSound)]
    
    const handleScore = (()=> {
        const player1Score = document.querySelector('#player1Score')
        player1Score.innerHTML = players[0].score
        const player2Score = document.querySelector('#player2Score')
        player2Score.innerHTML = players[1].score
    })();
    return {
        currentPlayer,
        getCurrentPlayer,
        setGameOver,
        gameOverSound,
        gameRestartSound,
        gameOver, 
        players,
        handleScore
    }
})();
