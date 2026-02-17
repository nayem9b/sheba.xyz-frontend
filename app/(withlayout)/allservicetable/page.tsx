/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import ShebaTable from "@/components/ui/ShebaTable";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { useDeleteServiceMutation } from "@/redux/api/servicesApi";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Select, message, Upload, Spin } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import * as yup from "yup";
import { serviceSchema } from "@/schemas/service";

const allServices = () => {
  const [selectData, setSelectData] = useState();
  const { data: allCategories } = useCategoriesQuery();
  const [loading, setLoading] = useState(false);
  const categoryOptions = allCategories?.data?.map((category: any) => {
    return {
      label: category?.title,
      value: category?.id,
    };
  });

  const handleChange = (value: any) => {
    setSelectData(value);
    console.log(`selected ${value}`);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form?.name.value;
    const price = form?.price?.value;
    const details = form?.details.value;
    const status = form?.status?.value;

    if (!imageFile) {
      message.error("Please select an image");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    const url = `https://api.imgbb.com/1/upload?key=4879859cdc7827193ef39d9fcfdd7c52`;

    try {
      const imgRes = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const imgData = await imgRes.json();

      if (imgData.success && imgData.data?.url) {
        const addServiceSendData = {
          name: name,
          price: parseInt(price),
          details: details,
          image: imgData.data.url,
          categoryId: selectData,
          status: status,
          rating: "5",
        };

        const res = await fetch(
          `https://sheba-backkend.vercel.app/api/v1/create-service`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(addServiceSendData),
          },
        );
        const data = await res.json();
        message.success("Service added successfully!");
        form.reset();
        setImageUrl(undefined);
        setImageFile(null);
      } else {
        message.error("Image upload failed. Please try again.");
      }
    } catch (error) {
      message.error("Failed to add service. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [imageUrl, setImageUrl] = useState<string>();
  const [imageFile, setImageFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center py-10">
      <div className="bg-white/90 shadow-2xl rounded-3xl p-10 max-w-xl w-full border border-blue-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2 tracking-tight">
            Add a Service
          </h1>
          <p className="text-gray-500 text-sm">
            Fill in the details to add a new service
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Category
            </label>
            <Select
              className="w-full"
              placeholder="Select Category"
              onChange={handleChange}
              options={categoryOptions}
              size="large"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Status
            </label>
            <select
              name="status"
              className="w-full rounded-xl border border-gray-200 p-3 text-base shadow-sm focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
            >
              <option value="available">Available</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Name
            </label>
            <input
              autoFocus
              required
              className="w-full rounded-xl border border-gray-200 p-3 text-base shadow-sm focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
              placeholder="Service Name"
              type="text"
              name="name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              required
              type="number"
              className="w-full rounded-xl border border-gray-200 p-3 text-base shadow-sm focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
              placeholder="Price"
              name="price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Details
            </label>
            <textarea
              className="w-full px-3 h-36 text-gray-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
              name="details"
              placeholder="Describe the service..."
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Image
            </label>
            <Upload.Dragger
              name="image"
              accept="image/*"
              beforeUpload={(file) => {
                const reader = new FileReader();
                reader.onload = () => setImageUrl(reader.result as string);
                reader.readAsDataURL(file);
                setImageFile(file);
                return false;
              }}
              className="rounded-xl border border-gray-200 p-3 text-base shadow-sm focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
            >
              <p className="ant-upload-drag-icon">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    width={128}
                    height={128}
                    className="object-cover rounded-xl border border-blue-200 shadow-md"
                  />
                )}
              </p>
              <p className="ant-upload-text">
                Drag & drop an image here, or click to select
              </p>
            </Upload.Dragger>
          </div>
          <div className="flex justify-center mt-8">
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-10 py-3 text-base font-semibold text-white shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 border-0"
            >
              {loading ? <Spin /> : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default allServices;
