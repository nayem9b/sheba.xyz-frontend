/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useUser } from "@clerk/nextjs";
import {
  useAvailableServicesQuery,
  useServicesQuery,
  useUpcomingServicesQuery,
} from "@/redux/api/servicesApi";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import Homepage from "./Homepage";
import CategoryHomeCard from "@/components/ui/CategoryHomeCard";
import ServiceHomeCard from "@/components/ui/ServiceHomeCard";
import { useEffect, useState } from "react";
import { useAddUserMutation } from "@/redux/api/userApi";
import CompanyPeople from "@/components/ui/CompanyPeople";
import Testimonial from "@/components/ui/Testimonial";
import News from "@/components/ui/News";
import Partners from "@/components/ui/Partners";
import FeedbackForm from "@/components/ui/FeedbackForm";
import CallToAction from "@/components/ui/CallToAction";
import FAQ from "@/components/ui/FAQ";
import UpcomingServiceCard from "@/components/ui/UpcomingServiceCard";
import emi from "../Assets/EMI.png";
import Image from "next/image";
import { Modal } from "antd";
import emiDetails from "../Assets/emi details.png";
import TestimonialSlide from "@/components/ui/TestimonialSlide";
import HappyFaces from "@/components/ui/HappyFaces";
import { Carousel } from "antd";

import serviceRequested from "../Assets/service-request.png";
import girl from "../Assets/girl.jpg";
import royhana from "../Assets/royhana.jpg";
import sonia from "../Assets/sonia.jpg";
import afia from "../Assets/afia.jpg";
import CustomerReviewsCarousal from "@/components/ui/CustomerReviewsCarousal";
import Helpline from "@/components/ui/Helpline";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [modal2Open, setModal2Open] = useState(false);
  const { data: categoryData } = useCategoriesQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });
  const { data: allservices } = useServicesQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });
  const { data: upcomingServices } = useUpcomingServicesQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });
  const { data: availableServices } = useAvailableServicesQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });
  console.log(upcomingServices, availableServices);
  const [userInfo, setUserInfo] = useState({});
  const [addUser] = useAddUserMutation();
  const services = allservices?.data?.data;
  console.log(categoryData, services);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/users/${user?.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setUserInfo(data.data);
      });
  }, [user?.id]);
  console.log(userInfo);
  const sendToDbUserInfo = {
    userId: user?.id,
    name: user?.fullName || "New User",
    email: user?.primaryEmailAddress?.emailAddress,
    profileImg: "abc",
    password: "hashedpassword",
    contactNo: "123456",
  };

  if (isLoaded && isSignedIn) {
    if (!userInfo) {
      fetch(`http://localhost:8000/api/v1/auth/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(sendToDbUserInfo),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  }
  return (
    <>
      <Homepage />
      <Modal
        centered
        open={modal2Open}
        width={1000}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <Image src={emiDetails} alt=""></Image>
      </Modal>

      <h1 className="text-center my-20">All Categories</h1>
      <div className="grid lg:grid-cols-8 sm:grid-cols-4 md:grid-cols-6 gap-10 lg:mx-60">
        {categoryData?.data?.map((category: any) => (
          <CategoryHomeCard key={category.name} category={category} />
        ))}
      </div>
      <h1 className="text-center my-20">Available Services</h1>
      <div className="grid grid-cols-4 mx-60 gap-10">
        {availableServices?.data?.map((service: any) => (
          <ServiceHomeCard key={service.name} service={service} />
        ))}
      </div>
      {/* <h1 className="text-center text-blue-600 my-20">Upcoming Services</h1> */}
      {/* <div className="grid grid-cols-4 mx-60 gap-10">
        {upcomingServices?.data?.map((service: any) => (
          <UpcomingServiceCard key={service.name} service={service} />
        ))}
      </div> */}
      <Image
        onClick={() => setModal2Open(true)}
        src={emi}
        alt="emi"
        className="w-3/5 mx-auto justify-center items-center flex h-28 rounded-xl cursor-pointer mt-16"
      ></Image>
      <Partners />
      <CompanyPeople />
      <Testimonial />
      <FAQ />
      <News />

      <CustomerReviewsCarousal />
      {/* <TestimonialSlide /> */}
      <FeedbackForm />
      <CallToAction />
      <Helpline />
    </>
  );
}
