"use client";
import { ConvertDate, ConvertTime } from "@/app/page";
import Base from "@/components/layout/base";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UsernameProfile() {
  const [articles, setArticles] = useState<any[]>([]);
  const router = useRouter();
  const { authorId } = useParams();

  const fetchArticles = async () => {
    try {
      const res = await axios.get(
        "http://localhost:1337/articles/user/" + authorId
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

  const [author, setAuthor] = useState<any>();

  const getAuthor = async () => {
    try {
      const res = await axios.get("http://localhost:1337/auth/" + authorId);
      if (res.data.success) {
        setAuthor(res.data.data);
      }
    } catch (error) {
      router.push("/");
      console.log("error: ", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (authorId) {
      fetchArticles();
      getAuthor();
    }
  }, [authorId]);

  return (
    <Base>
      <div className=" flex flex-col min-h-screen">
        {author && (
          <div className=" flex flex-col items-center justify-center my-10 rounded-md">
            <div className="">Username - {author.username}</div>
            <div className="">email - {author.email}</div>
            <span>Total articles - {articles.length}</span>
          </div>
        )}

        <div className="bg-sky-900 w-screen min-h-screen py-5">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-sky-700 p-5 m-5 max-w-[550px] mx-auto shadow-2xl rounded-md"
            >
              <h2>Title - {article.title}</h2>
              <div>Content - {article.content}</div>
              <div>Author - {article.author.username}</div>
              <div>
                Created At - {ConvertDate(article.createdAt)}{" "}
                {ConvertTime(article.createdAt)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
}
