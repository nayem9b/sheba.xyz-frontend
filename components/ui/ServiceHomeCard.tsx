import React from "react";
import Link from "next/link";
import Image from "next/image";

const ServiceHomeCard = ({ service }: any) => {
  return (
    <Link href={`/services/${service?.id}`} className="group block h-full">
      <div className="h-full rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 bg-white hover:scale-105 transform">
        {/* Image Container */}
        <div
          className="relative w-full overflow-hidden bg-gray-100"
          style={{ aspectRatio: "1" }}
        >
          <Image
            alt={service?.name || ''}
            src={service?.image}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            unoptimized={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content Container */}
        <div className="p-4 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
            {service?.name}
          </h3>
          {/* <div className="mt-3 text-sm text-gray-500 flex-grow">
            Click to explore
          </div> */}
          <div className="mt-4 inline-flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform duration-200">
            View details →
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceHomeCard;
