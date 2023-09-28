import "./App.css";
import { Routes, Route } from "react-router-dom";

import DashBoard from "./DashBoard";
import GenerateCode from "./Components/GenerateCode";
import Accounts from "./Components/Accounts";
function App() {
  return (
    <Routes>
              <Route index element={<GenerateCode />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/dashboard/accounts" element={<Accounts />} />

    </Routes>
  );
}

export default App;
