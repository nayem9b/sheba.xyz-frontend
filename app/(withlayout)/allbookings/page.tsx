"use client";

import {
  useAllBookingsQuery,
  useDeleteBookingMutation,
} from "@/redux/api/bookingApi";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import ShebaTable from "@/components/ui/ShebaTable";
import { useAllUsersQuery } from "@/redux/api/userApi";
import { Button, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const AllBookingsPage = () => {
  const [deleteBooking] = useDeleteBookingMutation();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [allBookings, setAllBookings] = useState();
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: allBookingsData, isLoading } = useAllBookingsQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });
  console.log(allBookingsData?.data);
  const meta = allBookingsData?.meta;
  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      const res = await deleteBooking(id);
      if (res) {
        message.success("Booking Deleted successfully");
      }
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Location",
      dataIndex: "street",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Link href={`/allbookings/edit/${data?.id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => deleteHandler(data?.id)}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/bookings`)
      .then((res) => res.json())
      .then((data) => {
        setAllBookings(data?.data);
        console.log(data.data);
      });
  }, []);
  return (
    <div>
      <h1 className="text-center text-blue-600 mb-10">Manage Bookings</h1>
      <ShebaTable
        loading={isLoading}
        columns={columns}
        dataSource={allBookings}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      ></ShebaTable>
    </div>
  );
};

export default AllBookingsPage;
