"use client";

import {
  useBookingsByUserIdQuery,
  useDeleteBookingMutation,
} from "@/redux/api/bookingApi";
import { ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons";
import { useUser } from "@clerk/nextjs";
import { Button, Rate, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const MyBookings = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [value, setValue] = useState(3);
  const [reviews, setReviews] = useState<any>();
  const { data: myBookings } = useBookingsByUserIdQuery(user?.id);
  console.log(myBookings);
  const [deleteBooking] = useDeleteBookingMutation();
  const [serviceId, setServiceId] = useState<any>();

  const handlePostReview = async (e: any) => {
    message.loading("Sending");
    e.preventDefault();
    const form = e.target;
    console.log(form);
    const review = form?.review?.value;
    const SendReviewInfo = {
      review: review,
      rating: value,
      servicesId: serviceId,
      userImage: user?.imageUrl,
      userId: user?.id,
    };
    console.log(SendReviewInfo);
    fetch(`http://localhost:3000/api/v1/review`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(SendReviewInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        message.success("Your review is posted");
        router.push(`/services/${serviceId}`);
      });
  };

  return (
    <div>
      {}

      {myBookings?.data.length > 0 ? (
        myBookings?.data.map((booking: any) => (
          <>
            <article className="rounded-xl border-2 border-gray-100 bg-white">
              <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
                <a href="#" className="block shrink-0">
                  <img
                    alt="Speaker"
                    src={booking?.service?.image}
                    className="w-52 h-52"
                  />
                </a>

                <div>
                  <h3 className="font-medium sm:text-lg">
                    <a href="#" className="hover:underline">
                      {booking.service.name}
                    </a>
                  </h3>
                  <p className="line-clamp-2 text-sm text-gray-700">
                    Price : {booking.service.price} Taka
                  </p>
                  <p className="line-clamp-2 text-sm text-gray-700">
                    Rating : {booking?.service?.rating} ⭐
                  </p>
                  <p className="line-clamp-2 text-sm text-gray-700">
                    Location : {booking?.service?.location} ⭐
                  </p>

                  <p className="line-clamp-2 text-sm text-gray-700">
                    Details: {booking.service.details}
                  </p>
                </div>
              </div>
              {booking?.status === "delivered" && (
                <div>
                  <h1 className="text-center mb-10">
                    We will be happy to have your review
                  </h1>
                  <form className="w-3/6 mx-auto" onSubmit={handlePostReview}>
                    <span>
                      <Rate
                        tooltips={desc}
                        onChange={setValue}
                        value={value}
                        className="mx-auto justify-center place-items-center text-4xl"
                      />
                      {value ? (
                        <span className="ant-rate-text">{desc[value - 1]}</span>
                      ) : (
                        ""
                      )}
                    </span>
                    <TextArea rows={4} name="review" />
                    <Button
                      htmlType="submit"
                      type="primary"
                      className="flex justify-end mt-5"
                      onClick={() => setServiceId(booking?.service?.id)}
                    >
                      Submit
                    </Button>
                  </form>
                </div>
              )}
              <div className="flex gap-10 justify-end">
                <div className="flex justify-end ">
                  <strong className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-green-600 px-3 py-1.5 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>

                    <span className="text-[10px] font-medium sm:text-xs">
                      Status :{" "}
                      <span className="uppercase">{booking?.status}</span>
                    </span>
                  </strong>
                </div>
                {booking?.status !== "delivered" && (
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      deleteBooking(booking?.id);
                      message.success("Booking Deleted");
                    }}
                  >
                    Delete Booking <DeleteOutlined />
                  </Button>
                )}
              </div>
            </article>
          </>
        ))
      ) : (
        <div className="text-center mt-36">
          <h1 >You haven&apos;t booked any service</h1>
          <p className="text-xl">Book one <Link href={'/allservices'}>
          <ArrowRightOutlined className="text-blue-500"/>
          </Link></p>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
