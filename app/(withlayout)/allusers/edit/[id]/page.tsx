"use client";

import { Button, Select, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type IDProps = {
  params: any;
};

const EditUserPage = ({ params }: IDProps) => {
  const { id } = params;
  const [userData, setuserData] = useState<any>();
  const [role, setRole] = useState<any>();
  const router = useRouter();
  const handleChange = (value: string) => {
    console.log(`${value}`);
    setRole(value);
  };

  useEffect(() => {
    fetch(`https://sheba-backkend.vercel.app/api/v1/users/db/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setuserData(data?.data);
      });
  }, [id]);
  console.log(userData);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const updatedInfo = {
      role: role,
    };
    fetch(
      `https://sheba-backkend.vercel.app/api/v1/users/${userData?.userId}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedInfo),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        message.success("User role changed");
        router.push("/allusers");
      });
  };

  return (
    <div>
      <div className="text-center">
        <p>User Name : {userData?.name}</p>
        <p>Email : {userData?.email} </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-evenly mt-10">
          <label className="mr-6 ">Grant User Role</label>
          <Select
            defaultValue="Select Role"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "customer", label: "customer" },
              { value: "admin", label: "Admin" },
            ]}
          />
          <Button htmlType="submit" type="primary">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage;
