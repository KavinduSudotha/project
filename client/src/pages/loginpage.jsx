// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const login = () => {
        const data = { username: username, password: password };
        axios.post("http://localhost:3001/login", data)
            .then((response) => {
                console.log(response.data);
                if (response.data.role === 'admin') {
                    // Navigate to admin page if usertype is admin
                    navigate('/homepage');
                } else if (response.data.role === 'office') {
                    // Navigate to user page if usertype is user
                    navigate('/bill');
                } else {
                    // Handle other user types or cases where usertype is not defined
                    console.log('Invalid user type');
                }
            })
            .catch((error) => {
                console.error('Error logging in:', error);
                setError('Invalid username or password!');
                // Handle error response
            });
    }
  return (
    <div className="flex  h-screen bg-indigo-200 ">
      {/* Left half with image */}
      <div className="w-1/2 bg-neutral-700 flex items-center justify-center">
        <img src="your-image-url.jpg" alt="Login" className="max-h-full max-w-full" />
      </div>

      {/* Right half with login form */}
      <div className="w-1/2 flex items-center justify-center">
        <form className="bg-white/55 text-left shadow-md rounded w-3/4 pt-6 pb-8 mb-4 ">
        <div className="px-4 size-auto">
        <h1 className="text-sm mb-4 tex font-mono font-semibold text-gray-800 ">COCO SHEET  MANUFACTURING MANAGMENT SYSTEM</h1>
          <h2 className="text-3xl mb-4 text-gray-800 font-mono">Login to your account,</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-sans  font-semibold	mb-1" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              onChange={(event) => {setUsername(event.target.value);}}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-sans  font-semibold	 mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={(event) => {setPassword(event.target.value);}}
            />
          </div>
          <div className="text-red-500 ml-[100px] mb-[20px]">{error}</div> {/* Error message */}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none font-mono focus:shadow-outline"
              type="button" onClick={login}
            >
              Login
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 font-mono" href="#">
              Forgot Password?
            </a>
            </div>
            </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
