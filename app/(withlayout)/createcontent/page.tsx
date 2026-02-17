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
        message.loading("Uploading image...");
        if (imgData) {
          const contentSendData = {
            heading: heading,
            content: content,
            image: imgData?.data?.url,
          };

          fetch(`https://sheba-backkend.vercel.app/api/v1/content`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(contentSendData),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.data) {
                message.success("Post created successfully!");
                form.reset();
              } else {
                message.error("Error creating post.");
              }
            });
        }
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create a New Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="heading"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Post Heading
            </label>
            <input
              type="text"
              id="heading"
              name="heading"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Example: Our cultural festival at Dhaka"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Content
            </label>
            <TextArea
              id="content"
              name="content"
              rows={6}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Write your content here..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContentpage;
