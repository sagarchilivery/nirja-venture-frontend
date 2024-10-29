"use client";

import Base from "@/components/layout/base";
import { Context } from "@/context";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

export default function PostArticle() {
  const { state } = useContext(Context);
  const { user } = state;
  const [article, setArticle] = useState<any>({
    title: "",
    content: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      console.log("article: ", article);

      const res = await axios.post("http://localhost:1337/articles", article, {
        withCredentials: true,
      });
      console.log("sagar123: ", res);

      if (res.data.success) {
        toast.success(res.data.message);
        setArticle({ title: "", content: "" });
        router.push("/profile");
      } else {
        console.log("res.data: ", res.data);
        toast.error(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("error: ", error);
    }
  };

  return (
    <Base>
      {user && (
        <div className="">
          <div className="">name - {user.username}</div>
          <div className="">email - {user.email}</div>
          <div className="">Credits - {user.credits}</div>
        </div>
      )}
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="bg-red-500 p-5 m-5 rounded-md">
          <h1>Post Article</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 m-2 rounded-md text-black"
              onChange={(e) =>
                setArticle({ ...article, title: e.target.value })
              }
              value={article.title}
            />
            <textarea
              placeholder="Content"
              className="w-full p-2 m-2 rounded-md text-black"
              onChange={(e) =>
                setArticle({ ...article, content: e.target.value })
              }
              value={article.content}
            ></textarea>
            <button type="submit" className="bg-green-500 p-2 m-2 rounded-md">
              Post
            </button>
          </form>
        </div>
      </div>
    </Base>
  );
}
