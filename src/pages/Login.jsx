import {useState} from "react"
import { useNavigate } from "react-router-dom";

import "./Login.css"

function Login() {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({
      username: "",
      password: "",
    });

  function handleSubmit(e){
    e.preventDefault()
    document.getElementById("login-message").innerHTML = ""

    const {username, password} = userDetails
    const users = JSON.parse(localStorage.getItem("users"))
    const isUser = users.find(obj => obj.username === username && obj.password === password)
    if(isUser){
      navigate("/")
    }else{
      document.getElementById("login-message").innerHTML = "Incorrect credentials"
    }
  }

  function handleFormChange(e) {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="container">
      <h1>LogIn</h1>
      <div className="input-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter username"
          onChange={handleFormChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password"
          onChange={handleFormChange}
        />
      </div>
      <input type="submit" value="Log in" />
      <input
        type="button"
        value="Sign up"
        onClick={() => navigate("/register")}
      />

      <p id="login-message"></p>
    </form>
  );
}

export default Login