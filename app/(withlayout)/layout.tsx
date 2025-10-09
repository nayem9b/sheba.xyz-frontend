"use client";
import Contents from "@/components/ui/Contents";
import SideBar from "@/components/ui/Sidebar";

import { Layout, Row, Space, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // return (
  //   <Row
  //     justify="center"
  //     align="middle"
  //     style={{
  //       height: "100vh",
  //     }}
  //   >
  //     <Space>
  //       <Spin tip="Loading" size="large"></Spin>
  //     </Space>
  //   </Row>
  // );

  return (
    <Layout hasSider>
      <SideBar />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
