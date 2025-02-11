import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import bg1 from '../assets/bg1.png';
import bg2 from '../assets/bg2.png';
import bg3 from '../assets/bg3.png';
import { scrapauth } from './firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';

const Llogin = () => {
  const location = useLocation();
  const role = location.state?.role || 'User';
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const backgroundImages = [bg1, bg2, bg3];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const handleFormToggle = () => {
    setIsLoginPage(!isLoginPage);
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(scrapauth, email, password);
      await sendEmailVerification(userCredential.user);
      setSuccessMessage('Registration successful! Please verify your email.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(scrapauth, email, password);
      setErrorMessage('');
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage('Invalid email or password.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#00050B',
      backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      transition: 'background-image 1s ease-in-out',
    }}>
      <div style={{
        background: 'rgba(26, 29, 35, 0.7)',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h1 style={{ textAlign: 'center', color: '#fff' }}>{isLoginPage ? `${role} Login` : 'Create Account'}</h1>
        <form onSubmit={isLoginPage ? handleLogin : handleCreateAccount}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: '#fff', fontWeight: 'bold' }}>
              Your Email
            </label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{
              width: '97%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #fff',
              backgroundColor: '#2C2F38',
              color: '#fff',
            }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: '#fff', fontWeight: 'bold' }}>
              Your Password
            </label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{
              width: '97%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #fff',
              backgroundColor: '#2C2F38',
              color: '#fff',
            }} />
          </div>
          <button type="submit" style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#943B15ff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}>
            {isLoginPage ? 'Login' : 'Create Account'}
          </button>
          {successMessage && <div style={{ color: 'green', marginTop: '15px', textAlign: 'center' }}>{successMessage}</div>}
          {errorMessage && <div style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>{errorMessage}</div>}
          <div style={{ marginTop: '25px', textAlign: 'center' }}>
            <span style={{ color: '#fff' }}>
              {isLoginPage ? (
                <>New Here? <Link to="#" onClick={handleFormToggle} style={{ color: '#fff' }}>Create an Account</Link></>
              ) : (
                <>Already Have an Account? <Link to="#" onClick={handleFormToggle} style={{ color: '#fff' }}>Login</Link></>
              )}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Llogin;
