"use client";
import { useUser } from "@clerk/nextjs";
import { Button, Rate, message, Input, Skeleton, Tabs, Divider } from "antd";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircleOutlined,
  ShoppingCartOutlined,
  StarFilled,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  CreditCardOutlined,
  SafetyCertificateOutlined,
  DollarCircleOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import ReviewCard from "@/components/ui/reviewCard";
import ServiceFAQ from "@/components/ui/ServiceFAQ";
import { useAllBookingsQuery } from "@/redux/api/bookingApi";
import { useAllReviewsQuery } from "@/redux/api/reviewsApi";
import WhyUs from "@/components/ui/WhyUs";
import HomeSyncBreadCrumb from "@/components/ui/BreadCrumb";
import Image from "next/image";
import safety from "../../../Assets/safety-insured.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useMediaQuery } from "react-responsive";

const { TextArea } = Input;

const SingleServicePage = ({ params }: { params: { id: string } }) => {
  const { data: allReviewsArray } = useAllReviewsQuery();
  const { data: allBookingsArray } = useAllBookingsQuery();
  const { id } = params;
  const { isLoaded, isSignedIn, user } = useUser();

  const [serviceInfo, setServiceInfo] = useState<any>();
  const [reviews, setReviews] = useState<any[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isScrolled, setIsScrolled] = useState(false);
  const [rating, setRating] = useState(3);

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const [serviceRes, reviewsRes] = await Promise.all([
          fetch(`https://sheba-backkend.vercel.app/api/v1/services/${id}`),
          fetch(`https://sheba-backkend.vercel.app/api/v1/reviews/${id}`),
        ]);

        const serviceData = await serviceRes.json();
        const reviewsData = await reviewsRes.json();

        setServiceInfo(serviceData.data);
        setReviews(reviewsData.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to load service details");
      }
    };

    fetchServiceData();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      message.warning("Please sign in to add to cart");
      return;
    }

    try {
      const response = await fetch(
        "https://sheba-backkend.vercel.app/api/v1/add-to-cart",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, servicesId: id }),
        },
      );

      if (!response.ok) throw new Error("Failed to add to cart");
      message.success("Service added to cart!");
      window.location.href = "/mycart";
    } catch (error) {
      console.error("Error adding to cart:", error);
      message.error("Failed to add to cart");
    }
  };

  const handlePostReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      message.warning("Please sign in to post a review");
      return;
    }

    const form = e.target as HTMLFormElement;
    const reviewText = (
      form.elements.namedItem("review") as HTMLTextAreaElement
    )?.value;

    if (!reviewText) {
      message.warning("Please write a review");
      return;
    }

    try {
      const response = await fetch(
        "https://sheba-backkend.vercel.app/api/v1/review",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            review: reviewText,
            rating,
            servicesId: id,
            userId: user.id,
            userImage: user.imageUrl,
          }),
        },
      );

      if (!response.ok) throw new Error("Failed to post review");

      message.success("Review posted successfully!");
      form.reset();

      // Refresh reviews
      const reviewsRes = await fetch(
        `https://sheba-backkend.vercel.app/api/v1/reviews/${id}`,
      );
      const reviewsData = await reviewsRes.json();
      setReviews(reviewsData.data || []);
    } catch (error) {
      console.error("Error posting review:", error);
      message.error("Failed to post review");
    }
  };

  if (!serviceInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
        <div className="max-w-7xl mx-auto">
          <Skeleton active paragraph={{ rows: 6 }} />
        </div>
      </div>
    );
  }

  const bookingResult =
    allBookingsArray?.data?.filter(
      (booking: any) =>
        booking.userId === user?.id && booking?.servicesId === serviceInfo?.id,
    ) || [];

  const reviewResult =
    allReviewsArray?.data?.filter(
      (review: any) =>
        review.userId === user?.id && review?.servicesId === serviceInfo?.id,
    ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 pb-20">
      {/* Sticky Header */}
      <AnimatePresence>
        {isScrolled && (
          <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 py-3 px-4"
          >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-gray-800 truncate max-w-xs">
                  {serviceInfo?.name}
                </h2>
                <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                  <StarFilled className="text-yellow-400" />
                  <span className="font-semibold">{serviceInfo?.rating}</span>
                </div>
              </div>
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                onClick={handleAddToCart}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add to Cart
              </Button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.div
        className="relative mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 w-full overflow-hidden">
          <Carousel
            showArrows={true}
            showStatus={false}
            showThumbs={false}
            infiniteLoop
            autoPlay
            interval={5000}
            className="w-full h-full"
          >
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-96 w-full">
                <Image
                  src={serviceInfo?.image || "/placeholder-service.jpg"}
                  alt={`${serviceInfo?.name} ${item}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ))}
          </Carousel>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent pt-20 pb-6 px-4">
            <div className="max-w-7xl mx-auto">
              <HomeSyncBreadCrumb
                items={[
                  { label: "Home", link: "/" },
                  { label: "Services", link: "/allservices" },
                  { label: serviceInfo?.name, link: `#` },
                ]}
                // className="text-gray-200"
              />
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mt-2">
                <div className="flex-1">
                  <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-lg mb-2">
                    {serviceInfo?.name} Services
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4 mt-2 sm:mt-3">
                    <div className="flex items-center bg-green-600/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                      <StarFilled className="mr-1 text-yellow-300" />
                      <span className="font-bold">{serviceInfo?.rating}</span>
                      <span className="ml-1">
                        ({reviews?.length || 0} reviews)
                      </span>
                    </div>
                    <div className="hidden md:flex items-center gap-4 text-sm text-gray-200">
                      <span className="flex items-center gap-1">
                        <CheckCircleOutlined className="text-green-400" /> On
                        Time
                      </span>
                      <span className="flex items-center gap-1">
                        <SafetyCertificateOutlined className="text-blue-400" />{" "}
                        Verified
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarCircleOutlined className="text-green-400" /> Best
                        Price
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                  <Button
                    type="text"
                    shape="circle"
                    icon={
                      isFavorite ? (
                        <HeartFilled className="text-red-500 text-xl" />
                      ) : (
                        <HeartOutlined className="text-white text-xl" />
                      )
                    }
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="flex items-center justify-center bg-black/30 hover:bg-black/40"
                  />
                  <Button
                    type="text"
                    shape="circle"
                    icon={<ShareAltOutlined className="text-white text-xl" />}
                    className="flex items-center justify-center bg-black/30 hover:bg-black/40"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Main Content */}
          <motion.article
            className="w-full lg:flex-1 lg:min-w-0 lg:pr-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Service Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                className="service-tabs"
                items={[
                  {
                    key: "overview",
                    label: "Overview",
                    children: (
                      <div className="p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
                          Service Overview
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                          <div>
                            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-700 flex items-center">
                              <CheckCircleOutlined className="text-green-500 mr-2" />
                              What&apos;s Included
                            </h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>Professional service charge</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>7 Days service warranty</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>Free follow-up support</span>
                              </li>
                            </ul>

                            <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-700 flex items-center">
                              <CheckCircleOutlined className="text-red-400 mr-2" />
                              What&apos;s Not Included
                            </h3>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <span className="text-red-400 mr-2">✗</span>
                                <span>Price of materials or parts</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-red-400 mr-2">✗</span>
                                <span>Transportation costs</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-red-400 mr-2">✗</span>
                                <span>Manufacturer&apos;s warranty</span>
                              </li>
                            </ul>
                          </div>

                          <div className="bg-blue-50 p-4 sm:p-6 rounded-xl">
                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-blue-800 flex items-center">
                              <SafetyCertificateOutlined className="mr-2" />
                              Our Safety Measures
                            </h3>
                            <ul className="space-y-2 sm:space-y-3">
                              {[
                                "Health-checked professionals",
                                "Use of PPE (masks, gloves, sanitizers)",
                                "Equipment disinfection",
                                "Contactless service options",
                                "Social distancing maintained",
                              ].map((item, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-blue-500 mr-2">•</span>
                                  <span className="text-gray-700">{item}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-6 p-4 bg-white rounded-lg border border-blue-100">
                              <div className="flex items-center gap-3">
                                <Image
                                  src={safety}
                                  alt="Safety Certified"
                                  className="w-16 h-auto"
                                  width={64}
                                  height={64}
                                />
                                <p className="text-sm text-gray-600">
                                  We follow strict safety protocols to ensure
                                  your peace of mind during every service.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Divider className="my-8" />

                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">
                            How It Works
                          </h3>
                          <div className="grid md:grid-cols-3 gap-3 sm:gap-6">
                            {[
                              {
                                icon: (
                                  <CalendarOutlined className="text-3xl text-blue-600" />
                                ),
                                title: "1. Book an Appointment",
                                desc: "Select your preferred date and time slot for the service.",
                              },
                              {
                                icon: (
                                  <ClockCircleOutlined className="text-3xl text-green-600" />
                                ),
                                title: "2. Expert Service",
                                desc: "Our certified professional will arrive at your location on time.",
                              },
                              {
                                icon: (
                                  <CheckCircleOutlined className="text-3xl text-purple-600" />
                                ),
                                title: "3. Job Completion",
                                desc: "We ensure 100% satisfaction with our quality service.",
                              },
                            ].map((step, index) => (
                              <motion.div
                                key={index}
                                className="bg-white p-3 sm:p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                                whileHover={{ y: isMobile ? 0 : -5 }}
                              >
                                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2 sm:mb-4 text-xl sm:text-3xl">
                                  {step.icon}
                                </div>
                                <h4 className="font-semibold text-sm sm:text-lg mb-1 sm:mb-2 text-gray-800">
                                  {step.title}
                                </h4>
                                <p className="text-gray-600 text-xs sm:text-sm">
                                  {step.desc}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: "details",
                    label: "Details",
                    children: (
                      <div className="p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
                          Service Details
                        </h2>
                        <div className="prose max-w-none">
                          <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                            Our service is designed to provide comprehensive
                            solutions with the highest standards of quality and
                            reliability. Our certified professionals are trained
                            to handle all aspects of the service with precision
                            and care.
                          </p>

                          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">
                            Service Inclusions
                          </h3>
                          <ul className="space-y-2 mb-6">
                            {[
                              "Detailed assessment and consultation",
                              "Professional service execution",
                              "Quality check and testing",
                              "Cleanup after service completion",
                              "Service warranty coverage",
                            ].map((item, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>

                          <h3 className="text-xl font-semibold mb-4 text-gray-800">
                            What to Expect
                          </h3>
                          <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-lg">
                              <h4 className="font-medium text-blue-800 mb-2">
                                Before Service
                              </h4>
                              <p className="text-gray-700">
                                Our professional will contact you to confirm the
                                appointment and discuss any specific
                                requirements.
                              </p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg">
                              <h4 className="font-medium text-green-800 mb-2">
                                During Service
                              </h4>
                              <p className="text-gray-700">
                                The technician will arrive on time, perform the
                                service with attention to detail, and keep you
                                informed throughout the process.
                              </p>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-lg">
                              <h4 className="font-medium text-purple-800 mb-2">
                                After Service
                              </h4>
                              <p className="text-gray-700">
                                You&apos;ll receive a detailed service report,
                                and our team will follow up to ensure your
                                complete satisfaction.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: "faq",
                    label: "FAQ",
                    children: (
                      <div className="p-4 sm:p-6">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
                          Frequently Asked Questions
                        </h2>
                        <ServiceFAQ />
                      </div>
                    ),
                  },
                  {
                    key: "reviews",
                    label: `Reviews (${reviews?.length || 0})`,
                    children: (
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6">
                          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                            Customer Reviews
                          </h2>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <div className="flex items-center">
                              <StarFilled className="text-yellow-400 text-lg sm:text-2xl mr-1" />
                              <span className="text-lg sm:text-xl font-bold">
                                {serviceInfo?.rating}
                              </span>
                              <span className="text-sm sm:text-base text-gray-500 ml-1">
                                ({reviews?.length || 0} reviews)
                              </span>
                            </div>
                            <Button
                              type="primary"
                              size={isMobile ? "small" : "middle"}
                              onClick={() =>
                                document
                                  .getElementById("write-review")
                                  ?.scrollIntoView({ behavior: "smooth" })
                              }
                            >
                              Write a Review
                            </Button>
                          </div>
                        </div>

                        {reviews?.length > 0 ? (
                          <div className="space-y-6">
                            {reviews.map((review: any, index: number) => (
                              <motion.div
                                key={review.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <ReviewCard review={review} />
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-12 bg-gray-50 rounded-lg">
                            <p className="text-gray-500">
                              No reviews yet. Be the first to review this
                              service!
                            </p>
                          </div>
                        )}

                        {/* Write Review Section */}
                        <div
                          id="write-review"
                          className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200"
                        >
                          <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                            Write a Review
                          </h3>
                          <form
                            onSubmit={handlePostReview}
                            className="space-y-4"
                          >
                            <div>
                              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                Your Rating
                              </label>
                              <Rate
                                tooltips={desc}
                                onChange={setRating}
                                value={rating}
                                className="text-xl sm:text-2xl"
                              />
                              {rating ? (
                                <span className="ml-2 text-gray-600">
                                  {desc[rating - 1]}
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                            <div>
                              <label
                                htmlFor="review"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Your Review
                              </label>
                              <TextArea
                                id="review"
                                name="review"
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Share your experience with this service..."
                                required
                              />
                            </div>
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Submit Review
                            </Button>
                          </form>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            className="w-full lg:w-96 flex-shrink-0 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              position: isMobile ? "static" : "sticky",
              top: isMobile ? "auto" : "6rem",
              alignSelf: "flex-start",
            }}
          >
            {/* Booking Card */}
            <div
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              style={{
                position: isMobile ? "static" : "sticky",
                top: isMobile ? "auto" : "6rem",
              }}
            >
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                  Book This Service
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-sm sm:text-base text-gray-600">
                      Starting from
                    </span>
                    <div>
                      <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                        ৳{serviceInfo?.price}
                      </span>
                      <span className="text-gray-500 ml-1">+ materials</span>
                    </div>
                  </div>

                  <Button
                    type="primary"
                    block
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                    className="h-10 sm:h-14 text-sm sm:text-lg font-medium bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0"
                  >
                    Add to Cart
                  </Button>

                  <div className="text-center text-sm text-gray-500">
                    No payment required at booking
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-medium text-gray-700 mb-3">
                      Service Highlights
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "✓ Professional & Certified Experts",
                        "✓ 100% Satisfaction Guaranteed",
                        "✓ Transparent Pricing",
                        "✓ Same Day Service Available",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <span className="text-green-500 mr-2">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-medium text-gray-700 mb-3">
                      Need Help?
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Our customer support team is available 24/7 to assist you
                      with any questions.
                    </p>
                    <Button
                      type="link"
                      className="p-0 text-blue-600 hover:text-blue-800"
                    >
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-16">
        <WhyUs />
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40"
          style={{ zIndex: 1000 }}
        >
          <div className="flex justify-between items-center gap-2 p-2 sm:p-3">
            <div>
              <div className="text-xs sm:text-sm text-gray-500">
                Starting from
              </div>
              <div className="font-bold text-base sm:text-lg">
                ৳{serviceInfo?.price}
              </div>
            </div>
            <Button
              type="primary"
              size="middle"
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
              className="h-10 sm:h-12 px-3 sm:px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 text-sm sm:text-base"
            >
              Book Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleServicePage;

// Add global styles for the tabs
const globalStyles = `
  .service-tabs .ant-tabs-nav {
    margin: 0 !important;
    padding: 0 1rem;
  }
  
  .service-tabs .ant-tabs-tab {
    padding: 16px 20px;
    margin-right: 8px;
    font-size: 15px;
    font-weight: 500;
    color: #6b7280;
    border: none;
    border-radius: 8px 8px 0 0;
    transition: all 0.3s ease;
  }
  
  .service-tabs .ant-tabs-tab-active {
    color: #2563eb;
    background: #eff6ff;
  }
  
  .service-tabs .ant-tabs-ink-bar {
    background: #2563eb;
    height: 3px !important;
  }
  
  .service-tabs .ant-tabs-tab:hover {
    color: #2563eb;
  }
  
  .service-tabs .ant-tabs-content {
    padding: 0 1rem 1rem;
  }
  
  @media (max-width: 768px) {
    .service-tabs .ant-tabs-nav {
      padding: 0 0.5rem;
    }
    
    .service-tabs .ant-tabs-tab {
      padding: 12px 12px;
      font-size: 14px;
      margin-right: 4px;
    }
  }
`;

// Add the styles to the document head
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = globalStyles;
  document.head.appendChild(style);
}
