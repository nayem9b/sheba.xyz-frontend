import React from "react";
import Image from "next/image";

const UpcomingServiceCard = ({ service }: any) => {
  return (
    <div className="opacity-60">
      <Image
        alt="Home"
        src={service?.image}
        width={208}
        height={208}
        className="w-52 h-52 mx-auto justify-center place-content-start place-items-center rounded-xl"
        unoptimized={true}
      />

      <div className="mt-2  text-black font-semibold">
        <p className="font-medium mx-auto mt-6 ">{service?.name}</p>
      </div>
    </div>
  );
};

export default UpcomingServiceCard;
