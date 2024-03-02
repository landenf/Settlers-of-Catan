import Hand from "./Components/hand";
import ReactHome from "./Pages/ReactHome";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* This will be our home page - unathenticated users*/}
        <Route path="/" element={<ReactHome />} />

        {/* This will be our home page - unathenticated users*/}
        <Route path="/" element={<GameSession/>} /> 

        {/* This will be for routing to game session - users in game*/}
        <Route path="/session" element={<div></div>} />
      </Routes>
    </Router>
  );
}

export default App;
