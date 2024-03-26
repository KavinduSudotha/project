import React from 'react';
import Loginbg from '../asset/loginbg.jpg';
import Headbar from '../components/login/headbar';
function Login() {
  return (
    <>
      <Headbar />
      <div className="min-h-screen flex bg-gradient-to-t from-blue-300 to-blue-500">
        <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 p-8 rounded-lg shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">LOGIN</h2>
              {/* <h3 className="my-1 text-center text-xl font-regular text-gray-500">Enter User ID and Password</h3> */}
            </div>
            <form className="space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div className='m-2 rounded-sm'>
                  <label htmlFor="user-id" className="sr-only">User ID</label>
                  <input id="user-id" name="user-id" type="text" autoComplete="username" required pattern='[A-Za-Z0-9]' className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="User ID" />
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

              <div style={{ backgroundColor: '#60a5fa' }}>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Sign in
                </button>
              </div>
            </form>

            <div className="text-center text-sm">
              <p className="text-gray-600">Don't have an account? <a href="#" className="font-medium text-blue-600 hover:text-blue-500">Sign up</a></p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block relative w-1/2 h-" style={{ opacity: 0.5 }}>
          <img className="absolute inset-0 w-full h-full object-cover" src={Loginbg} alt="Login background" style={{ objectPosition: 'center', objectFit: 'cover' }} />
        </div>

      </div>
    </>
  );
}

export default Login;
