"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from 'react'
import { signUpSchema } from '@/formSchema/SignInUpSchema';
function page() {
    const {
        register: registerSignUp,
        handleSubmit: handleSignUp,
        formState: { errors: signUpErrors },
      } = useForm({
        resolver: zodResolver(signUpSchema),
      });

      const onSubmitSignUp = (data) => {
        console.log("Sign Up Data: ", data);
      };
  return (
    <div className="min-h-screen flex flex-col items-cneter justify-start bg-indigo-700 p-6">

    <div id="signup" className="bg-white p-6 mt-10 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-black text-center">Sign Up</h2>
        <form onSubmit={handleSignUp(onSubmitSignUp)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...registerSignUp("name")}
              className="w-full p-2 mt-1 border rounded-md"
            />
            {signUpErrors.name && (
              <p className="text-red-500 text-sm">{signUpErrors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...registerSignUp("email")}
              className="w-full p-2 mt-1 border rounded-md"
              />
            {signUpErrors.email && (
              <p className="text-red-500 text-sm">{signUpErrors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...registerSignUp("password")}
              className="w-full p-2 mt-1 border rounded-md"
            />
            {signUpErrors.password && (
                <p className="text-red-500 text-sm">{signUpErrors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-800"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default page