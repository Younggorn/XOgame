import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function Bot() {

  
 const navigate = useNavigate();
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [winCondition, setWinCondition] = useState(3);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [whofirst, setWhofirst] = useState("Played");

    const handle1 = () => { 
    navigate("/");
  }

    const handle2 = () => {
    navigate("/playwithbot", {
      state: {
        rows,
        cols,
        winCondition,
        currentPlayer,
        whofirst,
      },
    });
}
  return (
    <>
      <h1>Bot Page</h1>
      <p>
        เลือกขนาด แกน X =
        <select value={cols} onChange={(e) => setCols(Number(e.target.value))}>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        แกน Y =
        <select value={rows} onChange={(e) => setRows(Number(e.target.value))}>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </p>

      <p>
        เรียงกัน
        <select
          value={winCondition}
          onChange={(e) => setWinCondition(Number(e.target.value))}
        >
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        ตัวถึงชนะ
      </p>

      <p>
        Bot is 
        <input
          type="radio"
          name="1"
          value="X"
          checked={currentPlayer === "X"}
          onChange={(e) => setCurrentPlayer(e.target.value)}
        />
        <label>X</label>
        <input
          type="radio"
          name="1"
          value="O"
          checked={currentPlayer === "O"}
          onChange={(e) => setCurrentPlayer(e.target.value)}
        />
        <label>O</label>
      </p>

      <p>
        เลือกฝั่งที่เริ่มก่อน
        <input
          type="radio"
          name="ready"
          value="Played"
          checked={whofirst === "Played"}
          onChange={(e) => setWhofirst(e.target.value)}
        />
        <label>Played</label>
        <input
          type="radio"
          name="ready"
          value="Bot"
          checked={whofirst === "Bot"}
          onChange={(e) => setWhofirst(e.target.value)}
        />
        <label>Bot</label>
      </p>
      <button onClick={handle1} className="btn2">กลับหน้าหลัก</button>
      <button onClick={handle2}>เริ่มเกม</button>
    </>
  );
}

export default Bot;
