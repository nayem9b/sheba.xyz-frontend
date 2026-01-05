import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Input, Select, Button, Space, AutoComplete, theme } from "antd";
import { useServicesQuery } from "@/redux/api/servicesApi";
import { motion } from "framer-motion";
import type { SelectProps } from "antd";
import { useRouter } from "next/navigation";

const { Search } = Input;

const SearchPage = () => {
  const { token } = theme.useToken();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState<string>("name");
  const [isFocused, setIsFocused] = useState(false);
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
  const router = useRouter();

  const { data: allServices, isLoading } = useServicesQuery({
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (allServices && searchQuery) {
      interface Service {
        id: string;
        name: string;
        location: string;
        category: string;
        [key: string]: string;
      }

      interface AllServicesResponse {
        data: Service[];
      }

      interface OptionType {
        value: string;
        label: React.ReactNode;
        id: string;
      }

      const filtered: OptionType[] = (allServices as AllServicesResponse).data
        .filter((service: Service) =>
          service[selectedField]
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
        .map((service: Service) => ({
          value: service[selectedField],
          id: service.id,
          label: (
            <div className="flex items-center gap-2">
              <span className="font-medium">{service.name}</span>
              <span className="text-gray-500 text-sm">
                in {service.location}
              </span>
            </div>
          ),
        }));
      setOptions(filtered);
    } else {
      setOptions([]);
    }
  }, [searchQuery, selectedField, allServices]);

  const onSearch = (value: string) => {
    if (!value.trim()) return;

    // First, try to find an exact match in the services
    const selectedService = options?.find(
      (option) => option.value && String(option.value).toLowerCase() === value.toLowerCase()
    );

    if (selectedService) {
      // If exact match found, go to that service
      router.push(`/services/${selectedService.id}`);
    } else {
      // If no exact match, search for related services
      const filteredServices = (allServices?.data || [])
        .filter((service: any) => {
          const serviceName = service.name?.toLowerCase() || "";
          const serviceLocation = service.location?.toLowerCase() || "";
          const categoryName =
            typeof service.category === "string"
              ? service.category.toLowerCase()
              : service.category?.title?.toLowerCase() ||
                service.category?.name?.toLowerCase() ||
                "";
          const searchTerm = value.toLowerCase();

          return (
            serviceName.includes(searchTerm) ||
            serviceLocation.includes(searchTerm) ||
            categoryName.includes(searchTerm)
          );
        })
        .map((service: any) => service.id);

      if (filteredServices.length > 0) {
        // If there are related services, redirect to services page with search query
        router.push(`/allservices?search=${encodeURIComponent(value)}`);
      } else {
        // If no services found, still go to services page to show no results
        router.push(`/allservices?search=${encodeURIComponent(value)}`);
      }
    }
  };

  const handleChange = (value: string) => {
    setSelectedField(value);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <motion.div
        className="relative"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={`flex items-center gap-2 p-1 bg-white rounded-xl shadow-lg transition-all duration-300 border ${
            isFocused
              ? "border-blue-400 ring-2 ring-blue-100"
              : "border-gray-200"
          }`}
        >
          <div className="relative flex-1">
            <Input
              size="large"
              placeholder={`Search by ${selectedField}...`}
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              onPressEnter={() => {
                setIsFocused(false);
                onSearch(searchQuery);
              }}
              className="border-0 shadow-none hover:border-0 focus:border-0 focus:shadow-none focus-within:border-transparent"
              style={{ height: "56px" }}
            />
            {searchQuery && (
              <AutoComplete
                options={options}
                style={{
                  width: "100%",
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  zIndex: 10,
                  marginTop: 4,
                }}
                dropdownMatchSelectWidth={false}
                onSelect={(value) => {
                  setSearchQuery(value);
                  onSearch(value);
                }}
                open={isFocused && options && options.length > 0}
              />
            )}
          </div>

          <div className="flex items-center gap-2 pr-2">
            <Select
              value={selectedField}
              onChange={handleChange}
              suffixIcon={<FilterOutlined />}
              bordered={false}
              className="w-32"
              popupClassName="search-filter-dropdown"
              options={[
                { value: "name", label: "Name" },
                { value: "location", label: "Location" },
                { value: "category", label: "Category" },
              ]}
            />
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="primary"
                size="large"
                icon={<SearchOutlined />}
                onClick={() => onSearch(searchQuery)}
                className="h-12 px-6 font-medium"
              >
                Search
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        .search-filter-dropdown .ant-select-item-option {
          padding: 8px 16px;
          border-radius: 8px;
          margin: 4px;
        }
        .search-filter-dropdown .ant-select-item-option-active {
          background-color: ${token.colorPrimaryBg};
        }
        .search-filter-dropdown .ant-select-item-option-selected {
          background-color: ${token.colorPrimaryBg};
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default SearchPage;
