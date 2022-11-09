import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

function TicTacToe() {

  const emtyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emtyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("O");
  const [winner, setWinner] = useState(null);

  const hendleCellClick = (index) => {

    if(winner) {
      alert("Jogo Finalizado!!")
      return null;
    }

    if(board[index] !=="") {
      alert("Posição Ocupada! Escolha uma vazia!")
      return null;
    }

    setBoard(board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item));
    
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
  }

  const checkWinner = () => {
    const possibleWaysToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    possibleWaysToWin.forEach(cells => {
      if(cells.every(cell => cell === "O")) setWinner("O");
      if(cells.every(cell => cell === "X")) setWinner("X");      
    });
  }

  const checkDraw = () => {
    if (board.every(item => item !== ""  && winner === null)) setWinner("E");    
  }

  checkDraw();
  useEffect(checkWinner, [board]);

  const resetGame = () => {
    {winner === "E" ? setCurrentPlayer("O") : setCurrentPlayer(winner);
  }    
    setBoard(emtyBoard);
    setWinner(null);
  }

  return (
    <main>
      <div className="boxBase">
        <h1 className="title">Jogo da Velha</h1>

        <div className={`board ${winner ? "game-over" : ""}`}>
          {board.map((item, index) => (
            <div 
              key={index} 
              className={`cell ${item}`}
              onClick={() => hendleCellClick(index)}
            >
              {item}
            </div>
          ))}
        
        </div>
      </div>

      {winner && 
        <div className="sectionWinner">
          <h1 className="titleWinner">Jogo Finalizado</h1>
          <div className="boxWinner">
          {winner === "E" ?
            <h2 className="winnerMessage">Empatou!!</h2>
          : 
            <h2 className="winnerMessage">
              <span className={winner}>{winner}</span> Venceu!!
            </h2>
          }
          </div>
          <button className="btnReset" onClick={resetGame}>Nova Partida</button>
      </div>
      }
    </main>
  );
}

export default TicTacToe;
