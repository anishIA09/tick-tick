"use client";

import { post } from "@/config/api";
import Link from "next/link";
import React, { useState } from "react";

const SigninPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await post({ url: "/auth/signup", body: formData });
    } catch (error) {
      console.log("Error while signing up user", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-lg w-full flex flex-col items-center">
        <div className="mb-4 w-full">
          <h2 className="text-3xl font-semibold mb-2 text-center">
            Register Account
          </h2>
          <p className="text-sm text-neutral-400 text-center">
            Create new account.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                placeholder="Enter your email"
                name={"email"}
                value={formData.email}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    email: e.target.value,
                  }))
                }
                className="h-10 rounded-lg text-sm px-3 placeholder:text-neutral-500 border border-neutral-300 w-full"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                name={"password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    password: e.target.value,
                  }))
                }
                className="h-10 rounded-lg text-sm px-3 placeholder:text-neutral-500 border border-neutral-300 w-full"
              />
            </div>
          </div>
          <button className="w-full mt-6 h-10 text-sm font-medium text-white bg-neutral-900 flex items-center justify-center rounded-lg hover:bg-neutral-900/80 active:bg-neutral-900">
            Sign Up
          </button>
        </form>
        <div className="flex items-center justify-center gap-2 text-sm mt-6">
          <p className="text-neutral-400">Already have an account?</p>
          <Link
            href={"/signin"}
            className="font-semibold hover:underline hover:underline-offset-4"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
