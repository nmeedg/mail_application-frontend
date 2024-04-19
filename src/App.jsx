import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connexion from "./pages/Connexion";
import Home from './pages/Home';
import "./App.css";
import "react-toastify/ReactToastify.css"
import {ToastContainer} from "react-toastify"

function App() {
  return (
    <BrowserRouter>
<ToastContainer />
      <Routes>
        <Route path="/connexion" element={<Connexion />}/>
        <Route path="/" element={<Home />}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
