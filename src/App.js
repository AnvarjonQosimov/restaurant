import './App.css';
import Enter from "./pages/Enter";
import Sale from "./pages/Sale";
import DontAdmin from "./pages/DontAdmin";
import FastFood from "./components/FastFood";
import SuyuqOvqatlar from "./components/SuyuqOvqatlar";
import QuyuqOvqatlar from "./components/QuyuqOvqatlar";
import YozgiOvqatlar from "./components/YozgiOvqatlar";
import Ichimliklar from "./components/Ichimliklar";
import Muzqaymoqlar from "./components/Muzqaymoqlar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Enter />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/dontAdmin" element={<DontAdmin />} />
        <Route path="/fastfood" element={<FastFood />} />
        <Route path="/suyuqovqatlar" element={<SuyuqOvqatlar />} />
        <Route path="/quyuqovqatlar" element={<QuyuqOvqatlar />} />
        <Route path="/yozgiovqatlar" element={<YozgiOvqatlar />} />
        <Route path="/ichimliklar" element={<Ichimliklar />} />
        <Route path="/muzqaymoqlar" element={<Muzqaymoqlar />} />
      </Routes>
    </div>
  );
}

export default App;
