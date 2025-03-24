import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Game from './game.jsx'
import History from './history.jsx'
import Bot from './Bot.jsx'
import Replay from './replay.jsx'
import Playwithbot from "./Playwithbot.jsx";




ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/game" element={<Game />} />
      <Route path="/history" element={<History />} />
      <Route path="/bot" element={<Bot />} />
      <Route path="/replay" element={<Replay />} />
      <Route path="/playwithbot" element={<Playwithbot />} />

    </Routes>
  </BrowserRouter>
);
