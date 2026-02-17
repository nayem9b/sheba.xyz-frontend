import Link from "next/link";
import React from "react";
import Image from "next/image";

const CategoryHomeCard = ({ category }: any) => {
  return (
    <div>
      <Link
        style={{ textDecoration: "none" }}
        href={`/category/${category?.id}`}
        className="rounded-lg text-black shadow-sm shadow-indigo-200 "
      >
        <Image
          alt="Home"
          src={category?.image}
          className="md:ml-4 lg:ml-7 block h-20 w-20 rounded-md object-cover"
          width={60}
          height={60}
        />

        <p className="font-medium ml-8 ">{category?.title}</p>
      </Link>
    </div>
  );
};

export default CategoryHomeCard;
