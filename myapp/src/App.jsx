import { useState } from "react";
import "./App.css";
import TaskManager from "./TaskManager";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // LOGIN
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setLoggedIn(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Cannot connect to backend");
    }
  };

  // SIGNUP
  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful!");

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        setIsSignup(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Cannot connect to backend");
    }
  };

  // GOOGLE LOGIN SUCCESS
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/google-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            token: credentialResponse.credential
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setLoggedIn(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Google login failed");
    }
  };

  const handleGoogleError = () => {
    alert("Google login failed");
  };

  // TASK MANAGER
  if (loggedIn) {
    return <TaskManager />;
  }

  return (
    <GoogleOAuthProvider
      clientId="328484672814-kplkjilklr2lcioosprgi3mnlg262knr.apps.googleusercontent.com"
    >
      <div className="page">

        <div className="login-card">

          {/* LEFT SIDE */}
          <div className="left-side">

            <div className="overlay">

              <div className="logo">
                GENLAB
              </div>

              <div className="welcome-content">

                <h1>
                  Welcome to
                  <br />
                  <span>GenLab</span>
                </h1>

                <p>
                  Discover innovative technology and
                  smart digital solutions with GenLab.
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="right-side">

            <div className="login-box">

              {isSignup ? (
                <>
                  <h2>Create Account</h2>

                  <p className="subtitle">
                    Create your GenLab account.
                  </p>

                  <label>Name</label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                  />

                  <label>Email Address</label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />

                  <label>Password</label>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />

                  <label>Confirm Password</label>

                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                  />

                  <button
                    className="login-btn"
                    onClick={handleSignup}
                  >
                    Sign Up
                    <span>→</span>
                  </button>

                  <p className="signup-text">
                    Already have an account?

                    <button
                      className="signup-btn"
                      onClick={() =>
                        setIsSignup(false)
                      }
                    >
                      Login
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <h2>Login</h2>

                  <p className="subtitle">
                    Welcome back! Login to your GenLab account.
                  </p>

                  <label>Email Address</label>

                  <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />

                  <label>Password</label>

                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />

                  <div className="options">

                    <label className="remember">
                      <input type="checkbox" />
                      Remember me
                    </label>

                    <button className="forgot">
                      Forgot password?
                    </button>

                  </div>

                  <button
                    className="login-btn"
                    onClick={handleLogin}
                  >
                    Login
                    <span>→</span>
                  </button>

                  <div className="divider">
                    <div></div>
                    <span>OR</span>
                    <div></div>
                  </div>

                  {/* GOOGLE LOGIN */}
                  <div className="google-btn">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      width="100%"
                    />
                  </div>

                  <p className="signup-text">
                    Don't have an account?

                    <button
                      className="signup-btn"
                      onClick={() =>
                        setIsSignup(true)
                      }
                    >
                      Sign Up
                    </button>
                  </p>

                </>
              )}

            </div>

          </div>

        </div>

      </div>
    </GoogleOAuthProvider>
  );
}

export default App;