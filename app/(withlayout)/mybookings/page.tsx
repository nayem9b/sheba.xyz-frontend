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
import Image from "next/image";

const MyBookings = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [value, setValue] = useState(3);
  const [reviews, setReviews] = useState<any>();
  const { data: myBookings } = useBookingsByUserIdQuery(user?.id);
  const [deleteBooking] = useDeleteBookingMutation();
  const [serviceId, setServiceId] = useState<any>();

  const handlePostReview = async (e: any) => {
    message.loading("Sending");
    e.preventDefault();
    const form = e.target;
    const review = form?.review?.value;
    const SendReviewInfo = {
      review: review,
      rating: value,
      servicesId: serviceId,
      userImage: user?.imageUrl,
      userId: user?.id,
    };
    fetch(`http://localhost:8000/api/v1/review`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(SendReviewInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        message.success("Your review is posted");
        router.push(`/services/${serviceId}`);
      });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-center mt-20"> My Bookings</h1>
      {myBookings?.data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myBookings?.data.map((booking: any) => (
            <article
              key={booking.id}
              className="rounded-xl shadow-lg border border-gray-200 bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <Image
                  alt="Service"
                  src={booking?.service?.image}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                  {booking?.status.toUpperCase()}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 truncate">
                  {booking.service.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Price:</strong> {booking.service.price} Taka
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Rating:</strong> {booking?.service?.rating} 
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {booking?.service?.location}
                </p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {booking.service.details}
                </p>
              </div>
              {booking?.status === "delivered" && (
                <div className="p-4 border-t border-gray-200">
                  <h4 className="text-center text-gray-700 mb-4">
                    We value your feedback!
                  </h4>
                  <form onSubmit={handlePostReview} className="space-y-4">
                    <Rate
                      tooltips={desc}
                      onChange={setValue}
                      value={value}
                      className="block mx-auto text-2xl"
                    />
                    <TextArea
                      rows={3}
                      name="review"
                      placeholder="Write your review here..."
                      className="w-full border-gray-300 rounded"
                    />
                    <Button
                      htmlType="submit"
                      type="primary"
                      className="w-full"
                      onClick={() => setServiceId(booking?.service?.id)}
                    >
                      Submit Review
                    </Button>
                  </form>
                </div>
              )}
              <div className="flex justify-between items-center p-4 border-t border-gray-200">
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
          ))}
        </div>
      ) : (
        <div className="text-center mt-36">
          <h1 className="text-2xl font-semibold text-gray-800">
            You haven&apos;t booked any service
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Book one now and enjoy our services!
          </p>
          <Link href="/allservices">
            <Button
              type="primary"
              className="mt-4 flex items-center justify-center mx-auto"
            >
              Explore Services <ArrowRightOutlined className="ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
