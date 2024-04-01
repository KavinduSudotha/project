import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginBox = () => {
    const navigator = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here

        // For now, let's just navigate to '/home' on submit
        navigator('/home');
    };

    const handleForgotPassword = () => {
        console.log('Forgot Password');
    };

    return (
        <div className="mx-auto absolute inset-0 flex justify-center items-center">
            <div className="max-w-md mx-auto p-6 rounded-lg shadow-md" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                <h2 className="text-4xl font-semibold text-white text-center mb-4">L O G I N</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                            Username:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                            Password:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <a className="text-sm text-slate-200 hover:underline cursor-pointer" onClick={handleForgotPassword}>Forgot Password?</a>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginBox;
