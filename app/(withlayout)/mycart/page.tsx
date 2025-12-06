"use client";

import {
  useCartItemsByUserIdQuery,
  useDeleteCartMutation,
} from "@/redux/api/cartApi";
import {
  ArrowRightOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { useUser } from "@clerk/nextjs";
import { Button, Input, Space, message, Divider, Badge, Popconfirm } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../../utils/motion";
import Image from "next/image";

const MyCart = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [CartItems, setCartItems] = useState<any>();

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/mycart/${user?.id}`)
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

  // subtotal, tax, total calculations handled below

  const itemCount = CartItems?.length || 0;
  const subtotal = CartItems
    ? CartItems.reduce((total: number, item: any) => total + (parseFloat(item?.service?.price) || 0), 0)
    : 0;
  const tax = +(subtotal * 0.12).toFixed(2); // 12% tax example
  const discount = 0; // placeholder for future
  const total = +(subtotal + tax - discount).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {CartItems?.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto px-6 py-6"
        >
          <motion.header
            className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-10 gap-4"
            variants={fadeIn("up", "spring", 0.2, 0.75)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                My Cart
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">
                Review and manage the services you&apos;re about to book
              </p>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
              <div className="hidden md:block text-sm text-gray-600">{itemCount} items</div>
              <Badge count={itemCount} offset={[6, -6]}>
                <ShoppingCartOutlined className="text-2xl text-blue-600" />
              </Badge>
            </div>
          </motion.header>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={staggerContainer(0.1, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="lg:col-span-2 space-y-6">
              {CartItems?.map((item: any, index: number) => (
                <motion.div
                  key={item.id}
                  variants={fadeIn("right", "spring", index * 0.1, 0.75)}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 h-48 md:h-auto relative">
                      <Image
                        src={item?.service?.image || "/placeholder-service.jpg"}
                        alt={item?.service?.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute left-3 top-3 bg-white/80 px-2 py-1 rounded-lg text-xs text-gray-700 font-semibold">
                        {item?.service?.category || "Service"}
                      </div>
                    </div>

                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {item?.service?.name}
                          </h3>
                          <div className="flex items-center text-amber-500 mb-3">
                            {"★".repeat(Math.round(item?.service?.rating || 0))}
                            {"☆".repeat(
                              5 - Math.round(item?.service?.rating || 0)
                            )}
                            <span className="text-gray-500 text-sm ml-2">
                              ({item?.service?.rating || "No ratings"})
                            </span>
                          </div>
                          <p className="text-gray-500 mb-4 flex items-center">
                            <svg
                              className="w-4 h-4 mr-2 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {item?.service?.location ||
                              "Location not specified"}
                          </p>
                        </div>

                        <div className="text-right flex items-start justify-end flex-col">
                          <span className="text-lg md:text-xl font-semibold text-blue-600">
                            ₹{parseFloat(item?.service?.price || 0).toFixed(2)}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">per booking</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100">
                        <Popconfirm
                          placement="topRight"
                          title={`Remove ${item?.service?.name} from cart?`}
                          onConfirm={() => handleRemoveFromCart(item?.id)}
                          okText="Remove"
                          cancelText="Cancel"
                        >
                          <Button
                            icon={<DeleteOutlined />}
                            className="flex items-center text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
                            size="large"
                          >
                            Remove
                          </Button>
                        </Popconfirm>
                        <Link
                          href={`/purchase/${item?.service?.id}`}
                          className="flex-1"
                        >
                          <Button
                            type="primary"
                            className="w-full h-10 bg-blue-600 hover:bg-blue-700 transition-colors"
                            size="large"
                          >
                            Book Now
                          </Button>
                        </Link>
                        <div className="ml-auto text-sm text-gray-500">
                          <span>Added: </span>
                          <span className="font-medium">{item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={fadeIn("left", "spring", 0.4, 0.75)}
              className="h-fit bg-white rounded-xl shadow-sm p-6 border border-gray-200 sticky top-24"
              style={{ alignSelf: 'start' }}
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center">
                  <Input
                    placeholder="Promo code"
                    prefix={<TagOutlined className="text-gray-400" />}
                    className="flex-1"
                  />
                  <Button type="primary" className="ml-2">
                    Apply
                  </Button>
                </div>

                <Divider className="my-4" />

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax (12%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Discount</span>
                  <span>₹{discount.toFixed(2)}</span>
                </div>

                <div className="mt-3 border-t pt-3 flex justify-between items-center text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-blue-600">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                type="primary"
                size="large"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 h-12 text-base font-medium"
              >
                Proceed to Checkout
              </Button>

              <div className="mt-4 text-center text-sm text-gray-500">
                <span>
                  or&nbsp;
                </span>
                <Link href="/allservices" className="text-blue-500 hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center min-h-[60vh] px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white shadow-md rounded-xl px-8 py-12 flex flex-col items-center border border-gray-200 max-w-md w-full">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ShoppingCartOutlined className="text-6xl text-blue-400 mb-6" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3 text-center">
              Your cart is empty
            </h1>
            <p className="text-gray-500 text-center mb-8 max-w-xs">
              Looks like you haven’t added any services to your cart yet.
            </p>
            <Link href={"/allservices"} className="w-full max-w-xs">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="primary"
                  size="large"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 border-0 h-12 text-base font-medium shadow-md"
                >
                  Browse Services <ArrowRightOutlined className="ml-2" />
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
