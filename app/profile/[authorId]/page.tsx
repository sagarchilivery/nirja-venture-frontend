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
      <div className=" flex flex-col min-h-screen pb-24">
        {author && (
          <div className="bg-red-900">
            <div className="bg-red-500 p-5 m-5 rounded-md">
              <h1>User name - {author.username}</h1>
              <p>email - {author.email}</p>
              <span>Total articles - {articles.length}</span>
            </div>
          </div>
        )}

        <div className="bg-red-900 w-screen min-h-screen">
          {articles.map((article, index) => (
            <div key={index} className="bg-red-500 p-5 m-5 rounded-md">
              <h1>{article.title}</h1>
              <p>{article.content}</p>
              <span>Author - {article.author.username}</span>{" "}
              <span>Created At - </span>
              {ConvertDate(article.createdAt)} {ConvertTime(article.createdAt)}
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
}
