"use client";

import Base from "@/components/layout/base";
import { Context } from "@/context";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { use, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PostArticle() {
  const { state } = useContext(Context);
  const { user } = state;
  const [userId, setUserId] = useState("");
  const [article, setArticle] = useState<any>({
    title: "",
    content: "",
  });

  const [userData, setUserData] = useState<any>();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:1337/articles", article, {
        withCredentials: true,
      });

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

  const fetchUserData = async () => {
    try {
      const res = await axios.get("http://localhost:1337/auth/" + user.id);
      if (res.data.success) {
        setUserData(res.data.data);
      }
    } catch (error) {
      router.push("/");
      console.log("error: ", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      fetchUserData();
    } else {
      setUserId("");
      router.push("/");
    }
  }, [user]);

  return (
    <Base>
      {user && userId !== "" && userData && (
        <div className=" flex flex-col items-center justify-center mt-12 rounded-md">
          <div className="">Name - {userData.username}</div>
          <div className="">Email - {userData.email}</div>
          <div className="">Credits Left - {userData.credits}</div>
        </div>
      )}
      <div className="flex justify-center items-start mt-32 w-screen h-screen">
        <div className="bg-cyan-800 px-6 py-5 rounded-md">
          <h1 className=" text-xl">Post Article</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              className=" p-2 w-full mt-4 rounded-md text-black"
              onChange={(e) =>
                setArticle({ ...article, title: e.target.value })
              }
              value={article.title}
            />
            <textarea
              placeholder="Content"
              className="w-full p-2 mt-7 rounded-md text-black resize-none h-[150px]"
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
