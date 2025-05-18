import { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import '../styles/AuthSlider.css'

const AuthSlider = ({
  username,
  password,
  name,
  setUsername,
  setPassword,
  setName,
  handleLogin,
  handleSignup,
}) => {
  const [showSignup, setShowSignup] = useState(false)

  const toggleForm = () => {
    setShowSignup(!showSignup)
  }

  return (
    <div className="authslider-page">
    <div className="wrapper">
      <div className="title-text">
        <div className={`title ${showSignup ? 'signup' : 'login'}`}>
          {showSignup ? 'Signup Form' : 'Login Form'}
        </div>
      </div>

      <div className="form-container">
        <div className="slide-controls">
          <input type="radio" name="slide" id="login" checked={!showSignup} onChange={toggleForm} />
          <input type="radio" name="slide" id="signup" checked={showSignup} onChange={toggleForm} />
          <label htmlFor="login" className="slide login">Login</label>
          <label htmlFor="signup" className="slide signup">Signup</label>
          <div className="slider-tab"></div>
        </div>

        <div
          className="form-inner"
          style={{ transform: showSignup ? 'translateX(-50%)' : 'translateX(0%)' }}
        >
          <div className="form-half">
            <LoginForm
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              handleLogin={handleLogin}
            />
          </div>

          <div className="form-half">
            <SignupForm
              username={username}
              name={name}
              password={password}
              setUsername={setUsername}
              setName={setName}
              setPassword={setPassword}
              handleSignup={handleSignup}
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AuthSlider
