"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Search from "@/components/ui/Searchbar";
import banner from "@/Assets/home-banner.webp";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Clock, Star, Zap } from "lucide-react";
import Link from "next/link";

const Homepage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: categoryData } = useCategoriesQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });

  const features = [
    {
      icon: <CheckCircle className="w-5 h-5" />,
      text: "Verified Professionals",
    },
    { icon: <Clock className="w-5 h-5" />, text: "24/7 Service" },
    { icon: <Star className="w-5 h-5" />, text: "5-Star Rated" },
    { icon: <Zap className="w-5 h-5" />, text: "Quick Response" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full overflow-hidden">
        <Image
          src={banner}
          alt="Professional services"
          width={1920}
          height={600}
          priority
          placeholder="blur"
          className="w-full h-auto mt-16"
          quality={100}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 z-10" />

        <div className="absolute inset-0 z-20 container mx-auto px-4 h-full flex flex-col justify-end pb-16">
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2,
                }}
                className="text-center lg:text-left max-w-3xl mx-auto lg:mx-0"
              >
                <Badge className="mb-4 px-4 py-1.5 text-sm font-medium bg-white/10 backdrop-blur-sm text-slate-800 border border-white/20 hover:bg-white/20">
                  Trusted by 10,000+ Customers
                </Badge>
                <h1 className="text-7xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
                  Professional Home Services
                </h1>
                <p className="text-lg md:text-xl text-slate-800 mb-8 max-w-2xl mx-auto lg:mx-0 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
                  Book trusted professionals for all your home service needs.
                  Quality service, transparent pricing, and guaranteed
                  satisfaction.
                </p>

                <div className="mb-8">
                  <Search />
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 -mt-7">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-2 text-white text-sm bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm"
                    >
                      {feature.icon}
                      <span>{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Animated dots background */}
        <div className="absolute inset-0 overflow-hidden z-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 10 + 5 + "px",
                height: Math.random() * 10 + 5 + "px",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.5, 0.1],
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Popular Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of professional services for all your needs
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categoryData?.data
              ?.slice(0, 12)
              .map((category: any, index: number) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link
                    href={`/services?category=${category.name}`}
                    className="block p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 h-full group-hover:border-blue-100"
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-3 mx-auto group-hover:bg-blue-100 transition-colors">
                      <Image
                        src={category.image || "/category-placeholder.svg"}
                        alt={category.name}
                        width={56}
                        height={56}
                        className="rounded-lg text-blue-600"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 text-center group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                  </Link>
                </motion.div>
              ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Button
              variant="outline"
              className="rounded-full px-6 py-6 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 group"
              asChild
            >
              <Link href="/categories">
                View All Categories
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section> */}

      {/* CTA Section
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of satisfied customers who trust us for their home service needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 text-base font-medium rounded-full shadow-lg"
              >
                Book a Service
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-base font-medium rounded-full"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
};

export default Homepage;
