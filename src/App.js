import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./Pages/WelcomePage";
import HomePage from "./Pages/HomePage";
import PomodoroPage from "./Pages/PomodoroPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/pomodoro" element={<PomodoroPage />} />
      </Routes>
    </Router>
  );
}

export default App;
