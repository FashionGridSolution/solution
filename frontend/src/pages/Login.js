import React, { useState,useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate=useNavigate();
  useEffect(() => {
    const userinfo=JSON.parse(localStorage.getItem("userInfo"));

    if(userinfo){
      navigate("/");
    }
  }, [navigate])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    age: "",
    chestSize: "",
    hipSize: "",
    footSize: "",
    gender: "",
  });
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const toggleForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  const handleLoginChange = (e) => {
    console.log("handle changed ");
    const { name, value } = e.target;
    setLoginFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleChange = (e) => {
    console.log("handle changed ");
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.password ||
      !formData.email ||
      !formData.hipSize
    ) {
      console.log("Please fill all fields")
      return;
    }
    
    console.log(formData);
    try {
      const { data } = await axios.post("/api/user/", formData);
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate('/')
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with status:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server');
      } else {
        // Something else happened
        console.error('Error:', error.message);
      }
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    
    console.log(loginFormData);
    if (
      !loginFormData.email ||
      !loginFormData.password) {
      console.log("Please fill all fields")
      return;
    }
    
    try {
      const { data } = await axios.post("/api/user/login", loginFormData);
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate('/')
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with status:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server');
      } else {
        // Something else happened
        console.error('Error:', error.message);
      }
    }
  };
  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h2 className="heading-section">
              {showRegisterForm ? "Register" : "Login"}
            </h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-10">
            <div className="wrap d-md-flex">
              <div
                className="img"
                style={{ backgroundImage: "url(images/carouselpic.jpg)" }}
              ></div>
              <div className="login-wrap p-4 p-md-5">
                <div className="d-flex">
                  <div className="w-100">
                    <h3 className="mb-4">
                      {showRegisterForm ? "Register" : "Sign In"}
                    </h3>
                  </div>
                  <div className="w-100">
                    <p className="social-media d-flex justify-content-end">
                      <a
                        href="#"
                        className="social-icon d-flex align-items-center justify-content-center"
                      >
                        <span className="fa fa-facebook" />
                      </a>
                      <a
                        href="#"
                        className="social-icon d-flex align-items-center justify-content-center"
                      >
                        <span className="fa fa-twitter" />
                      </a>
                    </p>
                  </div>
                </div>
                {showRegisterForm ? (
                  <div>
                    <form
                      action="#"
                      className="signin-form"
                      onSubmit={registerHandler}
                    >
                      <div className="form-group mb-1">
                        <label className="label" htmlFor="name">
                          Enter Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          onChange={handleChange}
                          name="name"
                        />
                      </div>
                      <div className="form-group mb-1">
                        <label className="label" htmlFor="name">
                          Email
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Email"
                          required=""
                          onChange={handleChange}
                          name="email"
                        />
                      </div>
                      <div className="form-group mb-1">
                        <label className="label" htmlFor="password">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          required=""
                          onChange={handleChange}
                          name="password"
                        />
                      </div>
                      <div className="form-group mb-1">
                        <label className="label" htmlFor="city">
                          City
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="City"
                          required=""
                          onChange={handleChange}
                          name="city"
                        />
                      </div>
                      <div className="form-group mb-1">
                        <label className="label" htmlFor="city">
                          Enter Gender
                        </label>

                        <select onChange={handleChange} name="gender">
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                        </select>
                      </div>
                      <div className="form-group mb-1">
                        <label className="label" htmlFor="age">
                          Age
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Age"
                          required=""
                          onChange={handleChange}
                          name="age"
                        />
                      </div>
                      <div className="form-group mb-1">
                        <label className="label" htmlFor="chestSize">
                          ChestSize
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Chest Size"
                          required=""
                          onChange={handleChange}
                          name="chestSize"
                        />
                      </div>
                      <div className="form-group mb-1">
                        <label className="label" htmlFor="hipSize">
                          hipSize
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="WaiseSize"
                          required=""
                          onChange={handleChange}
                          name="hipSize"
                        />
                      </div>
                      <div className="form-group mb-1">
                        <label className="label" htmlFor="footSize">
                          FootSize
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="FootSize"
                          required=""
                          value={formData.footSize}
                          onChange={handleChange}
                          name="footSize"
                        />
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="form-control btnlogin btnlogin-primary rounded submit px-3"
                        >
                          Register
                        </button>
                      </div>
                      <div className="form-group d-md-flex">
                        <div className="w-50 text-left">
                          <label className="checkbox-wrap checkbox-primary mb-0">
                            Remember Me
                            <input type="checkbox" defaultChecked="" />
                            <span className="checkmark" />
                          </label>
                        </div>
                        <div className="w-50 text-md-right">
                          <a href="#">Forgot Password</a>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : (
                  <form
                    action="#"
                    className="signin-form"
                    onSubmit={loginHandler}
                  >
                    <div className="form-group mb-1">
                      <label className="label" htmlFor="name">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Email"
                        required=""
                        name="email"
                        onChange={handleLoginChange}
                      />
                    </div>
                    <div className="form-group mb-1">
                      <label className="label" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        required=""
                        name="password"
                        onChange={handleLoginChange}
                      />
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="form-control btnlogin btnlogin-primary rounded submit px-3"
                      >
                        Sign In
                      </button>
                    </div>
                    <div className="form-group d-md-flex">
                      <div className="w-50 text-left">
                        <label className="checkbox-wrap checkbox-primary mb-0">
                          Remember Me
                          <input type="checkbox" defaultChecked="" />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="w-50 text-md-right">
                        <a href="#">Forgot Password</a>
                      </div>
                    </div>
                  </form>
                )}

                <p className="text-center">
                  Not a member?{" "}
                  <a data-toggle="tab" href="#signup" onClick={toggleForm}>
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
