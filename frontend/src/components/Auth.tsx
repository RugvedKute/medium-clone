import React, { useState } from "react";
import { Link } from "../../node_modules/react-router-dom/dist/index";
import { SignupType } from "../../node_modules/@rugvedkute/common/dist/index";
import axios from "../../node_modules/axios/index";
import { constants } from "../config";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";

export default function ({ type }: { type: "signin" | "signup" }) {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupType>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        constants.API_URL +
          "/api/v1/user/" +
          (type == "signup" ? "signup" : "signin"),
        postInputs
      );

      const token = response.data;
      localStorage.setItem("token", JSON.stringify(token));
      navigate("/home");
    } catch (err) {
      alert("Error while signing up");
      console.error(err);
    }
  }
  return (
    <div className="flex items-center justify-center bg-white-100">
      <div>
        <h2 className="text-3xl font-bold">Create an Account</h2>
        <h4 className="mt-1 text-normal text-center text-slate-400">
          {type == "signup"
            ? "Already have an account?"
            : "Don't have an account?"}

          <Link
            className="underline cursor-pointer ml-1 hover:text-slate-600"
            to={type == "signup" ? "/signin" : "/signup"}
          >
            {type == "signup" ? "Login" : "Sign up"}
          </Link>
        </h4>
        <form className="mt-5">
          {type == "signup" ? (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold">Username</label>
              <input
                type="text"
                className="px-2 py-1 border-2 border-slate-200 rounded-md focus:outline-none"
                placeholder="Enter your username"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              ></input>
            </div>
          ) : (
            <div></div>
          )}

          <div className="mt-3 flex flex-col gap-1">
            <label className="text-sm font-bold">Email</label>
            <input
              type="email"
              className="px-2 py-1 border-2 border-slate-200 rounded-md focus:outline-none"
              placeholder="m@example.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            ></input>
          </div>
          <div className="mt-3 flex flex-col gap-1">
            <label className="text-sm font-bold">Password</label>
            <input
              type="password"
              className="px-2 py-1 border-2 border-slate-200 rounded-md focus:outline-none"
              placeholder="*****"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            ></input>
          </div>
          <button
            type="button"
            className="mt-5 py-2 bg-black w-full text-center text-white text-sm rounded-md"
            onClick={sendRequest}
          >
            {type == "signup" ? "Sign up" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
