import { useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";
import { constants } from "../config";

interface Blog {
  id: String;
  title: String;
  content: String;
  author: {
    name: string;
  };
}

export const useFetchBlog = (id: string) => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const data = JSON.parse(token);
    const AuthStr = "Bearer ".concat(data.jwt);
    axios
      .get(constants.API_URL + `/api/v1/blog/${id}`, {
        headers: { Authorization: AuthStr },
      })
      .then((response) => {
        setBlog(response.data.blog);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blog,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    const data = JSON.parse(token);
    const AuthStr = "Bearer ".concat(data.jwt);
    axios
      .get(constants.API_URL + "/api/v1/blog/all", {
        headers: { Authorization: AuthStr },
      })
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};
