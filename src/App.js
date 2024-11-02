import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import PriceList from './Pages/Prices';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Prices" element={<PriceList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
