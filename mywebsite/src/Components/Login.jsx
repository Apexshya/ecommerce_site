import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Girls from "../assets/Girl.png";

const Login = () => {
  const styles = {
    leftSection: {
      backgroundColor: "#f8f9fa",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    rightSection: {
      backgroundColor: "#000",
      color: "#fff",
      backgroundImage: "url('https://via.placeholder.com/600x800')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    googleButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      fontWeight: "bold",
      cursor: "pointer",
      marginBottom: "15px",
    },
    formControl: {
      marginBottom: "15px",
    },
    loginButton: {
      backgroundColor: "#000",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      width: "100%",
      marginTop: "20px",
    },
    textLink: {
      textDecoration: "underline",
      color: "#000",
      cursor: "pointer",
    },
    astronautText: {
      textAlign: "center",
      color: "#fff",
    },
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous error
    setLoading(true);
  
    if (!email || !password) {
      setError("Both email and password are required.");
      setLoading(false);
      return;
    }
  
    console.log('Login Payload:', { email, password });
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token); // Save token
      localStorage.setItem("userName", response.data.user.name); // Save user name
  
      // Redirect user to another page or update state as needed
      window.location.href = "/"; // Redirect to home or products page
    } catch (error) {
      setError(error.response?.data?.message || "Error logging in");
      console.error("Error logging in:", error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="pt-3 px-lg-5 px-2">
      <div className="row gx-0 py-5">
        <div className="col-md-6 py-5" style={styles.leftSection}>
          <h1 className="display-4 fw-bold">Hi there!</h1>
          <p>Welcome to Ghar. Your personal Shop</p>
          <button style={styles.googleButton}>
            <img
              src="https://img.icons8.com/color/48/null/google-logo.png"
              alt="Google Logo"
              style={{ width: "20px", marginRight: "10px" }}
            />
            Log in with Google
          </button>
          <p className="text-muted">or</p>
          <form onSubmit={handleLogin} style={{ width: "75%" }}>
            <div>
              <input
                type="email"
                className="form-control"
                placeholder="Your email"
                style={styles.formControl}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                style={styles.formControl}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="d-flex justify-content-between align-items-center">
              <a href="#" className="text-muted" style={{ fontSize: "14px" }}>
                Forgot password?
              </a>
            </div>
            <button style={styles.loginButton} disabled={loading}>
              {loading ? "Logging In..." : "Log In"}
            </button>
          </form>
          <p className="mt-3">
            Don't have an account?{" "}
            <Link to="/signup" style={styles.textLink}>Sign up</Link>
          </p>
        </div>

        <div className="col-md-6" style={styles.rightSection}>
          <div>
            <img
              src={Girls}
              alt="Astronaut"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


