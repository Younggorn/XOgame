import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";

function Playwithbot() {
  const location = useLocation(); 
  const { rows, cols, winCondition, currentPlayer, whofirst } = location.state;

  const navigate = useNavigate(); 

  const [board, setBoard] = useState(
    Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(null))
  );

  const [currentTurn, setCurrentTurn] = useState(currentPlayer);
  const [winner, setWinner] = useState(null);
  const [gameplay, setGameplay] = useState([]);

  useEffect(() => {
    if (whofirst === 'Bot') {
      handleBotMove(board);
    }
  }, [whofirst]);

  const handleCellClick = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] === null && !winner && currentTurn === "X") {
      const newBoard = board.map((row) => [...row]);
      newBoard[rowIndex][colIndex] = currentTurn;
      setBoard(newBoard);

      setGameplay(prevGameplay => {
        const updatedGameplay = [...prevGameplay, { player: currentTurn, row: rowIndex, col: colIndex }];
        const gameWinner = checkWinner(newBoard);

        if (gameWinner || newBoard.every(row => row.every(cell => cell !== null))) {
          saveGameHistory(gameWinner || 'Draw', updatedGameplay);
          setWinner(gameWinner || 'Draw');
        } else {
          setCurrentTurn("O");
          handleBotMove(newBoard);
        }
        return updatedGameplay;
      });
    }
  };

  const handleBotMove = (currentBoard) => {
    setTimeout(() => {
      const bestMove = findBestMove(currentBoard, winCondition);
      if (bestMove) {
        const [row, col] = bestMove;
        const newBoard = currentBoard.map((row) => [...row]);
        newBoard[row][col] = "O";
        setBoard(newBoard);

        setGameplay(prevGameplay => {
          const updatedGameplay = [...prevGameplay, { player: "O", row, col }];
          const gameWinner = checkWinner(newBoard);

          if (gameWinner || newBoard.every(row => row.every(cell => cell !== null))) {
            saveGameHistory(gameWinner || 'Draw', updatedGameplay);
            setWinner(gameWinner || 'Draw');
          } else {
            setCurrentTurn("X");
          }
          return updatedGameplay;
        });
      }
    }, 500); 
  };

  const checkWinner = (board) => {
    const directions = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: -1 },
    ];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const player = board[r][c];
        if (!player) continue;

        for (let { x, y } of directions) {
          let count = 1;
          for (let i = 1; i < winCondition; i++) {
            const nr = r + i * y;
            const nc = c + i * x;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === player) {
              count++;
            } else break;
          }
          if (count === winCondition) return player;
        }
      }
    }
    return null;
  };

  const getAvailableMoves = (board) => {
    const moves = [];
    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === null) moves.push([rowIndex, colIndex]);
      });
    });
    return moves;
  };

  const minimax = (board, depth, isMaximizing, maxDepth) => {
    const winner = checkWinner(board);
  
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (getAvailableMoves(board).length === 0) return 0;
    if (depth >= maxDepth) return 0;
  
    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const [row, col] of getAvailableMoves(board)) {
        board[row][col] = 'O';
        const evalScore = minimax(board, depth + 1, false, maxDepth);
        board[row][col] = null;
        maxEval = Math.max(maxEval, evalScore);
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const [row, col] of getAvailableMoves(board)) {
        board[row][col] = 'X';
        const evalScore = minimax(board, depth + 1, true, maxDepth);
        board[row][col] = null;
        minEval = Math.min(minEval, evalScore);
      }
      return minEval;
    }
  };
  
  const findBestMove = (board) => {
    const maxDepth = 4;
    let bestMove = null;
    let bestScore = -Infinity;
  
    for (const [row, col] of getAvailableMoves(board)) {
      board[row][col] = 'O';
      const score = minimax(board, 0, false, maxDepth);
      board[row][col] = null;
  
      if (score > bestScore) {
        bestScore = score;
        bestMove = [row, col];
      }
    }
    return bestMove;
  };
  

  const saveGameHistory = async (winner, gameplayData) => {
    const { data, error } = await supabase.from("history").insert([
      {
        rowsy: rows,
        colsx: cols,
        wincon: winCondition,
        winner: winner,
        gameplay: gameplayData,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) console.error("Error saving history:", error.message);
    else console.log("History saved successfully:", data);
  };

  return (
    <>
      <h1>XO Game - Play</h1>
      {winner && <h2>ผู้ชนะคือ: {winner}!</h2>}
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="cell"
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/")}>เริ่มเกมใหม่</button>
    </>
  );
}

export default Playwithbot;
