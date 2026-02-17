/* eslint-disable react/jsx-key */
"use client";
import { PlusOutlined } from "@ant-design/icons";
import React, { FormEvent, useEffect, useState } from "react";
import {
  Button,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  message,
} from "antd";
import { useMultistepForm } from "@/components/Form/useMultistepForm";
import UserForm from "@/components/Form/UserForm";
import { AddressForm } from "@/components/Form/AddressForm";
import { AccountForm } from "@/components/Form/AccountForm";
import { setToLocalStorage } from "@/utils/local-storage";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  XCircle,
  Shield,
  MapPin,
  Star,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

type FormData = {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
};

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
};

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const PurchasePage = ({ params }: { params: any }) => {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [serviceData, setServiceData] = useState<any>();
  console.log(serviceData);
  const serviceInfo = serviceData?.data;
  console.log(serviceInfo);
  const { id } = params;

  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  useEffect(() => {
    fetch(`https://sheba-backkend.vercel.app/api/v1/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setServiceData(data);
        console.log(data);
      });
  }, [id]);

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <AccountForm {...data} updateFields={updateFields} />,
    ]);

  function onSubmit(e: any) {
    message.loading("processing");
    e.preventDefault();
    const form = e.target;
    const name = form?.fullName?.value;
    if (name) {
      setToLocalStorage("name", name);
    }
    const email = form?.email?.value;

    const contactNo = form?.contactNo?.value;
    if (contactNo) {
      setToLocalStorage("contactNo", contactNo);
    }
    const street = form?.street?.value;
    if (street) {
      setToLocalStorage("street", street);
    }
    const city = form?.city?.value;
    if (city) {
      setToLocalStorage("city", city);
    }
    const zip = form?.zip?.value;
    const confirmation = form?.confirmation?.value;
    console.log(confirmation);

    if (email) {
      setToLocalStorage("email", email);
    }

    if (zip) {
      setToLocalStorage("zip", zip);
    }

    if (!isLastStep) return next();

    const SendPurchaseInfo = {
      userId: user?.id,
      email: user?.primaryEmailAddress?.emailAddress,
      name: localStorage.getItem("name"),
      servicesId: id,
      date: localStorage.getItem("date"),
      contactNo: parseInt(localStorage.getItem("contactNo") as string),
      street: localStorage.getItem("street"),
      zip: localStorage.getItem("zip"),
      time: localStorage.getItem("time"),
    };
    console.log(SendPurchaseInfo);
    if (confirmation === "I Agree") {
      fetch(`https://sheba-backkend.vercel.app/api/v1/book`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(SendPurchaseInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          message.success("Successfully booked order");
          router.push("/mybookings");
        });
    }
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Service Details Section */}
          <section className="lg:col-span-2">
            {/* Service Image */}
            <article className="mb-10">
              <div className="mb-8 overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <Image
                  alt={serviceInfo?.name || ""}
                  src={serviceInfo?.image}
                  width={600}
                  height={320}
                  className="w-full h-80 object-cover"
                  unoptimized={true}
                />
              </div>

              {/* Service Header */}
              <div className="mb-10">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {serviceInfo?.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-lg font-semibold text-gray-800">
                      4.8
                    </span>
                    <span className="text-sm text-gray-600">(256 reviews)</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                  <p className="text-sm text-gray-600 mb-2">Starting from</p>
                  <p className="text-5xl font-bold text-blue-600">
                    {serviceInfo?.price} ৳
                  </p>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 text-lg text-gray-700 mb-8 bg-gray-50 p-4 rounded-xl">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <span>{serviceInfo?.location}</span>
                </div>
              </div>
            </article>

            {/* What's Included */}
            <section className="mb-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle className="w-7 h-7 text-green-600" />
                What&#39;s Included?
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-gray-700 text-lg">
                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  <span>Only Service charge</span>
                </li>
                <li className="flex items-center gap-4 text-gray-700 text-lg">
                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                  <span>7 Days service warranty</span>
                </li>
              </ul>
            </section>

            {/* What's Excluded */}
            <section className="mb-8 bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-8 border border-red-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <XCircle className="w-7 h-7 text-red-600" />
                What&#39;s Excluded?
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-gray-700 text-lg">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  <span>Price of materials or parts</span>
                </li>
                <li className="flex items-center gap-4 text-gray-700 text-lg">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  <span>
                    Transportation cost for carrying new materials/parts
                  </span>
                </li>
                <li className="flex items-center gap-4 text-gray-700 text-lg">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                  <span>Warranty given by manufacturer</span>
                </li>
              </ul>
            </section>

            {/* Safety & Hygiene */}
            <section className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Shield className="w-7 h-7 text-blue-600" />
                Safety & Hygiene
              </h2>
              <p className="text-gray-700 mb-6 text-base leading-relaxed">
                We are well-equipped and well-prepared to protect your health
                and hygiene while serving you. Our preparations include:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-4 text-gray-700">
                  <ArrowRight className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span>Checked Health condition of service specialist</span>
                </li>
                <li className="flex items-start gap-4 text-gray-700">
                  <ArrowRight className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span>
                    Ensuring use of masks, hand sanitisers, gloves, etc
                  </span>
                </li>
                <li className="flex items-start gap-4 text-gray-700">
                  <ArrowRight className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span>Disinfecting equipments before and after the work</span>
                </li>
                <li className="flex items-start gap-4 text-gray-700">
                  <ArrowRight className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span>Maintaining social distancing</span>
                </li>
              </ul>
            </section>
          </section>

          {/* Booking Form Section */}
          <section className="lg:col-span-1">
            <div className="sticky top-24 bg-gradient-to-br from-indigo-100  to-purple-200 rounded-2xl shadow-2xl overflow-hidden">
              <form onSubmit={onSubmit} className="p-8">
                {/* Progress Indicator */}
                <div className="text-right mb-6">
                  <span className="text-slate-800 text-sm font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    Step {currentStepIndex + 1} of {steps.length}
                  </span>
                </div>

                {/* Form Steps */}
                <div className="mb-8">{step}</div>

                {/* Navigation Buttons */}
                <div className="flex flex-col gap-3">
                  {!isFirstStep && (
                    <Button
                      onClick={back}
                      size="large"
                      className="w-full bg-slate-200 text-slate-700 hover:bg-slate-300 font-semibold border-0"
                    >
                      Go Back
                    </Button>
                  )}

                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    className="w-full bg-blue-600 text-white hover:bg-blue-800 font-semibold rounded-lg border-0"
                  >
                    {isLastStep ? "Complete Booking" : "Continue"}
                  </Button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PurchasePage;
