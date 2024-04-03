import React from "react";
import { Link } from "../../node_modules/react-router-dom/dist/index";

interface NavbarProps {
  displayPublish?: boolean;
}

export default function Navbar({ displayPublish = true }) {
  return (
    <div className="px-6 py-3 border-b-2 border-slate-100 sticky w-full top-0 z-20 bg-white">
      <nav className="flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-5">
          <div className="text-3xl font-bold font-sans">
            <Link to={"/home"}>Medium</Link>
          </div>
          <div className="flex items-center justify-center gap-2 bg-slate-100 py-1.5 px-3 rounded-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              className="focus:outline-none bg-transparent"
              type="text"
            ></input>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          {displayPublish == true ? (
            <Link to={"/publish"}>
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  className="h-8 w-8"
                  stroke="grey"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                <span className="ml-2 ">Write</span>
              </div>
            </Link>
          ) : (
            <div></div>
          )}

          <div className="flex items-center justify-center text-white bg-blue-400 w-10 h-10 rounded-full">
            R
          </div>
          <div></div>
        </div>
      </nav>
    </div>
  );
}
