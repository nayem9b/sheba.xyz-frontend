import { FormWrapper } from "./FormWrapper";
import { Modal, Checkbox } from "antd";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

type AccountData = {
  email: string;
  password: string;
};

type AccountFormProps = AccountData & {
  updateFields: (fields: Partial<AccountData>) => void;
};

export function AccountForm({
  email,
  password,
  updateFields,
}: AccountFormProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setIsConfirmed(true);
    console.log("Order confirmed");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <FormWrapper title="Confirmation">
      <div className="space-y-5 mt-8 w-full">
        <legend className="sr-only">Order Confirmation</legend>

        {/* Information Box */}
        <div className="bg-white rounded-xl p-5 border-0">
          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-gray-900 text-sm leading-relaxed font-medium">
              Review your details above. Accept the terms to proceed with your
              reservation.
            </p>
          </div>
        </div>

        {/* Terms Checkbox & Button in One Row */}
        <div className="flex items-center justify-between gap-4">
          <label
            htmlFor="confirmation"
            className="flex items-center gap-3 cursor-pointer flex-1"
          >
            <input
              id="confirmation"
              type="checkbox"
              name="confirmation"
              value="I Agree"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-gray-300 checked:border-blue-600 checked:bg-blue-600 cursor-pointer transition-all flex-shrink-0"
              required
              aria-label="Accept terms and conditions"
            />
            <span className="text-gray-900 text-sm">
              I agree to the{" "}
              <span className="font-semibold">terms and conditions</span>
            </span>
          </label>

          <button
            type="button"
            onClick={showModal}
            disabled={!isConfirmed}
            className="px-6 py-3 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 flex-shrink-0 whitespace-nowrap shadow-sm hover:shadow-md"
          >
            {isConfirmed ? "Confirm & Book" : "Accept to Continue"}
          </button>
        </div>

        {/* Confirmation Modal */}
        <Modal
          title="Confirm Your Booking"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Yes, Confirm"
          cancelText="Cancel"
          centered
          okButtonProps={{ className: "bg-blue-600 hover:bg-blue-700" }}
        >
          <div className="space-y-4 py-4">
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
              <p className="text-gray-900 font-semibold mb-2">
                Final Confirmation
              </p>
              <p className="text-gray-700 text-sm">
                Your booking details have been reviewed. Click{" "}
                <span className="font-bold">&quot;Yes, Confirm&quot;</span> to complete
                your reservation.
              </p>
            </div>
            <p className="text-gray-600 text-xs">
              You will receive a confirmation email with your booking details
              and further instructions.
            </p>
          </div>
        </Modal>
      </div>
    </FormWrapper>
  );
}
