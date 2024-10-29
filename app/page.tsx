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
      <div className="bg-red-900 w-screen min-h-screen">
        {articles.map((article, index) => (
          <div key={index} className="bg-red-500 p-5 m-5 rounded-md">
            <h1>{article.title}</h1> <p>{article.content}</p>
            <span
              onClick={() => {
                router.push(`/profile/${article.author._id}`);
                console.log("article.author: ", article);
              }}
              className="cursor-pointer"
            >
              Author - {article.author.username}
            </span>{" "}
            <span>Created At - </span>
            {ConvertDate(article.createdAt)} {ConvertTime(article.createdAt)}
          </div>
        ))}
      </div>
    </Base>
  );
}
