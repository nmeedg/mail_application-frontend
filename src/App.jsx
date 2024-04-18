import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connexion from "./pages/Connexion";
import Home from './pages/Home';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/connexion" element={<Connexion />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
