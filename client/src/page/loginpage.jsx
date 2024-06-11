import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginImg from "../asset/image.png";
import { jwtDecode } from "jwt-decode"; // Correct named import

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const login = () => {
    const data = { username, password };
    axios
      .post("http://localhost:3001/auth/login", data)
      .then((response) => {
        console.log(response.data);
        const token = response.data.token;
        localStorage.setItem("token", JSON.stringify({ token }));
        const savedToken = JSON.parse(localStorage.getItem("token"));
        console.log(savedToken);
        const decodedToken = jwtDecode(savedToken.token);
        console.log(decodedToken);

        if (decodedToken.role === "Director") {
          navigate("/director-dashboard");
        } else if (decodedToken.role === "Manager") {
          navigate("/manager-dashboard");
        } else if (decodedToken.role === "Supervisor") {
          navigate("/Supervisor-dashboard");
        } else if (decodedToken.role === "Employer") {
          navigate("/Employer-dashboard");
        } else {
          console.log("Invalid user type");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        if (error.response && error.response.data.error === "User is inactive") {
          setError("User is inactive!");
        } else {
          setError("Invalid username or password!");
        }
      });
  };

  return (
    <div className="flex h-screen bg-indigo-200">
      <div className="w-1/2 bg-neutral-700 flex justify-center">
        <img src={LoginImg} alt="Login" className="max-h-full max-w-full" />
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <form className="bg-white/55 text-left shadow-md rounded w-3/4 pt-6 pb-8 mb-4">
          <div className="px-4 size-auto">
            <h1 className="text-sm mb-4 tex font-mono font-semibold text-gray-800">
              COCO SHEET MANUFACTURING MANAGEMENT SYSTEM
            </h1>
            <h2 className="text-3xl mb-4 text-gray-800 font-mono">
              Login to your account,
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-sans font-semibold mb-1" htmlFor="username">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-sans font-semibold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="text-red-500 ml-[100px] mb-[20px]">{error}</div> {/* Error message */}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none font-mono focus:shadow-outline"
                type="button"
                onClick={login}
              >
                Login
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 font-mono"
                href="#"
              >
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
