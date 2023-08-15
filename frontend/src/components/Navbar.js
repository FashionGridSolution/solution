import React,{useState} from "react";
import {useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler=()=>{
    localStorage.removeItem("userInfo");
    navigate("/login");
  }
  
  return (
    <div>
      <header className="header ">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="" onClick={() => navigate('/')}>ShopEasy</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#" onClick={() => navigate('/')}>Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="#" onClick={() => navigate('/shop')}>Shop</a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="#" onClick={() => navigate('/cart')}>Cart</a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="#" onClick={() => navigate('/chat')}>Chat</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Categories
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
   
    <button type="button" className="btn btn-dark ml-2" onClick={logoutHandler}>Logout</button>
  </div>
</nav>
      </header>
    </div>
  );
};

export default Navbar;
