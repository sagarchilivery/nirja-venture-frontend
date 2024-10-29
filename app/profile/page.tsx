"use client";
import Base from "@/components/layout/base";
import { Context } from "@/context";
import axios from "axios";
import React, { use, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ConvertDate, ConvertTime } from "../page";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { state } = useContext(Context);
  const { user } = state;
  const [userId, setUserId] = useState("");

  const router = useRouter();

  const [articles, setArticles] = useState<any[]>([]);

  const fetchArticles = async () => {
    try {
      const res = await axios.get(
        "http://localhost:1337/articles/user/" + user.id
      );
      if (res.data.success) {
        setArticles(res.data.data);
      }
    } catch (error) {
      router.push("/");
      console.log("error: ", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    } else {
      setUserId("");
      router.push("/");
    }
  }, [user]);

  async function handleDelete(id: any) {
    console.log("id: ", id);
    try {
      const res = await axios.delete("http://localhost:1337/articles/" + id, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        fetchArticles();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error("Something went wrong");
    }
  }

  return (
    <Base>
      <div>
        {user && userId !== "" && (
          <div className="">
            <div className="">name - {user.username}</div>
            <div className="">email - {user.email}</div>
            <div className="">Credits - {user.credits}</div>
            <div className="">total articles - {articles.length}</div>
          </div>
        )}
      </div>
      <div className="bg-red-900 w-screen min-h-screen">
        {articles.map((article, index) => (
          <div key={index} className="bg-red-500 p-5 m-5 rounded-md">
            <h1>{article.title}</h1>
            <p>{article.content}</p>
            <span>Author - {article.author.username}</span>
            <span>Created At - </span>
            {ConvertDate(article.createdAt)} {ConvertTime(article.createdAt)}
            <div className="px-5 flex gap-5">
              <button>Update</button>
              <button onClick={() => handleDelete(article._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </Base>
  );
}
