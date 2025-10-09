"use client";

import { Button, Col, Form, Image, Row, Select, message } from "antd";

import { setToLocalStorage } from "@/utils/local-storage";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { DatePicker, Space, TimePicker } from "antd";
import type { DatePickerProps } from "antd";
import {
  useGetSingleBookingMutation,
  useSingleBookingQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type IDProps = {
  params: any;
};

const EditBookingPage = ({ params }: IDProps) => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<any>();
  const [status, setStatus] = useState<any>();
  const [date, setDate] = useState<string>();
  const [time, setTime] = useState<any>();
  const [updateBooking] = useUpdateBookingMutation();
  const { id } = params;

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/bookings/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBookingData(data);
        console.log(data);
      });
  }, [id]);

  // const {data} = bookingData

  const onChange = (time: Dayjs | unknown, timeString: string) => {
    console.log(time, timeString);
    setToLocalStorage("time", time as string);
  };

  const onDateChange: DatePickerProps["onChange"] = (
    date: any,
    dateString: any
  ) => {
    setToLocalStorage("date", dateString as string);
    console.log(dateString, date);
  };
  const sendUpdateBookingData = {
    status: status || bookingData?.data?.status,
    time: localStorage.getItem("time") || bookingData?.data?.time,
    date: localStorage.getItem("date") || bookingData?.data?.date,
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    message.loading("Updating.....");
    try {
      console.log(sendUpdateBookingData);
      fetch(`http://localhost:3000/api/v1/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(sendUpdateBookingData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          message.success("Updated user booking");
          router.push("/allbookings");
        });

      message.success("user booking updated successfully");
    } catch (err: any) {
      //   console.error(err.message);
      message.error(err.message);
    }
  };

  const handleChange = (value: string) => {
    setStatus(value);
    console.log(`${value}`);
  };

  return (
    <div className="flex justify-center">
      <div className="">
        <div className="">
          <Image width={200} src={bookingData?.data?.service?.image} />
          <h1>Service Name : {bookingData?.data?.service?.name}</h1>
        </div>
        <div className="">
          <h1 className=" text-blue-500">Edit booking details of </h1>
          <p className="text-lg">User Name: {bookingData?.data?.name}</p>
          <p className="text-lg">Email : {bookingData?.data?.email}</p>
          <p className="text-lg">Contact No : {bookingData?.data?.contactNo}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex ">
            <div className="grid grid-rows-3  ">
              <div className="flex justify-evenly">
                <label className="mr-5">Date</label>
                <DatePicker
                  onChange={onDateChange}
                  defaultValue={bookingData?.data?.date}
                />
              </div>
              <div className="flex justify-evenly mt-10">
                <label className="mr-5 ">Time</label>
                <TimePicker
                  use12Hours
                  format="h:mm:ss A"
                  onChange={onChange}
                  defaultValue={dayjs("12:25:15", "HH:mm:ss")}
                />
              </div>
              <div className="flex justify-evenly mt-10">
                <label className="mr-6 ">Status</label>
                <Select
                  defaultValue="Select"
                  style={{ width: 120 }}
                  onChange={handleChange}
                  options={[
                    { value: "pending", label: "Pending" },
                    { value: "accepted", label: "Accept" },
                    { value: "rejected", label: "Reject" },
                    { value: "delivered", label: "Delivered" },
                  ]}
                />
              </div>
              <Button
                type="primary"
                htmlType="submit"
                className="w-16  mt-10 flex "
              >
                Update
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookingPage;
