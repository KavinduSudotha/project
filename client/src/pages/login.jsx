import React from 'react';
import Loginbg from '../asset/loginbg.jpg';
function Login() {
  return (
    <div className="min-h-screen flex bg-gradient-to-r from-purple-300 to-blue-200">
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-8 rounded-lg shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">LOGIN</h2>
            <h3 className="my-1 text-center text-xl font-regular text-gray-500" >Enter User ID and Password</h3>
          </div>
          <form className="space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className='m-2 rounded-sm'>
                <label htmlFor="user-id" className="sr-only">User ID</label>
                <input id="user-id" name="user-id" type="text" autoComplete="username" required pattern='[A-Za-Z0-9]'  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="User ID" />
              </div>
              <div className='m-2'>
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div style={{ backgroundColor: '#a855f7' }}>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                {/* <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M9 3a1 1 0 011-1h5a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h5a1 1 0 011 1zm5 2H9a1 1 0 00-1 1v10a1 1 0 001 1h5a1 1 0 001-1V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </span> */}
                Sign in
              </button>
            </div>
          </form>

          {/* <div className="text-center text-sm">
            <p className="text-gray-600">Don't have an account? <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Sign up</a></p>
          </div> */}
        </div>
      </div>
    
       <div className="hidden lg:block relative w-1/2 h-" style={{opacity:0.5}}>
         <img className="absolute inset-0 w-full h-full object-cover" src={Loginbg} alt="Login background"  style={{ objectPosition: 'center', objectFit: 'cover' }}/>
      </div>
      
    </div>
  );
}

export default Login;
