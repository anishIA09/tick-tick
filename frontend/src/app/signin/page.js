"use client";

import { post } from "@/config/api";
import Link from "next/link";
import React, { useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await post({ url: "/auth/signin", body: formData });
    } catch (error) {
      console.log("Error while signing up user", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-lg w-full flex flex-col items-center">
        <div className="mb-4">
          <h2 className="text-3xl font-semibold mb-2">Welcome Back!</h2>
          <p className="text-sm text-neutral-400 text-center">
            Get started with thing
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
                className="h-10 rounded-lg text-sm px-3 placeholder:text-neutral-500 w-full border border-neutral-300"
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
          <button className="mt-6 w-full h-10 text-sm font-medium text-white bg-neutral-900 flex items-center justify-center rounded-lg hover:bg-neutral-900/80 active:bg-neutral-900">
            Sign In
          </button>
        </form>
        <div className="mt-6 flex items-center justify-center text-sm">
          <p className="text-neutral-500">Don&apos;t have an account?</p>
          <Link
            href={"/signup"}
            className="ml-2 font-semibold hover:underline hover:underline-offset-4"
          >
            Register account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
