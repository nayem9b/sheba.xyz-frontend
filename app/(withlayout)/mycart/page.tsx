"use client";

import {
  useCartItemsByUserIdQuery,
  useDeleteCartMutation,
} from "@/redux/api/cartApi";
import {
  ArrowRightOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useUser } from "@clerk/nextjs";
import { Button, message, Popconfirm } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../../utils/motion";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";

const MyCart = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [CartItems, setCartItems] = useState<any>();

  useEffect(() => {
    fetch(`https://sheba-backkend.vercel.app/api/v1/mycart/${user?.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data?.data);
      });
  }, [user?.id]);

  const [deleteCart] = useDeleteCartMutation();
  const handleRemoveFromCart = async (id: string) => {
    message.success("Item removed from your cart");
    await deleteCart(id);
    setCartItems((prev: any) => prev.filter((item: any) => item.id !== id));
  };

  const itemCount = CartItems?.length || 0;
  const subtotal = CartItems
    ? CartItems.reduce(
        (total: number, item: any) =>
          total + (parseFloat(item?.service?.price) || 0),
        0,
      )
    : 0;
  const tax = +(subtotal * 0.12).toFixed(2);
  const discount = 0;
  const total = +(subtotal + tax - discount).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white mt-10">
      {CartItems?.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
        >
          {/* Header */}
          <motion.div
            className="mb-10"
            variants={fadeIn("up", "spring", 0.2, 0.75)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100">
                <ShoppingCartOutlined className="text-2xl text-blue-600" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                  My Cart
                </h1>
                <p className="text-gray-600 mt-1">
                  Review and manage your bookings
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                className="space-y-4"
                variants={staggerContainer(0.1, 0.2)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {CartItems?.map((item: any, index: number) => (
                  <motion.div
                    key={item.id}
                    variants={fadeIn("right", "spring", index * 0.1, 0.75)}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 group"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6">
                      {/* Image */}
                      <div className="sm:w-32 h-32 relative flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={
                            item?.service?.image || "/placeholder-service.jpg"
                          }
                          alt={item?.service?.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          style={{ aspectRatio: "1" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          {/* Category Badge */}
                          <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
                            {item?.service?.category || "Service"}
                          </div>

                          {/* Service Name */}
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                            {item?.service?.name}
                          </h3>

                          {/* Rating */}
                          <div className="flex items-center gap-1 mb-3">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.round(item?.service?.rating || 0)
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600 ml-1">
                              {item?.service?.rating || "No ratings"}
                            </span>
                          </div>

                          {/* Location */}
                          <div className="flex items-center gap-1 text-gray-600 text-sm">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {item?.service?.location ||
                              "Location not specified"}
                          </div>
                        </div>

                        {/* Footer - Date & Actions */}
                        <div className="flex items-center justify-between gap-2 mt-4 pt-4 border-t border-gray-100">
                          <span className="text-xs text-gray-500">
                            Added{" "}
                            {item?.createdAt
                              ? new Date(item.createdAt).toLocaleDateString()
                              : "—"}
                          </span>
                          <div className="flex items-center gap-2">
                            <Popconfirm
                              placement="topRight"
                              title={`Remove ${item?.service?.name}?`}
                              onConfirm={() => handleRemoveFromCart(item?.id)}
                              okText="Remove"
                              cancelText="Cancel"
                            >
                              <Button
                                type="text"
                                icon={<DeleteOutlined />}
                                className="text-gray-500 hover:text-red-500 transition-colors"
                                size="small"
                              >
                                Remove
                              </Button>
                            </Popconfirm>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right flex flex-col items-end justify-between">
                        <div>
                          <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                            ৳{parseFloat(item?.service?.price || 0).toFixed(2)}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            per booking
                          </p>
                        </div>
                        <Link
                          href={`/purchase/${item?.service?.id}`}
                          className="w-full sm:w-auto"
                        >
                          <Button
                            type="primary"
                            className="bg-blue-600 hover:bg-blue-700 transition-colors h-10 px-6"
                            size="large"
                          >
                            Book Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Summary Sidebar */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="sticky top-24 bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                {/* Items Summary */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Order Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>Items ({itemCount})</span>
                      <span>৳{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (12%)</span>
                      <span>৳{tax.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-৳{discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100" />

                {/* Total */}
                <div>
                  <div className="flex justify-between mb-4">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ৳{total.toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout Button
                  <Button
                    type="primary"
                    size="large"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 font-semibold text-base"
                  >
                    Proceed to Checkout
                  </Button> */}

                  <p className="text-xs text-gray-500 text-center mt-3">
                    You can book services individually or all at once
                  </p>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <p className="text-xs text-blue-700">
                    💡 <span className="font-semibold">Tip:</span> Each service
                    can be booked separately with different dates and times.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center min-h-[60vh] px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white shadow-sm rounded-xl px-8 py-12 flex flex-col items-center border border-gray-100 max-w-md w-full">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ShoppingCartOutlined className="text-6xl text-blue-200 mb-6" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Your cart is empty
            </h1>
            <p className="text-gray-600 text-center mb-8 max-w-xs">
              Explore our services and add them to your cart to get started
            </p>
            <Link href={"/allservices"} className="w-full">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="primary"
                  size="large"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 h-12 text-base font-semibold shadow-md"
                >
                  Explore Services <ArrowRightOutlined className="ml-2" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MyCart;
