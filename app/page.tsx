"use client";

import Base from "@/components/layout/base";
import { Context } from "@/context";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export function ConvertDate(timestamp: any) {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return formattedDate;
}

export function ConvertTime(timestamp: any) {
  const date = new Date(timestamp);
  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return formattedTime;
}

export default function Home() {
  const { state } = useContext(Context);
  const { user } = state;
  const router = useRouter();
  console.log("user: ", user);

  const [articles, setArticles] = useState<any[]>([]);

  const fetchArticles = async () => {
    const res = await axios.get("http://localhost:1337/articles");
    if (res.data.success) {
      setArticles(res.data.data);
    } else {
      toast.error(res.data.message);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <Base>
      <></>
      {articles.length == 0 ? (
        <div className=" flex items-center justify-center mt-10">
          No articles found
        </div>
      ) : (
        <div className="bg-sky-900 w-screen min-h-screen py-5">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-sky-700 p-5 m-5 rounded-md max-w-[550px] mx-auto shadow-2xl"
            >
              <h2>Title - {article.title}</h2>
              <div>Content - {article.content}</div>
              <div
                onClick={() => {
                  router.push(`/profile/${article.author._id}`);
                  console.log("article.author: ", article);
                }}
                className="cursor-pointer"
              >
                Author -{" "}
                <span className="text-lime-400 font-semibold">
                  {article.author.username}
                </span>
              </div>{" "}
              <span>Created At - </span>
              {ConvertDate(article.createdAt)} {ConvertTime(article.createdAt)}
            </div>
          ))}
        </div>
      )}
    </Base>
  );
}
