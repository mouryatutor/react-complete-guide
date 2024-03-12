import Player from "./components/Player";
import Gameboard from "./components/Gameboard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X')
  {
     currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  // const [activePlayer,setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const [players,setPlayers] = useState({
    'X': 'Player 1',
    'O': 'Player 2'
  })

  function handlePlayerNameChange(symbol,player)
  {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]:player
      }
    });
  }

  let gameBoard = [...initialGameBoard.map(innerArr => [...innerArr])];

  for(const turn of gameTurns)
  {
      const {square,player} = turn;
      const {row , col} = square;
      gameBoard[row][col] = player;
  }

  let winner = null;

  for(const combination of WINNING_COMBINATIONS)
  {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column] 
    const thirdSquareSymbol =  gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol == thirdSquareSymbol)
    {
      winner = players[firstSquareSymbol];
    }

  }

  const hasDraw = (gameTurns.length === 9 && !winner);
  
  function handleSelectSquare(rowIndex,colIndex)
  {
    // setActivePlayer((prevActivePlayler) => prevActivePlayler === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {square:{row:rowIndex,col:colIndex},player:currentPlayer},
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart()
  {
    setGameTurns([]);
  }

  return (
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
             <Player initialName="Player 1" symbol="X" onChangePlayerName={handlePlayerNameChange} isActive={activePlayer === 'X'} />
             <Player initialName="Player 2" symbol="O" onChangePlayerName={handlePlayerNameChange} isActive={activePlayer === 'O'}/>
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
          <Gameboard board={gameBoard}  onSelectSquare={handleSelectSquare}/>
        </div>
        <Log turns={gameTurns} />
      </main>
  )
}

export default App
