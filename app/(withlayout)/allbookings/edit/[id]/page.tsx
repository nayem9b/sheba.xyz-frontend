"use client";

import { Button, Image, Select, message } from "antd";
import { setToLocalStorage } from "@/utils/local-storage";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { DatePicker, TimePicker } from "antd";
import type { DatePickerProps } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditBookingPage = ({ params }: { params: any }) => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<any>();
  const [status, setStatus] = useState<any>();
  const { id } = params;

  useEffect(() => {
    fetch(`https://sheba-xyz-backend-0wsp.onrender.com/api/v1/bookings/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBookingData(data);
      });
  }, [id]);

  const onChange = (time: Dayjs | unknown, timeString: string) => {
    setToLocalStorage("time", time as string);
  };

  const onDateChange: DatePickerProps["onChange"] = (
    date: any,
    dateString: any
  ) => {
    setToLocalStorage("date", dateString as string);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    message.loading("Updating booking...");
    const sendUpdateBookingData = {
      status: status || bookingData?.data?.status,
      time: localStorage.getItem("time") || bookingData?.data?.time,
      date: localStorage.getItem("date") || bookingData?.data?.date,
    };

    try {
      await fetch(
        `https://sheba-xyz-backend-0wsp.onrender.com/api/v1/bookings/${id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(sendUpdateBookingData),
        }
      );
      message.success("Booking updated successfully!");
      router.push("/allbookings");
    } catch (err: any) {
      message.error("Failed to update booking. Please try again.");
    }
  };

  const handleChange = (value: string) => {
    setStatus(value);
  };

  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <div className="flex flex-col items-center mb-6">
          <Image
            width={200}
            src={
              bookingData?.data?.service?.image || "/placeholder-service.jpg"
            }
            alt="Service Image"
            className="rounded-lg shadow-md"
          />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            {bookingData?.data?.service?.name}
          </h1>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-6">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">
            Edit Booking Details
          </h2>
          <p className="text-gray-700">User Name: {bookingData?.data?.name}</p>
          <p className="text-gray-700">Email: {bookingData?.data?.email}</p>
          <p className="text-gray-700">
            Contact No: {bookingData?.data?.contactNo}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <label className="w-24 text-gray-700 font-medium">Date</label>
              <DatePicker
                onChange={onDateChange}
                defaultValue={dayjs(bookingData?.data?.date)}
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-gray-700 font-medium">Time</label>
              <TimePicker
                use12Hours
                format="h:mm A"
                onChange={onChange}
                defaultValue={dayjs(bookingData?.data?.time, "HH:mm")}
                className="w-full"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="w-24 text-gray-700 font-medium">Status</label>
              <Select
                defaultValue={bookingData?.data?.status || "Select"}
                onChange={handleChange}
                className="w-full"
                options={[
                  { value: "pending", label: "Pending" },
                  { value: "accepted", label: "Accepted" },
                  { value: "rejected", label: "Rejected" },
                  { value: "delivered", label: "Delivered" },
                ]}
              />
            </div>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full mx-auto justify-center align-middle bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md my-4 pb-4"
          >
            Update Booking
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditBookingPage;
