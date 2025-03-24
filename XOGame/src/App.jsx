import { useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';
function App() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [winCondition, setWinCondition] = useState(3);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  
  const navigate = useNavigate();

  
  const handleClick = () => {
    
    navigate('/game', { 
      state: { 
        rows, 
        cols, 
        winCondition, 
        currentPlayer 
      } 
    });
 
    
  };

  const handleClick2 = () => {
    navigate('/history');
  }

  const handleClick3 = () => {
    navigate('/bot');
  }
  return (
    <>
      <h1>XO Game</h1>

      <p>
        เลือกขนาด แกน X =
        <select value={cols} onChange={(e) => setCols(Number(e.target.value))}>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>

        </select>
        แกน Y = 
        <select value={rows} onChange={(e) => setRows(Number(e.target.value))}>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
      </p>

      <p>
        เรียงกัน
        <select value={winCondition} onChange={(e) => setWinCondition(Number(e.target.value))}>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
        ตัวถึงชนะ
      </p>

      <p>
        ผู้เล่นที่เริ่มเล่นก่อน
        <select value={currentPlayer} onChange={(e) => setCurrentPlayer(e.target.value)}>
          <option value="X">X</option>
          <option value="O">O</option>
        </select>
      </p>

      <button onClick={handleClick}>เริ่มเกม</button>
      <button onClick={handleClick2} className='btn2'>ดูประวัติการเล่น</button>
      <button onClick={handleClick3} className='btn3' >เล่นกับbot</button>

      
    </>
  );
}

export default App;
