"use client";

import React, { useState } from "react";
import { Button, message, Select, Card, Pagination, Spin } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import {
  useServicesQuery,
  useDeleteServiceMutation,
} from "@/redux/api/servicesApi";
import Link from "next/link";
import { setToLocalStorage } from "@/utils/local-storage";

const AddService = () => {
  const [deleteService] = useDeleteServiceMutation();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { data: allServices, isLoading } = useServicesQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
    page,
    size,
    sortBy,
    sortOrder,
    searchTerm,
    category: selectedCategory,
  });
  const meta = allServices?.meta;

  const deleteHandler = async (id: string) => {
    message.loading("Deleting...");
    try {
      const res = await deleteService(id);
      if (res?.data?.statusCode === 200) {
        message.success("Service deleted successfully");
      } else {
        message.error("Service is being used by a user. Delete prohibited.");
      }
    } catch (err: any) {
      message.error("Failed to delete service. Please try again.");
    }
  };

  const { data: allCategories } = useCategoriesQuery();
  const categoryOptions = allCategories?.data?.map((category: any) => ({
    label: category?.title,
    value: category?.id,
  }));

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 mt-10">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
          All Services
        </h1>
        <div className="flex space-x-4">
          <Link href="/allservicetable">
            <Button
              type="primary"
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              size="large"
            >
              Add New Service
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allServices?.data?.map((service: any) => (
                <div
                  key={service.id}
                  className="relative bg-cover bg-center rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  style={{
                    backgroundImage: `url(${
                      service.image || "/placeholder-service.jpg"
                    })`,
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
                  <div className="relative p-5 z-10">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {service.name}
                        </h3>
                        <p className="text-sm text-gray-300 mb-2">
                          {service.location}
                        </p>
                        <p className="text-2xl font-bold text-blue-300">
                          {service.price} <span className="text-base">৳</span>
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/addservice/edit/${service.id}`}>
                          <Button
                            type="text"
                            icon={<EditOutlined className="text-blue-500" />}
                            className="hover:bg-blue-50 dark:hover:bg-gray-600 rounded-full"
                          />
                        </Link>
                        <Button
                          danger
                          type="text"
                          icon={<DeleteOutlined />}
                          onClick={() => deleteHandler(service.id)}
                          className="hover:bg-red-50 dark:hover:bg-gray-600 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Showing{" "}
              <span className="font-medium">{(page - 1) * size + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(page * size, meta?.total || 0)}
              </span>{" "}
              of <span className="font-medium">{meta?.total}</span> results
            </span>
            <Pagination
              current={page}
              pageSize={size}
              total={meta?.total}
              onChange={onPaginationChange}
              showSizeChanger
              className="dark:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;
