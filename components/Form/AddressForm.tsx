import { FormWrapper } from "./FormWrapper";
import { MapPin } from "lucide-react";

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
      <div className="space-y-6 mt-6">
        {/* Street Field */}
        <div className="space-y-2">
          <label className="block text-black text-sm font-semibold">
            <MapPin className="w-4 h-4 inline mr-2" />
            Street Address
          </label>
          <input
            autoFocus
            required
            type="text"
            name="street"
            value={street}
            onChange={(e) => updateFields({ street: e.target.value })}
            className="w-full px-4 py-3 text-gray-900 bg-white rounded-xl border-2 border-white/30 focus:border-white focus:outline-none transition-colors placeholder-gray-300 shadow-sm"
            placeholder="Example: 123/A, Banani"
          />
        </div>

        {/* City Field */}
        <div className="space-y-2">
          <label className="block text-Black text-sm font-semibold">Area</label>
          <input
            required
            type="text"
            name="city"
            value={city}
            onChange={(e) => updateFields({ city: e.target.value })}
            className="w-full px-4 py-3 text-gray-900 bg-white rounded-xl border-2 border-white/30 focus:border-white focus:outline-none transition-colors placeholder-gray-300 shadow-sm"
            placeholder="Example: Gulshan"
          />
        </div>

        {/* State & Zip Row */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-black text-sm font-semibold">
              Building No.
            </label>
            <input
              required
              type="text"
              name="state"
              value={state}
              onChange={(e) => updateFields({ state: e.target.value })}
              className="w-full px-4 py-3 text-gray-900 bg-white rounded-xl border-2 border-white/30 focus:border-white focus:outline-none transition-colors placeholder-gray-500 shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-black text-sm font-semibold">
              Floor
            </label>
            <input
              required
              type="text"
              name="zip"
              value={zip}
              onChange={(e) => updateFields({ zip: e.target.value })}
              className="w-full px-4 py-3 text-gray-900 bg-white rounded-xl border-2 border-white/30 focus:border-white focus:outline-none transition-colors placeholder-gray-500 shadow-sm"
            />
          </div>
        </div>
      </div>
    </FormWrapper>
  );
}
