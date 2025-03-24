import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './App.css';

function Replay() {
  const location = useLocation();
  const navigate = useNavigate();
  const { rows, cols, gameplay } = location.state || { rows: 3, cols: 3, gameplay: [] };
  const [board, setBoard] = useState(Array(rows).fill(null).map(() => Array(cols).fill(null)));
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  useEffect(() => {
    if (gameplay && gameplay.length > 0) {
      const interval = setInterval(() => {
        if (currentMoveIndex < gameplay.length) {
          const { row, col, player } = gameplay[currentMoveIndex];
          const newBoard = board.map(row => [...row]);
          newBoard[row][col] = player;
          setBoard(newBoard);
          setCurrentMoveIndex(currentMoveIndex + 1);
        }
      }, 500); // ความเร็วในการ replay สามารถปรับได้

      return () => clearInterval(interval);
    }
  }, [currentMoveIndex, gameplay, board]);

  const handleBack = () => {
    navigate("/history");
  };

  return (
    <div>
      <h1>Replay Game</h1>
      <div className="board" >
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className="cell">
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleBack}>กลับไปที่ History</button>
    </div>
  );
}

export default Replay;
