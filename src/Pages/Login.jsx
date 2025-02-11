import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { scrapauth } from "./firebase";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentState, setCurrentState] = useState('Login');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(scrapauth, username, password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDealerClick = () => {
    navigate('/llogin', { state: { role: 'Dealer' } });
  };

  const handleSellerClick = () => {
    navigate('/llogin', { state: { role: 'Seller' } });
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col items-center w-full">
      <div className="w-1/2 flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
            Create Account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
            Login Here
          </p>
        )}
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4 w-1/4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input
          type="email"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-6 w-1/4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <button type="submit" className="w-1/4 bg-black text-white px-8 py-2 mt-4 rounded-md">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
      <button type="button" className="w-1/4 bg-black text-white px-8 py-2 mt-4 rounded-md" onClick={handleDealerClick}>
        Dealer
      </button>
      <button type="button" className="w-1/4 bg-black text-white px-8 py-2 mt-4 rounded-md" onClick={handleSellerClick}>
        Seller
      </button>
    </form>
  );
}

export default Login;