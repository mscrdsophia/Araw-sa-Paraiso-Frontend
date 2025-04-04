import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context"; // Import AuthContext

function SignUp() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("user");

    const navigate = useNavigate();
    

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        const requestBody = {
          email,
          password,
          firstName,
          lastName,
            phoneNumber,
            role
              }
     const API_URL = import.meta.env.VITE_API_URL;
    axios.post(`${API_URL}/auth/api/signup`, requestBody)
        .then(response => {
            const { data } = response;
            
            navigate("/"); // Redirect to home page
        })
        .catch(error => {
            console.error("Error during signup:", error);
        });
         
    }

    
    
        return (
            <div className ="">
              <section className="rounded-md p-2 bg-white">
                <div className="flex items-center justify-center my-3">
                  <div className="xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <div className="mb-2" />
                    <h2 className="text-2xl font-bold leading-tight">
                      Sign up to create account
                    </h2>
                    <p className="mt-2 text-base text-gray-600">
                      Already have an account? Sign In
                    </p>
                    <form className="mt-5" onSubmit={handleSignupSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label className="text-base font-medium text-gray-900">
                            First Name
                          </label>
                          <div className="mt-2">
                            <input 
                            type="text" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" name="user_name" />
                          </div>
                        </div>
                        <div>
                          <label className="text-base font-medium text-gray-900">
                            Last Name
                          </label>
                          <div className="mt-2">
                            <input 
                            type="text" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" name="user_name" />
                          </div>
                        </div>
                        <div>
                          <label className="text-base font-medium text-gray-900">
                            Email address
                          </label>
                          <div className="mt-2">
                            <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" name="email" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <label className="text-base font-medium text-gray-900">
                              Password
                            </label>
                          </div>
                          <div className="mt-2">
                            <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" name="password" />
                          </div>
                        </div>
                        <div>
                          <label className="text-base font-medium text-gray-900">
                            Phone Number
                          </label>
                          <div className="mt-2">
                            <input 
                            type="tel" 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" name="phone_number" />
                          </div>
                        </div>
                        <div>
                          <label className="text-base font-medium text-gray-900">
                            Role
                          </label>
                          <select 
                            value={role} 
                         onChange={(e) => setRole(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                            >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        </select>
                        </div>
                        <div>   

                          <button className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80" type="submit">
                            Create Account
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
            </div>
          );
    
    }

    export default SignUp;