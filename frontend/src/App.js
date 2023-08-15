import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ShoppingPage from './pages/ShoppingPage';
import Cart from './pages/Cart';
import Login from './pages/Login';
import ProductPage from './pages/ProductPage';
import Chatpage from './pages/Chatpage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/shop" element={<ShoppingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productid" element={<ProductPage />} />
          <Route path="/chat" element={<Chatpage/>} />
        </Routes>
      </div>
    </Router>
  ); 
} 

export default App;
