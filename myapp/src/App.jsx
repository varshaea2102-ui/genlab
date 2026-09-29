import "./App.css";

function App() {
  return (
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

            <h2>Login</h2>

            <p className="subtitle">
              Welcome back! Login to your GenLab account.
            </p>


            {/* EMAIL */}
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
            />


            {/* PASSWORD */}
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
            />


            {/* OPTIONS */}
            <div className="options">

              <label className="remember">
                <input type="checkbox" />
                Remember me
              </label>

              <button className="forgot">
                Forgot password?
              </button>

            </div>


            {/* LOGIN BUTTON */}
            <button className="login-btn">
              Login
              <span>→</span>
            </button>


            {/* DIVIDER */}
            <div className="divider">

              <div></div>

              <span>OR</span>

              <div></div>

            </div>


            {/* GOOGLE BUTTON */}
            <button className="google-btn">

              <span className="google-icon">
                G
              </span>

              Continue with Google

            </button>


            {/* SIGN UP */}
            <p className="signup-text">
              Don't have an account?

              <button className="signup-btn">
                Sign Up
              </button>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;

