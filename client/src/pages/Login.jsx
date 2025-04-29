import { useState } from "react";
import "../styles/form.css";
import Navbar from "../components/Navbar";
import { BASE_URL } from "../config/api";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post(
        BASE_URL + "/faculties/faculty-login",
        {
          F_email: email,
          F_password: password,
        },
        { withCredentials: true }
      );
      console.log(response);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Student Login</h2>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
