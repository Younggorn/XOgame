import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "./supabaseClient";

function History() {
  const navigate = useNavigate();
  const [historys, sethistorys] = useState([]);
  const handleback = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchhistorys = async () => {
      const { data: history } = await supabase.from("history").select("*").order("created_at", { ascending: false });
      console.log(history);
      sethistorys(history);
    };

    fetchhistorys(); 
  }, []);

  const handleReplay = (history) => {
    navigate('/replay', { state: { 
      rows: history.rowsy,
      cols: history.colsx,
      gameplay: history.gameplay
    }});
  };
  

  return (
    <>
      <h1>History Form</h1>
      <button onClick={handleback} className="btn2">กลับหน้าหลัก</button>

      <table>
        <thead>
          <tr>
            
            <th>Time</th>
            
            <th>Size</th>
            <th>Win Condition</th>
            <th>Winner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {historys.map((history) => (
            <tr key={history.id}>
              
              <td>{new Date(history.created_at).toLocaleString()}</td>
              
              <td>{`${history.rowsy} x ${history.colsx}`}</td>
              <td>{history.wincon}</td>
              <td>{history.winner || "Draw"}</td>
              <td>
                <button onClick={() => handleReplay(history)}>Replay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default History;
