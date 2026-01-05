"use client";

import { useSingleServicesQuery } from "@/redux/api/servicesApi";
import React, { useEffect, useState } from "react";
import ServiceHomeCard from "@/components/ui/ServiceHomeCard";
import { Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { Package } from "lucide-react";
import { motion } from "framer-motion";

const ServicesUnderCategoryPage = ({ params }: { params: any }) => {
  const [servicesUnderCategory, setServicesUnderCategory] = useState<any>();
  const [category, setCategory] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://sheba-xyz-backend-0wsp.onrender.com/api/v1/services/category/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setServicesUnderCategory(data?.data);
        setCategory(data?.data[0]?.category?.title);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [id]);

  const servicesCount = servicesUnderCategory?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Main Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton.Input
                  active
                  size="large"
                  block
                  style={{ height: "50px" }}
                />
                <Skeleton.Input
                  active
                  size="small"
                  block
                  style={{ height: "20px", width: "200px", margin: "0 auto" }}
                />
              </div>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/50 rounded-full mb-6 backdrop-blur-sm">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-700">
                    {servicesCount} Services Available
                  </span>
                </div>
                <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
                  {category}
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover top-rated {category} services by verified
                  professionals. Quality guaranteed.
                </p>
                <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-6 rounded-full"></div>
              </>
            )}
          </motion.div>

          {/* Services Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden">
                  <Skeleton.Image
                    active
                    style={{ width: "100%", height: "280px" }}
                  />
                  <div className="p-4 space-y-3 bg-white">
                    <Skeleton.Input active size="small" block />
                    <Skeleton.Input
                      active
                      size="small"
                      block
                      style={{ width: "60%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : servicesUnderCategory && servicesUnderCategory.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {servicesUnderCategory.map((service: any, index: number) => (
                <motion.div
                  key={service.id || service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <ServiceHomeCard service={service} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <Package className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No Services Found
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We couldn&#39;t find any services in this category. Please try
                browsing other categories.
              </p>
              <button
                onClick={() => router.push("/allcategories")}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Browse Categories
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesUnderCategoryPage;
