//1] npm run dev on terminal
// 2] node backend/index.js  on additional terminal
// 3] insure that 'mongodb,express,core etc' modules are downloaded
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome'
import Admin from './components/Admin';
import VoterPopUp from './components/VoterPopUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/voter" element={<VoterPopUp />} />
     
      </Routes>
    </Router>

  );
}

export default App;
