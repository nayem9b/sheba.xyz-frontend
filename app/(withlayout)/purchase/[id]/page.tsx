/* eslint-disable react/jsx-key */
"use client";

import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
} from "antd";
import { useMultistepForm } from "@/components/Form/useMultistepForm";
import UserForm from "@/components/Form/UserForm";
import { AddressForm } from "@/components/Form/AddressForm";
import { AccountForm } from "@/components/Form/AccountForm";
import { setToLocalStorage } from "@/utils/local-storage";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";

const { TextArea } = Input;

const PurchasePage = ({ params }: { params: any }) => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [serviceData, setServiceData] = useState<any>();
  const serviceInfo = serviceData?.data;
  const { id } = params;

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setServiceData(data);
      });
  }, [id]);

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <UserForm
        firstName=""
        lastName=""
        age=""
        updateFields={() => {}}
      />, // Provide default props
      <AddressForm
        street=""
        city=""
        state=""
        zip=""
        updateFields={() => {}}
      />, // Provide default props
      <AccountForm
        email=""
        password=""
        updateFields={() => {}}
      />, // Provide default props
    ]);

  function onSubmit(e: any) {
    message.loading("Processing your request...");
    e.preventDefault();
    const form = e.target;
    const confirmation = form?.confirmation?.value;

    if (!isLastStep) return next();

    const SendPurchaseInfo = {
      userId: user?.id,
      email: user?.primaryEmailAddress?.emailAddress,
      servicesId: id,
      name: localStorage.getItem("name"),
      date: localStorage.getItem("date"),
      contactNo: parseInt(localStorage.getItem("contactNo") as string),
      street: localStorage.getItem("street"),
      zip: localStorage.getItem("zip"),
      time: localStorage.getItem("time"),
    };

    if (confirmation === "I Agree") {
      fetch(`http://localhost:3000/api/v1/book`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(SendPurchaseInfo),
      })
        .then((res) => res.json())
        .then(() => {
          message.success("Successfully booked your order!");
          router.push("/mybookings");
        });
    }
  }

  return (
    <div className="flex flex-col lg:flex-row justify-between mx-8 lg:mx-16 mt-16 gap-12">
      <div className="lg:w-1/2">
        <Image
          alt="Service Image"
          src={serviceInfo?.image || "/placeholder-service.jpg"}
          width={600}
          height={400}
          className="rounded-3xl object-cover shadow-lg"
        />

        <h3 className="mt-6 text-4xl font-bold text-gray-900">
          {serviceInfo?.name}
        </h3>

        <p className="mt-4 text-2xl font-semibold text-blue-600">
          ₹{serviceInfo?.price}
        </p>

        <p className="mt-2 text-lg text-gray-700">
          <span className="font-medium">Location:</span> {serviceInfo?.location}
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <h4 className="font-semibold text-lg">What&apos;s Included?</h4>
            <ul className="list-disc list-inside text-gray-600">
              <li>Only Service charge</li>
              <li>7 Days service warranty</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg">What&apos;s Excluded?</h4>
            <ul className="list-disc list-inside text-gray-600">
              <li>Price of materials or parts</li>
              <li>Transportation cost for carrying new materials/parts</li>
              <li>Warranty given by manufacturer</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
          <h4 className="font-semibold text-lg text-gray-800">Safety Measures</h4>
          <ul className="list-disc list-inside text-gray-600 mt-2">
            <li>Checked health condition of service specialist</li>
            <li>Ensuring use of masks, hand sanitizers, gloves, etc.</li>
            <li>Disinfecting equipment before and after the work</li>
            <li>Maintaining social distancing</li>
          </ul>
        </div>
      </div>

      <div className="lg:w-1/2 bg-gradient-to-br from-teal-500 to-purple-700 p-8 rounded-2xl shadow-xl sticky top-24">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="text-white text-lg font-semibold text-right">
            Step {currentStepIndex + 1} of {steps.length}
          </div>

          <div>{step}</div>

          <div className="flex justify-between items-center">
            {!isFirstStep && (
              <Button
                type="default"
                onClick={back}
                className="px-6 py-3 bg-white text-gray-700 rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300"
              >
                Back
              </Button>
            )}

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              {isLastStep ? "Finish" : "Next"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchasePage;
