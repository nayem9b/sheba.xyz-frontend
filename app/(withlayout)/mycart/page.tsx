"use client";

import {
  useCartItemsByUserIdQuery,
  useDeleteCartMutation,
} from "@/redux/api/cartApi";
import { ArrowRightOutlined, DeleteOutlined, ShoppingCartOutlined, TagOutlined } from "@ant-design/icons";
import { useUser } from "@clerk/nextjs";
import { Button, Input, Space, message, Divider, Badge } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, staggerContainer } from "../../../utils/motion";

const MyCart = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [CartItems, setCartItems] = useState<any>();

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/mycart/${user?.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("my cart services", data.data);
        setCartItems(data?.data);
      });
  }, [user?.id]);

  // const { data } = useCartItemsByUserIdQuery(user?.id);
  // const CartItems = data?.data;
  // console.log(CartItems);
  const [deleteCart] = useDeleteCartMutation();
  const handleRemoveFromCart = async (id: string) => {
    message.success("Deleted from your cart");
    const res = await deleteCart(id);
    window.location.reload();
  };
  const calculateTotal = () => {
    return CartItems?.reduce((total: number, item: any) => {
      return total + (parseFloat(item?.service?.price) || 0);
    }, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <AnimatePresence> */}
        {CartItems?.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-12"
          >
            <motion.header 
              className="text-center mb-12"
              variants={fadeIn('up', 'spring', 0.2, 0.75)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Shopping Cart</h1>
              <p className="text-gray-500">Review and manage your selected services</p>
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
                    variants={fadeIn('right', 'spring', index * 0.1, 0.75)}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 h-48 md:h-auto">
                        <img
                          src={item?.service?.image || '/placeholder-service.jpg'}
                          alt={item?.service?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="p-6 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-1">
                              {item?.service?.name}
                            </h3>
                            <div className="flex items-center text-amber-500 mb-3">
                              {'★'.repeat(Math.round(item?.service?.rating || 0))}
                              {'☆'.repeat(5 - Math.round(item?.service?.rating || 0))}
                              <span className="text-gray-500 text-sm ml-2">
                                ({item?.service?.rating || 'No ratings'})
                              </span>
                            </div>
                            <p className="text-gray-500 mb-4 flex items-center">
                              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {item?.service?.location || 'Location not specified'}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <span className="text-2xl font-bold text-blue-600">
                              ₹{parseFloat(item?.service?.price || 0).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100">
                          <Button
                            onClick={() => handleRemoveFromCart(item?.id)}
                            icon={<DeleteOutlined />}
                            className="flex items-center text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
                            size="large"
                          >
                            Remove
                          </Button>
                          <Link href={`/purchase/${item?.service?.id}`} className="flex-1">
                            <Button 
                              type="primary" 
                              className="w-full h-10 bg-blue-600 hover:bg-blue-700 transition-colors"
                              size="large"
                            >
                              Book Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <motion.div 
                variants={fadeIn('left', 'spring', 0.4, 0.75)}
                className="h-fit bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{calculateTotal()}</span>
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
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-blue-600">₹{calculateTotal()}</span>
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
                  <p>or <Link href="/allservices" className="text-blue-500 hover:underline">Continue Shopping</Link></p>
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
          <div className="bg-white shadow-xl rounded-3xl px-8 py-12 flex flex-col items-center border border-gray-100 max-w-md w-full">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ShoppingCartOutlined className="text-6xl text-blue-400 mb-6" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3 text-center">Your cart is empty</h1>
            <p className="text-gray-500 text-center mb-8 max-w-xs">Looks like you havent added any services to your cart yet.</p>
            <Link href={'/allservices'} className="w-full max-w-xs">
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
