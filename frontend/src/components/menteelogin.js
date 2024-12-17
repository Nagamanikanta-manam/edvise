import React, { useState } from 'react';
import './LoginStyles.css'; 

function MenteeLogin() {
  const [isRightPanelActive, setRightPanelActive] = useState(false);

  const handleSignUpClick = () => setRightPanelActive(true);
  const handleSignInClick = () => setRightPanelActive(false);

  return (
    <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
      <div className="form-container sign-up-container">
        <form>
          <h1>Create Mentee Account</h1>
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="University Roll No" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button>Register</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form>
          <h1>Mentee Login</h1>
          <input type="text" placeholder="University Roll No" required />
          <input type="password" placeholder="Password" required />
          <button>Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back, Mentee!</h1>
            <p>Log in to connect with your mentors.</p>
            <button className="ghost" onClick={handleSignInClick}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Mentee!</h1>
            <p>Sign up to get guidance from your mentors.</p>
            <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenteeLogin;