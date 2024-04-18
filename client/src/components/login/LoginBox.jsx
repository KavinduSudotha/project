import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginBox = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

//     const login = () => {
//         const data = { username: username, password: password };
//         axios.post("http://localhost:3000/?", data)
//             .then((response) => {
//                 console.log(response.data);
//                 if (response.data.usertype === 'admin') {
//                     // Navigate to admin page if usertype is admin
//                     navigate('/home');
//                 } else if (response.data.usertype === 'office') {
//                     // Navigate to user page if usertype is user
//                     navigate('/bill');
//                 } else {
//                     // Handle other user types or cases where usertype is not defined
//                     console.log('Invalid user type');
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error logging in:', error);
//                 // Handle error response
//             });
//     };

 const login = () => {
        
         const data = {username: username, password: password};
         //console.log(data);
         axios.post("http://localhost:3001/login", data).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.error('Error logging in:', error);
        });
        
         };
    

    return (
        <div className="mx-auto absolute inset-0 flex justify-center items-center">
            <div className="max-w-md mx-auto p-6 rounded-lg shadow-md" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                <h2 className="text-4xl font-semibold text-white text-center mb-4">L O G I N</h2>
                <form >
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                            Username:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                            
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
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            
                            
                        />
                        <a className="text-sm text-slate-200 hover:underline cursor-pointer" >Forgot Password?</a>
                    </div>
                    <div className="flex items-center justify-center">
                    <button
                        type="button" // Add this line to specify the button type
                        className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
                         onClick={login}
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
