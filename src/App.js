import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/home';

import PriceList from './Pages/Prices';
import Cart from './Pages/Cart';
import Sign  from './Pages/signuppage'
import Logins from './Pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Prices" element={<PriceList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Logins />} />
          <Route path="/signuppage" element={<Sign />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
