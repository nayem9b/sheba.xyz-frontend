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
import { useEffect, useState, useRef } from "react";
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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    container?.addEventListener("scroll", checkScroll);
    return () => container?.removeEventListener("scroll", checkScroll);
  }, []);

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

      {/* Categories Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
              Browse Categories
            </h2>
            <p className="text-gray-600 text-lg">
              Explore our wide range of professional services
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4 rounded-full"></div>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative group">
            {/* Left Arrow */}
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 ${
                canScrollLeft
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto scroll-smooth"
              onScroll={checkScroll}
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div className="flex gap-6 px-16">
                {categoryData?.data?.map((category: any, index: number) => (
                  <motion.div
                    key={category._id || category.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/5"
                  >
                    <CategoryHomeCard category={category} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 ${
                canScrollRight
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Available Services Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
              Available Services
            </h2>
            <p className="text-gray-600 text-lg">
              Find the perfect service for your needs
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-4 rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {availableServices?.data?.map((service: any, index: number) => (
              <motion.div
                key={service._id || service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ServiceHomeCard service={service} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-8">
        <Image
          onClick={() => setModal2Open(true)}
          src={emi}
          alt="emi"
          className="w-3/5 mx-auto justify-center items-center flex h-28 rounded-2xl cursor-pointer hover:shadow-xl transition-all duration-300"
        ></Image>
      </div>

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
