"use client";
import Base from "@/components/layout/base";
import { Context } from "@/context";
import axios from "axios";
import React, { use, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ConvertDate, ConvertTime } from "../page";
import { useRouter } from "next/navigation";
import MyModal from "@/components/modal";

export default function Profile() {
  const { state } = useContext(Context);
  const { user } = state;
  const [userId, setUserId] = useState("");
  const [modalData, setModalData] = useState({
    flag: false,
    article: {},
  });

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

  const [userData, setUserData] = useState<any>();

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
    fetchArticles();
  }, [modalData]);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
      fetchUserData();
    } else {
      setUserId("");
      router.push("/");
    }
  }, [user]);

  async function handleDelete(id: any) {
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
      <>
        <>
          <div>
            {user && userId !== "" && userData && (
              <div className=" flex flex-col items-center justify-center my-10 rounded-md">
                <div className="">Username - {userData.username}</div>
                <div className="">email - {userData.email}</div>
                <div className="">Credits - {userData.credits}</div>
                <div className="">Total articles - {articles.length}</div>
              </div>
            )}
          </div>
          {articles.length == 0 ? (
            <div className=" flex items-center justify-center mt-10">
              No articles found
            </div>
          ) : (
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
                  <div className="mt-5 flex gap-5">
                    <button
                      onClick={() => {
                        setModalData({ flag: true, article: article });
                      }}
                      className=" border rounded-md px-4 py-1.5 bg-slate-600 hover:bg-sky-950"
                    >
                      Update
                    </button>
                    <button
                      className=" border rounded-md px-4 py-1.5 bg-slate-600 hover:bg-sky-950"
                      onClick={() => handleDelete(article._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>

        {modalData.flag && (
          <MyModal modalData={modalData} setModalData={setModalData} />
        )}
      </>
    </Base>
  );
}
