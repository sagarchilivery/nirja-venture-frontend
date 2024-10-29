"use client";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MyModal({ modalData, setModalData }: any) {
  const [newArticle, setNewArticle] = useState({
    title: modalData.article.title,
    content: modalData.article.content,
  });

  function open() {
    setModalData({
      flag: true,
      article: modalData.article,
    });
  }

  function close() {
    setModalData({
      flag: false,
      article: modalData.article,
    });
  }

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "http://localhost:1337/articles/" + modalData.article._id,
        newArticle,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        // fetchArticles();
        close();
        toast.success("Article updated successfully");
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Dialog
        open={modalData.flag}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 bg-[#1212129f] w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-sky-600 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className=" text-lg font-medium text-white">
                Update Article
              </DialogTitle>

              <div className="">
                <div className="mt-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    onChange={(e) => {
                      setNewArticle({
                        ...newArticle,
                        title: e.target.value,
                      });
                    }}
                    value={newArticle.title}
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-white"
                  >
                    Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    onChange={(e) => {
                      setNewArticle({
                        ...newArticle,
                        content: e.target.value,
                      });
                    }}
                    value={newArticle.content}
                    rows={3}
                    className="mt-1 block resize-none w-full px-3 py-2 bg-gray-700 text-white rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  ></textarea>
                </div>
              </div>
              <div className=""></div>

              <div className="mt-4 flex  gap-5">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={handleUpdate}
                >
                  Confirm
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
