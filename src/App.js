import { Routes, Route } from "react-router-dom";
import {Home} from "../src/views/home/home"
import './App.css';
import { SharingPage } from "./views/sharingPage/sharing";
import { AddIteam } from "./views/addIteam/addIteam";

function App() {  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/SharingPage/:id" element={<SharingPage/>}></Route>
        <Route path="/AddCodeBlock" element={<AddIteam/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
