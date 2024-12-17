import React, { useState } from 'react';
import './LoginStyles.css'; 

function MentorLogin() {
  const [isRightPanelActive, setRightPanelActive] = useState(false);

  const handleSignUpClick = () => setRightPanelActive(true);
  const handleSignInClick = () => setRightPanelActive(false);

  return (
    <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
      <div className="form-container sign-up-container">
        <form>
          <h1>Create Mentor Account</h1>
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="University Roll No" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <label for="resume-upload" style={{ marginTop: '10px', padding: '10px', width: '100%' }}>Upload Resume:</label>
	<input type="file" id="resume-upload" name="resume" accept=".pdf,.doc,.docx" required />
          <button>Register</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form>
          <h1>Mentor Login</h1>
          <input type="text" placeholder="University Roll No" required />
          <input type="password" placeholder="Password" required />
          <button>Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back, Mentor!</h1>
            <p>To stay connected, please log in with your credentials.</p>
            <button className="ghost" onClick={handleSignInClick}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Mentor!</h1>
            <p>Provide your details to start mentoring students.</p>
            <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorLogin;
