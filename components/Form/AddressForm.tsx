import { FormWrapper } from "./FormWrapper";
import { MapPin, Building, Home } from "lucide-react";

type AddressData = {
  street: string;
  city: string;
  state: string;
  zip: string;
};

type AddressFormProps = AddressData & {
  updateFields: (fields: Partial<AddressData>) => void;
};

export function AddressForm({
  street,
  city,
  state,
  zip,
  updateFields,
}: AddressFormProps) {
  return (
    <FormWrapper title="Address">
      <div className="space-y-5 mt-8 w-full">
        {/* Street Field */}
        <div className="space-y-3 w-full">
          <label className="block text-gray-900 text-sm font-semibold flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Street Address
          </label>
          <input
            autoFocus
            required
            type="text"
            name="street"
            value={street}
            onChange={(e) => updateFields({ street: e.target.value })}
            className="w-full px-4 py-3.5 text-gray-900 bg-white rounded-xl border-0 focus:outline-none transition-all placeholder-gray-400 font-medium"
            placeholder="123/A, Banani"
          />
        </div>

        {/* City/Area Field */}
        <div className="space-y-3 w-full">
          <label className="block text-gray-900 text-sm font-semibold">
            Area / City
          </label>
          <input
            required
            type="text"
            name="city"
            value={city}
            onChange={(e) => updateFields({ city: e.target.value })}
            className="w-full px-4 py-3.5 text-gray-900 bg-white rounded-xl border-0 focus:outline-none transition-all placeholder-gray-400 font-medium"
            placeholder="Gulshan"
          />
        </div>

        {/* Building No. & Floor Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="space-y-3 w-full">
            <label className="block text-gray-900 text-sm font-semibold flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-600" />
              Building No.
            </label>
            <input
              required
              type="text"
              name="state"
              value={state}
              onChange={(e) => updateFields({ state: e.target.value })}
              className="w-full px-4 py-3.5 text-gray-900 bg-white rounded-xl border-0 focus:outline-none transition-all placeholder-gray-400 font-medium"
              placeholder="E.g., 45"
            />
          </div>

          <div className="space-y-3 w-full">
            <label className="block text-gray-900 text-sm font-semibold flex items-center gap-2">
              <Home className="w-5 h-5 text-blue-600" />
              Floor
            </label>
            <input
              required
              type="text"
              name="zip"
              value={zip}
              onChange={(e) => updateFields({ zip: e.target.value })}
              className="w-full px-4 py-3.5 text-gray-900 bg-white rounded-xl border-0 focus:outline-none transition-all placeholder-gray-400 font-medium"
              placeholder="E.g., 3"
            />
          </div>
        </div>
      </div>
    </FormWrapper>
  );
}
