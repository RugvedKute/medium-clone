import React, { useState } from "react";
import axios from "../../node_modules/axios/index";
import Navbar from "../components/Navbar";
import { constants } from "../config";
import { CreatePostType } from "../../node_modules/@rugvedkute/common/dist/index";
import { useNavigate } from "../../node_modules/react-router-dom/dist/index";

export default function Publish() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const token = localStorage.getItem("token") || "";
      const data = JSON.parse(token);
      const AuthStr = "Bearer ".concat(data.jwt);
      const blogData: CreatePostType = {
        title: title,
        content: content,
      };
      const response = await axios.post(
        constants.API_URL + "/api/v1/blog",
        blogData,
        {
          headers: { Authorization: AuthStr },
        }
      );
      useNavigate("/home");
    } catch (err) {
      console.error(err);
      alert("Error while posting a blog");
    }
  }

  return (
    <div>
      <Navbar displayPublish={false}></Navbar>
      <div className="w-full flex items-center justify-center">
        <div className="max-w-screen-lg mt-10 flex flex-col">
          <div className="w-full">
            <input
              type="text"
              className="border-slate-200 border-2 rounded-md focus:outline-none p-2 w-full"
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
            <textarea
              rows={10}
              className="mt-4 border-slate-200 border-2 rounded-md focus:outline-none  p-2 w-full"
              placeholder="Content"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            ></textarea>

            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={sendRequest}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
