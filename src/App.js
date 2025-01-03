import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Lazy load the components
const Home = lazy(() => import('./Pages/home'));
const PriceList = lazy(() => import('./Pages/Prices'));
const Cart = lazy(() => import('./Pages/Cart'));
const Sign = lazy(() => import('./Pages/signuppage'));
const Logins = lazy(() => import('./Pages/Login'));
const About = lazy(()=>import('./Pages/about'));
const Contact =lazy(()=>import('./Pages/contact'))
const Gallery =lazy(()=> import ('./Pages/gallery'))

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Prices" element={<PriceList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Logins />} />
            <Route path="/signuppage" element={<Sign />} />
            <Route path="/about" element={<About />} />
            <Route path='/contact'  element={<Contact />}/>
            <Route path='/gallery' element={<Gallery />}/>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
