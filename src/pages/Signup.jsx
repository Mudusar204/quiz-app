import React from 'react'
import useSignup from '../customHooks/useSignup';
import { Link } from 'react-router-dom';
const Signup = () => {
    const { signupUser, email, setEmail, password, setPassword } = useSignup()
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                    <div>
                        <h2 className="text-center text-2xl font-bold text-gray-800">Signup</h2>
                    </div>
                    <form className="space-y-6" onSubmit={signupUser} >
                        <div>
                            <label className="block font-medium text-gray-700" htmlFor="name">Name</label>
                            <input className="form-input block w-full mt-1 rounded-md shadow-sm bg-gray-200" id="name" type="text" name="name" required />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700" htmlFor="email">Email address</label>
                            <input onChange={(e) => setEmail(e.target.value)} className="bg-gray-200 form-input block w-full mt-1 rounded-md shadow-sm" id="email" type="email" name="email" required />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700" htmlFor="password">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} className="bg-gray-200 form-input block w-full mt-1 rounded-md shadow-sm" id="password" type="password" name="password" required />
                        </div>
                        <div>
                            <button type='submit' className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Sign up
                            </button>
                        </div>
                        <div>
                            <h1 className='text-center'>

                                Already have an Account? <Link to={'/login'} className='text-blue-800'>Login</Link>
                            </h1>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;
