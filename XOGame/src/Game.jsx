import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";

function Game() {
  const location = useLocation(); // สร้างตัวแปร location โดยใช้ useLocation() เพื่อใช้ในการรับค่าจากหน้า App
  const { rows, cols, winCondition, currentPlayer } = location.state;

  const navigate = useNavigate(); // สร้างตัวแปร navigate โดยใช้ useNavigate() เพื่อใช้ในการเปลี่ยนหน้า

  const [board, setBoard] = useState(
    Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(null))
  );

  const [currentTurn, setCurrentTurn] = useState(currentPlayer);
  const [winner, setWinner] = useState(null);
  const [gameplay, setGameplay] = useState([]); // สำหรับเก็บข้อมูลการเล่นทั้งหมด

  const handleCellClick = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] === null && !winner) {
      const newBoard = board.map((row) => [...row]);
      newBoard[rowIndex][colIndex] = currentTurn;
      setBoard(newBoard);


      const newGameplay = [...gameplay, { player: currentTurn, row: rowIndex, col: colIndex }];
      setGameplay(newGameplay);

      const gameWinner = checkWinner(newBoard);
      if (gameWinner) {
        setWinner(gameWinner);
        saveGameHistory(gameWinner, newGameplay);
      }
      else if (newBoard.every(row => row.every(cell => cell !== null))) {
        // ถ้าไม่มีช่องไหนที่เป็น null แปลว่าเต็มหมดแล้ว
        setWinner('Draw');  // หรือ จะใช้ค่าอื่น เช่น 'Tie' ก็ได้
        saveGameHistory(gameWinner, newGameplay);
      }
      else {
        setCurrentTurn(currentTurn === "X" ? "O" : "X");
      }
    }

    
  };

  const handleRestart = () => {
    navigate("/");
  };

  const checkWinner = (board) => {
    const directions = [
      { x: 1, y: 0 }, // แนวนอน
      { x: 0, y: 1 }, // แนวตั้ง
      { x: 1, y: 1 }, // แนวทแยงจากซ้ายบนไปขวาล่าง
      { x: 1, y: -1 }, // แนวทแยงจากขวาบนไปซ้ายล่าง
    ];
    for (let r = 0; r < rows; r++) { // วนลูปแถวตามแกน Y
      for (let c = 0; c < cols; c++) { // วนลูปคอลัมน์ตามแกน X
        const player = board[r][c]; // อ่านค่าของช่องนั้น ๆ แล้วเก็บไว้ในตัวแปร player
        if (!player) continue;

        for (let { x, y } of directions) {
          let count = 1;
          for (let i = 1; i < winCondition; i++) {
            const nr = r + i * y;
            const nc = c + i * x;
            if (
              nr >= 0 &&
              nr < rows &&
              nc >= 0 &&
              nc < cols &&
              board[nr][nc] === player
            ) {
              count++;
            } else break;
          }
          if (count === winCondition) return player;
        }
      }
    }
    return null;
  };

  const saveGameHistory = async (winner, gameplayData) => {
    const { data, error } = await supabase.from("history").insert([
      {
        rowsy: rows,
        colsx: cols,
        wincon: winCondition,
        winner: winner,
        gameplay: gameplayData, // บันทึกการเล่นลงในคอลัมน์ gameplay
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Error saving history:", error.message);
    } else {
      console.log("History saved successfully:", data);
    }
  };

  

  return (
    <>
      
      <div>
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
        <button onClick={handleRestart}>เริ่มเกมใหม่</button>
      </div>
    </>
  );
}

export default Game;
