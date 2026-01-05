"use client";

import { usePostCategoryMutation } from "@/redux/api/categoryApi";
import { Button, Upload, message } from "antd";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useState } from "react";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const AddCategorypage = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const router = useRouter();
  const [postCategory] = usePostCategoryMutation();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form = event.target;
    const categoryName = form.name.value;

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
          const categorySendData = {
            title: categoryName,
            image: imgData?.data?.url,
          };

          fetch(`https://sheba-xyz-backend-0wsp.onrender.com/api/v1/categories`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(categorySendData),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.data) {
                message.success("Category added successfully");
                message.success("Moved to service adding");
                router.push("/addservice");
              } else {
                message.error("Error adding category");
              }
            });
          form.reset();
        }
      });
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center py-10">
      <div className="bg-white/90 shadow-2xl rounded-3xl p-10 max-w-md w-full border border-blue-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2 tracking-tight">
            Create a Category
          </h1>
          <p className="text-gray-500 text-sm">
            Add a new category with a name and image
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="category_name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category Name
            </label>
            <input
              type="name"
              name="name"
              placeholder="Enter category name"
              className="w-full rounded-xl border border-gray-200 p-3 text-base shadow-sm focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
              required
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="block w-full px-3 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-xl file:bg-blue-100 file:text-blue-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full"
              required
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  getBase64(file as RcFile, (url) => setImageUrl(url));
                } else {
                  setImageUrl(undefined);
                }
              }}
            />
            {imageUrl && (
              <div className="flex justify-center mt-4">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-xl border border-blue-200 shadow-md"
                />
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-10 py-3 text-base font-semibold text-white shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 mt-4"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategorypage;
