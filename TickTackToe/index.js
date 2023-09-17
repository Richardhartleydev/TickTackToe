// initialise elements
const ticTacToe = {
  $: {
    actionsButton: document.querySelector('[data-id="actions-btn"]'),
    options: document.querySelector('[data-id="options"]'),
    reset: document.querySelector('[data-id="reset-btn"]'),
    newRound: document.querySelector('[data-id="newRound-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
    homePage: document.querySelector('[data-id="homepage"]'),
    playAgain: document.querySelector('[data-id="playagain"]'),
    gameOver: document.querySelector('[data-id="gameOver"]'),
    gameOverText: document.querySelector('[data-id="gameOver-text"]'),
    turn: document.querySelector('[data-id="turn"]'),
  },

  //current player state on refresh
  state: {
    moves: [],
  },

  getGameStatus(moves) {
    const playerOneMoves = moves
      .filter(move => move.playerId === 1)
      .map(move => +move.squareId);
    const playerTwoMoves = moves
      .filter(move => move.playerId === 2)
      .map(move => +move.squareId);

    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let winner = null;

    winningPatterns.forEach(pattern => {
      const playerOneWins = pattern.every(v => playerOneMoves.includes(v));
      const playerTwoWins = pattern.every(v => playerTwoMoves.includes(v));

      if (playerOneWins) winner = 1;
      if (playerTwoWins) winner = 2;
    });

    return {
      status:
        moves.length === 9 || winner !== null ? "complete" : "in-progress",
      winner,
    };
  },

  //initialise all possible actions on game load
  initialisation: () => {
    ticTacToe.userPossibleActions();
  },

  //all clickable buttons / actions for player
  userPossibleActions: () => {
    ticTacToe.$.squares.forEach(square => {
      square.addEventListener("click", event => {
        const hasMove = squareId => {
          const existingMove = ticTacToe.state.moves.find(
            move => move.squareId === squareId
          );
          return existingMove !== undefined;
        };

        if (hasMove(+square.id)) {
          return;
        }

        const lastMove = ticTacToe.state.moves.at(-1);
        const getOppositePlayer = playerId => (playerId === 1 ? 2 : 1);
        const currentPlayer =
          ticTacToe.state.moves.length === 0
            ? 1
            : getOppositePlayer(lastMove.playerId);

        const nextPlayer = getOppositePlayer(currentPlayer);

        const crossIcon = document.createElement("i");
        const circleIcon = document.createElement("i");
        const turnLabel = document.createElement("p");
        turnLabel.innerText = `Player ${nextPlayer} - You're up!`;

        if (currentPlayer === 1) {
          crossIcon.classList.add("fa-solid", "fa-x", "turquoise");
          circleIcon.classList.add("fa-solid", "fa-o", "yellow");
          turnLabel.classList = "yellow";
        } else {
          crossIcon.classList.add("fa-solid", "fa-o", "yellow");
          circleIcon.classList.add("fa-solid", "fa-x", "turquoise");
          turnLabel.classList = "turqouise";
        }
        ticTacToe.$.turn.replaceChildren(circleIcon, turnLabel);

        ticTacToe.state.moves.push({
          squareId: +square.id,
          playerId: currentPlayer,
        });

        ticTacToe.state.currentPlayer = currentPlayer === 1 ? 2 : 1;
        square.replaceChildren(crossIcon);

        const game = ticTacToe.getGameStatus(ticTacToe.state.moves);
        if (game.status === "complete") {
          ticTacToe.$.gameOver.classList.remove("hidden");

          let message = "";
          if (game.winner) {
            message = `Player ${game.winner} wins!`;
          } else {
            message = "Tie game!";
          }

          ticTacToe.$.gameOverText.textContent = message;
        }
      });
    });

    ticTacToe.$.actionsButton.addEventListener("click", Event => {
      ticTacToe.$.options.classList.toggle("hidden");
    });

    ticTacToe.$.reset.addEventListener("click", Event => {
      /*TO DO*/
    });

    ticTacToe.$.newRound.addEventListener("click", Event => {
      /*TO DO*/
    });

    ticTacToe.$.playAgain.addEventListener("click", Event => {
      ticTacToe.state.moves = [];
      ticTacToe.$.squares.forEach(square => square.replaceChildren());
      ticTacToe.$.gameOver.classList.add("hidden");
    });

    ticTacToe.$.homePage.addEventListener("click", Event => {
      /*TO DO*/
    });
  },
};

window.addEventListener("load", () => ticTacToe.initialisation());
