"use client";

import { useSingleServicesQuery } from "@/redux/api/servicesApi";
import React, { useEffect, useState } from "react";
import ServiceHomeCard from "@/components/ui/ServiceHomeCard";

const ServicesUnderCategoryPage = ({ params }: { params: any }) => {
  const [servicesUnderCategory, setServicesUnderCategory] = useState<any>();
  const [category, setCategory] = useState();
  const { id } = params;
  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/services/category/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setServicesUnderCategory(data?.data);
        setCategory(data?.data[0]?.category?.title);
      });
  }, [id]);
  console.log(servicesUnderCategory);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Services under <span className="text-blue-600">{category}</span>
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {servicesUnderCategory?.map((service: any) => (
            <ServiceHomeCard key={service.id || service.name} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesUnderCategoryPage;
