"use client";

import AllCategoryCard from "@/components/ui/AllCategoryCard";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import React from "react";
import { motion } from "framer-motion";
import { Skeleton } from "antd";
import { Layers } from "lucide-react";

const AllCategoryPage = () => {
  const { data: allCategories, isLoading } = useCategoriesQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });

  const categories = allCategories?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton.Input active size="large" block style={{ height: "50px" }} />
                <Skeleton.Input active size="small" block style={{ height: "20px", width: "300px", margin: "0 auto" }} />
              </div>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/50 rounded-full mb-6 backdrop-blur-sm mt-16">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-700">{categories.length} Categories</span>
                </div>
                <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
                  Explore All Categories
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Browse our comprehensive range of professional services organized by category
                </p>
                <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-6 rounded-full"></div>
              </>
            )}
          </motion.div>

          {/* Categories Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden">
                  <Skeleton.Image active style={{ width: "100%", height: "220px" }} />
                  <div className="p-4 space-y-3 bg-white">
                    <Skeleton.Input active size="small" block />
                    <Skeleton.Input active size="small" block style={{ width: "60%" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : categories && categories.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {categories.map((category: any, index: number) => (
                <motion.div
                  key={category._id || category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                >
                  <AllCategoryCard category={category} />
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
                <Layers className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Categories Found</h3>
              <p className="text-gray-600">
                We couldn't find any categories. Please try again later.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllCategoryPage;
