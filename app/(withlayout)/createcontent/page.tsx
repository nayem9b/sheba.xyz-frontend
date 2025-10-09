"use client";

import React from "react";
import { usePostCategoryMutation } from "@/redux/api/categoryApi";
import { useRouter } from "next/navigation";
import { message } from "antd";
import TextArea from "antd/es/input/TextArea";

const CreateContentpage = () => {
  const router = useRouter();
  const [postCategory] = usePostCategoryMutation();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form = event.target;
    const heading = form.heading.value;
    const content = form.content.value;
    const image = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=4879859cdc7827193ef39d9fcfdd7c52`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        message.loading("uploading");
        console.log(imgData);
        if (imgData) {
          const contentSendData = {
            heading: heading,
            content: content,
            image: imgData?.data?.url,
          };

          fetch(`http://localhost:3000/api/v1/content`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(contentSendData),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.data) {
                message.success("Posted Blog");
                form.reset();
              } else {
                message.error("Error adding category");
              }
            });
        }
      });
  };
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Create Post</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="image" className="block text-sm text-gray-600 ">
              Image
            </label>

            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200  placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600  dark:focus:border-blue-300 cursor-pointer"
            />
            <label className="text-sm text-gray-600 mt-10">Post Heading</label>

            <div className="relative">
              <input
                type="name"
                name="heading"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Example: Our cultural festival at Dhaka"
              />
            </div>
          </div>

          <label className="text-sm mt-14 text-gray-600">Content</label>
          <TextArea rows={4} name="content" />
          <div className="flex flex-row-reverse">
            <button className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white cursor-pointer">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContentpage;
