"use client";
import React, { useState } from "react";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = ({ isModalOpen, setIsModalOpen, fetchData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    if (validateEmail(email)) {
      setErrorMessage("");

      function validatePassword(password) {
        const passwordRegex = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        return passwordRegex.test(password);
      }
      if (validatePassword(password)) {
        setErrorMessage("");
        console.log("Password is valid");

        try {
          const response = await axios.post("http://localhost:3001/user", {
            username,
            email,
            password,
          });

          console.log(response);
          toast.success("User created successfully");
          setErrorMessage("");
          fetchData();
          setIsModalOpen(false);
        } catch (error) {
          toast.error("SignUp Failed");
          console.error("Signup failed:", error);
          setErrorMessage("Signup failed, check your password and email");
        }
      } else {
        setErrorMessage(
          "Password must contain at least 8 characters long, contain at least one digit, and contain at least one uppercase letter."
        );
        console.log("Password is invalid");
      }
    } else {
      setErrorMessage("Email is invalid");
      console.log("Email is invalid");
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        id="my-modal-signup"
        className="modal-toggle"
        checked={isModalOpen}
        onChange={() => setIsModalOpen(!isModalOpen)}
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form onSubmit={handleSignup}>
            {" "}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && (
              <div className="text-error mt-2 text-sm">{errorMessage}</div>
            )}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Confirm password</span>
              </label>
              <input
                type="password"
                name="confpassword"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex mt-5 justify-between">
              <label
                htmlFor="my-modal-signup"
                className="btn btn-outline btn-error"
              >
                Cancel
              </label>
              <button
                type="submit"
                htmlFor="my-modal-signup"
                className="btn btn-outline btn-success"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
