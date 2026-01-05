"use client";

import ShebaTable from "@/components/ui/ShebaTable";
import { useAllUsersQuery, useDeleteUserMutation } from "@/redux/api/userApi";
import { Button, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useOrganizationList, useSession, useUser } from "@clerk/nextjs";
import dayjs from "dayjs";
import { checkUserRole } from "@/utils/userUtils";

const AllUsers = () => {
  const { session } = useSession();
  const userRole = checkUserRole(session);
  const { isSignedIn, user } = useUser();
  const [deleteUser] = useDeleteUserMutation();
  const router = useRouter();
  const { organizationList, isLoaded, setActive } = useOrganizationList();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dbUserRole, setDbUserRole] = useState<string>("");
  const [fetchFromDB, setFetchFromDB] = useState<string>("");
  const [deleteUserId, setDeleteUserId] = useState<string>("");

  const { data: allUsers, isLoading } = useAllUsersQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });

  const meta = allUsers?.meta;

  // useEffect(() => {
  //   if (isLoaded) {
  //     // Find the admin organization from the loaded organization list

  //     const adminOrganization = organizationList.find(
  //       (org) => org.membership.role === "admin"
  //     );

  //     // If the user is not an admin, redirect to the homepage
  //     if (!adminOrganization || adminOrganization.membership.role !== "admin") {
  //       router.push("/");
  //       // Replace '/' with the homepage URL
  //     } else {
  //       // If the user is an admin, no need to wait for the organization list; render the admin page directly
  //     }
  //   }
  // }, [isLoaded, organizationList, router]);

  // useEffect(() => {
  //   fetch(`https://sheba-xyz-backend-0wsp.onrender.com/api/v1/users/db/${fetchFromDB}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data?.data);
  //       setDeleteUserId(data?.data?.userId);
  //     });
  // }, [fetchFromDB]);

  console.log(deleteUserId);
  const deleteHandler = async (id: string) => {
    // setFetchFromDB(id);
    message.loading("Deleting.....");
    fetch(`https://sheba-xyz-backend-0wsp.onrender.com/api/v1/users/db/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data?.data);
        setDeleteUserId(data?.data?.userId);
      });
    try {
      fetch(
        `https://sheba-xyz-backend-0wsp.onrender.com/api/v1/users/${deleteUserId}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          window.location.reload();
          message.success("User Deleted Successfully");
        });
    } catch (err: any) {
      //   console.error(err.message);
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
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            {userRole === "admin" && (
              <div>
                <Link href={`/allusers/edit/${data?.id}`}>
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
              </div>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div>
      <h1 className="text-center text-blue-500">Manage Users</h1>
      <div className="mx-5">
        <ShebaTable
          loading={isLoading}
          columns={columns}
          dataSource={allUsers?.data}
          pageSize={size}
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          showPagination={true}
        ></ShebaTable>
      </div>
    </div>
  );
};

export default AllUsers;
