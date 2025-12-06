"use client";

import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { Dayjs } from "dayjs";
import { DatePicker, TimePicker, Input, Button } from "antd";
import { setToLocalStorage, getFromLocalStorage } from "@/utils/local-storage";
import {
  UserOutlined,
  PhoneOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  MailOutlined,
} from "@ant-design/icons";

interface UserData {
  firstName: string;
  lastName: string;
  age: string;
  [key: string]: any;
}

interface UserFormProps extends UserData {
  updateFields: (fields: Partial<UserData>) => void;
}

const formatDate = (date: Dayjs | null) => {
  return date ? date.format("YYYY-MM-DD") : "";
};

const formatTime = (time: Dayjs | null) => {
  return time ? time.format("h:mm A") : "";
};
const UserForm = ({ updateFields, ...formData }: UserFormProps) => {
  const { user } = useUser();
  // Use local state for controlled inputs so the component is editable
  const [localName, setLocalName] = useState(
    (formData.fullName as string) || (formData.firstName as string) || "" || ""
  );
  const [localContact, setLocalContact] = useState(
    (formData.contactNo as string) || ""
  );

  // Initialize local state from localStorage if values exist
  useEffect(() => {
    const savedName = getFromLocalStorage("name");
    const savedContact = getFromLocalStorage("contactNo");
    if (savedName) setLocalName(savedName);
    if (savedContact) setLocalContact(savedContact);
  }, []);
  const [formState, setFormState] = useState({
    date: null as Dayjs | null,
    time: null as Dayjs | null,
  });

  const handleChange = (field: string, value: any) => {
    // Update local controlled state and localStorage, then notify parent
    if (field === "fullName" || field === "name") {
      setLocalName(value);
      setToLocalStorage("name", value);
    }

    if (field === "contactNo" || field === "contact") {
      setLocalContact(value);
      setToLocalStorage("contactNo", value);
    }

    if (updateFields) {
      updateFields({ [field]: value });
    }
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFormState((prev) => ({ ...prev, date }));
    setToLocalStorage("date", formatDate(date));
  };

  const handleTimeChange = (time: Dayjs | null) => {
    setFormState((prev) => ({ ...prev, time }));
    setToLocalStorage("time", formatTime(time));
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Personal Information
          </h2>
          <p className="text-gray-500">
            Please fill in your details to continue
          </p>
        </div>

        <div className="space-y-6">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <Input
              size="large"
              value={user?.primaryEmailAddress?.emailAddress || ""}
              disabled
              className="w-full h-12 rounded-lg"
              prefix={<MailOutlined className="text-gray-400" />}
            />
          </div>

          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <Input
              size="large"
              placeholder="John Doe"
              className="w-full h-12 rounded-lg"
              prefix={<UserOutlined className="text-gray-400" />}
              onChange={(e) => handleChange("fullName", e.target.value)}
              value={localName}
            />
          </div>

          {/* Contact Number */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <Input
              size="large"
              placeholder="+880"
              className="w-full h-12 rounded-lg"
              prefix={<PhoneOutlined className="text-gray-400" />}
              onChange={(e) => handleChange("contactNo", e.target.value)}
              value={localContact}
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Date</label>
              <DatePicker
                size="large"
                className="w-full h-12 rounded-lg"
                placeholder="Select date"
                value={formState.date}
                onChange={handleDateChange}
                format="MMM DD, YYYY"
                suffixIcon={<CalendarOutlined className="text-gray-400" />}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Time</label>
              <TimePicker
                size="large"
                className="w-full h-12 rounded-lg"
                placeholder="Select time"
                value={formState.time}
                onChange={handleTimeChange}
                format="h:mm A"
                use12Hours
                suffixIcon={<ClockCircleOutlined className="text-gray-400" />}
              />
            </div>
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg font-medium"
          onClick={() => console.log("Form submitted")}
        >
          Continue
        </Button>
      </motion.div>
    </div>
  );
};

export default UserForm;
