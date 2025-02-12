
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Signup = () => {
  const styles = {
    formControl: { marginBottom: "15px" },
    signupButton: {
      backgroundColor: "#000",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      width: "100%",
      marginTop: "20px",
    },
    formContainer: {
      width: "75%",
      maxWidth: "400px",
    },
    heading: { fontWeight: "bold", fontSize: "2rem", marginBottom: "20px" },
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate(); // Hook for redirection

  const handleSignup = async (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });
      console.log("Signup successful:", response.data);

      // Set success message and redirect after a small delay
      setSuccessMessage("Signup successful! Redirecting to login...");
      
      // Redirect to login page after a delay (e.g., 2 seconds)
      setTimeout(() => {
        navigate("/login"); // Navigate to the login page
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Error signing up");
      console.error("Error signing up:", error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex py-5 mt-5 mx-lg-5 mx-2 justify-content-center align-items-center" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="py-5 my-5" style={styles.formContainer}>
        <h1 style={styles.heading}>Create an Account</h1>

        {/* Show success message if sign-up is successful */}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        {/* Show error message if there's an error */}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSignup}>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              style={styles.formControl}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              className="form-control"
              placeholder="Your Email"
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
          <button type="submit" style={styles.signupButton} disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
