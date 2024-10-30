
import './App.css';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import Home from './Pages/home';
import PriceList from './Pages/priceList';



function App() {
  return (
    <div className="App">
        <Router>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricelist" element={<PriceList />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
