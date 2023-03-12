import {useState} from "react"
import { useNavigate } from "react-router-dom";

import "./Register.css"

function Register() {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  })

  function genStrongPW(){
    var specials = "!@#$%^&*()_+{}:\"<>?|[];',./`~";
    var lowercase = "abcdefghijklmnopqrstuvwxyz";
    var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var numbers = "0123456789";
    let strongPW = ""

    let noSpecials = 1 + Math.floor((Math.random()*10))%2;
    for(let i=0; i<noSpecials; i++){
      strongPW += specials.charAt(Math.floor(Math.random()*specials.length))
    }

    let noLowerCase = 3 + (Math.floor((Math.random() * 10)) % 2);
    for (let i = 0; i < noLowerCase; i++) {
      strongPW += uppercase.charAt(Math.floor(Math.random() * lowercase.length));
    }

    let noUpperCase = 3 + (Math.floor((Math.random() * 10)) % 2);
    for (let i = 0; i < noUpperCase; i++) {
      strongPW += lowercase.charAt(Math.floor(Math.random() * uppercase.length));
    }

    let noNums = 1 + (Math.floor((Math.random() * 10)) % 2);
    for (let i = 0; i < noNums; i++) {
      strongPW += numbers.charAt(
        Math.floor(Math.random() * numbers.length)
      );
    }

    // shuffling
    strongPW = strongPW.split("");
    for(let i=1; i<=4; i++){
      let idx1 = Math.floor(Math.random()*strongPW.length)
      let idx2 = Math.floor(Math.random() * strongPW.length);

      let temp = strongPW[idx1]
      strongPW[idx1]= strongPW[idx2]
      strongPW[idx2] = temp
    }

    return strongPW.join('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    document.getElementById("register-message").innerHTML = ""
    document.getElementById("password-message").innerHTML = "";

    const {username, password, confirmPassword} = userDetails;

    if(!username || !password || !confirmPassword) {
      document.getElementById("register-message").innerHTML =
        "Fields cannot be empty";
    }else if(password !== confirmPassword){
      document.getElementById("register-message").innerHTML = "Password and confirm password are not matching"
    }else if(password.length < 8)
      document.getElementById("password-message").innerHTML = "Please enter a longer password"
    else{

      let upperCaseCount = 0, lowerCaseCount = 0, digitsCount = 0, spCount = 0;
      for(let i = 0; i < password.length; i++){
        if(password[i] >= '0' && password[i] <= '9')
          digitsCount++;
        else if(password[i] >= "a" && password[i] <= "z")
          lowerCaseCount++;
        else if(password[i] >= "A" && password[i] <= "Z") 
          upperCaseCount++;
        else spCount++;
      }
      
      if(upperCaseCount == 0 || lowerCaseCount == 0 || digitsCount == 0 || spCount == 0){
        const strongPW = genStrongPW()
        document.getElementById("password-message").innerHTML = "Suggested password: " + strongPW
      }else{
        const users = JSON.parse(localStorage.getItem("users"))
        let newUsers = [{username: username, password: password}]
        if(users != null)
          newUsers = [...users, {username: username, password: password}]

        const isUser = users.find(obj => obj.username === username)

        if(isUser){
          document.getElementById("register-message").innerHTML = "User already exists"
          return
        }
        
        localStorage.setItem("users", JSON.stringify(newUsers))
        navigate("/")
      }
    }
  }

  function handleFormChange(e){
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit} className="container">
      <h1>Register</h1>
      <p id="register-message"></p>
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
      <div className="input-group">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          name="confirmPassword"
          placeholder="Confirm password"
          onChange={handleFormChange}
        />
      </div>
      <p id="password-message"></p>
      <input type="submit" value="Sign up" />
      <input
        type="button"
        value="Log in"
        onClick={() => navigate("/login")}
      />
    </form>
  );
}

export default Register