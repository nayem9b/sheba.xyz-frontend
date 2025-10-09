"use client";

import { useSingleServicesQuery } from "@/redux/api/servicesApi";
import React, { useEffect, useState } from "react";
import ServiceHomeCard from "@/components/ui/ServiceHomeCard";

const ServicesUnderCategoryPage = ({ params }: { params: any }) => {
  const [servicesUnderCategory, setServicesUnderCategory] = useState<any>();
  const [category, setCategory] = useState();
  const { id } = params;
  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/services/category/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setServicesUnderCategory(data?.data);
        setCategory(data?.data[0]?.category?.title);
      });
  }, [id]);
  console.log(servicesUnderCategory);
  return (
    <div>
      <h1 className="text-center">Services under {category}</h1>
      <div className="mx-auto">
        <div className="grid grid-cols-4 mx-60 gap-10 ">
          {servicesUnderCategory?.map((service: any) => (
            <ServiceHomeCard key={service.name} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesUnderCategoryPage;
