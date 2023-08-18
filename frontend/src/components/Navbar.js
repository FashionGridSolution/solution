import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    console.log(search);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const accessToken = userInfo.token; // Get the Bearer token from userInfo
      const response = await axios.get(
        `http://127.0.0.1:8080/api/product/search/?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);

      console.log(userInfo);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return (
    <div>
      <header className="header ">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="" onClick={() => navigate("/")}>
            ShopEasy
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#" onClick={() => navigate("/")}>
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item active">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => navigate("/shop")}
                >
                  Shop
                </a>
              </li>
              <li className="nav-item active">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => navigate("/cart")}
                >
                  Cart
                </a>
              </li>
              <li className="nav-item active">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => navigate("/chat")}
                >
                  Chat
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                onClick={searchHandler}
              >
                Search
              </button>
            </form>
            <button
              type="button"
              className="btn btn-dark ml-2"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
