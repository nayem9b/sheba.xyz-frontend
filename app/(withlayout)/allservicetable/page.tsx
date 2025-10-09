/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import ShebaTable from "@/components/ui/ShebaTable";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { useDeleteServiceMutation } from "@/redux/api/servicesApi";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Select, message } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import * as yup from "yup";
import { serviceSchema } from "@/schemas/service";

const allServices = () => {
  const [selectData, setSelectData] = useState();
  const { data: allCategories } = useCategoriesQuery();
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
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const name = form?.name.value;
    const price = form?.price?.value;
    console.log("price", price);
    const details = form?.details.value;
    const status = form?.status?.value;
    console.log(selectData);
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
          const addServiceSendData = {
            name: name,
            price: parseInt(price),
            details: details,
            image: imgData.data.url,
            categoryId: selectData,
            status: status,
            rating: "5",
          };

          console.log(addServiceSendData);

          fetch(`http://localhost:3000/api/v1/create-service`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(addServiceSendData),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              message.success("successful");
              form.reset();
            });
        }
      });
  };
  const [imageUrl, setImageUrl] = useState<string>();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center py-10">
      <div className="bg-white/90 shadow-2xl rounded-3xl p-10 max-w-xl w-full border border-blue-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2 tracking-tight">Add a Service</h1>
          <p className="text-gray-500 text-sm">Fill in the details to add a new service</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Category</label>
            <Select
              className="w-full"
              placeholder="Select Category"
              onChange={handleChange}
              options={categoryOptions}
              size="large"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Status</label>
            <select name="status" className="w-full rounded-xl border border-gray-200 p-3 text-base shadow-sm focus:ring-2 focus:ring-blue-200 focus:outline-none transition">
              <option value="available">Available</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input
              required
              type="number"
              className="w-full rounded-xl border border-gray-200 p-3 text-base shadow-sm focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
              placeholder="Price"
              name="price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
            <textarea
              className="w-full px-3 h-36 text-gray-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
              name="details"
              placeholder="Describe the service..."
            ></textarea>
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="block w-full px-3 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-xl file:bg-blue-100 file:text-blue-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => setImageUrl(reader.result as string);
                  reader.readAsDataURL(file);
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
          <div className="flex justify-center mt-8">
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-10 py-3 text-base font-semibold text-white shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 border-0"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default allServices;
